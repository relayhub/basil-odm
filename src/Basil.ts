import { Collection as MongoCollection, Db, MongoClient, MongoClientOptions } from 'mongodb';
import { BasilSettings, TargetCollection } from './types';
import { loadConfig } from './Config';

type ClientCallbackQueue = ((client: MongoClient) => void)[];

export class Basil {
  _client?: MongoClient;
  _settings?: BasilSettings;

  _queue: ClientCallbackQueue = [];
  _timeoutId: any = undefined;

  configure(settings: BasilSettings) {
    if (this._settings) {
      throw Error('This instance is already configured.');
    }

    Object.freeze(settings);
    this._settings = settings;

    this._client = new MongoClient(settings.connectionUri, settings.clientOptions);
    this._client.addListener('close', this.handleClose);
  }

  private handleClose = () => {
    // Do nothing
  };

  async loadConfig(configPath?: string) {
    this.configure(await loadConfig(configPath));
  }

  isConfigured(): boolean {
    return !!this._settings;
  }

  get settings(): BasilSettings {
    if (!this._settings) {
      throw Error('Not configured. Call configure() or loadConfig().');
    }

    return this._settings;
  }

  private get client(): MongoClient {
    if (!this._client) {
      throw Error('Not configured. Call configure() or loadConfig().');
    }

    return this._client;
  }

  get connectionUri() {
    return this.settings.connectionUri;
  }

  get clientOptions(): MongoClientOptions {
    return this.settings.clientOptions;
  }

  get databaseName(): string {
    return this.settings.databaseName;
  }

  async prepare() {
    await this.connect();
  }

  async connect(): Promise<void> {
    await this.client.connect();
    this.flushQueue();
  }

  async close(): Promise<void> {
    await this.client.close();
  }

  private queue(callback: (client: MongoClient) => void): void {
    if (this._client) {
      callback(this._client);
    } else {
      if (this._queue.length === 0) {
        this._timeoutId = setTimeout(() => {
          throw Error('TIMEOUT: Maybe Basil is not initialized. Call Basil.connect().');
        }, 3000);
      }
      this._queue.push(callback);
    }
  }

  private flushQueue(): void {
    if (!this._client) {
      throw Error('Invalid state');
    }

    clearTimeout(this._timeoutId);

    while (this._queue.length > 0) {
      const callback = this._queue.shift();
      if (callback) {
        callback(this._client);
      }
    }
  }

  useDatabase<T>(callback: (db: Db) => T | Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue(async (client: MongoClient) => {
        try {
          const db = client.db(this.settings.databaseName);
          const result = await callback(db);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  getDatabase(): Promise<Db> {
    return new Promise((resolve, reject) => {
      this.queue(async (client: MongoClient) => {
        try {
          const db = client.db(this.settings.databaseName);
          resolve(db);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  useCollection<T extends { [key: string]: any }, R>(target: TargetCollection<any>, callback: (collection: MongoCollection<T>) => R | Promise<R>): Promise<R> {
    const name = typeof target === 'string' ? target : target.collectionName;

    return new Promise((resolve, reject) => {
      this.queue((client: MongoClient) => {
        try {
          const db = client.db(this.settings.databaseName);
          const collection = db.collection<T>(name);
          const result = callback(collection);

          if (result instanceof Promise) {
            result.then(resolve).catch(reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  static getInstance() {
    return basil;
  }

  static async connect(configPath?: string) {
    if (!basil.isConfigured()) {
      await basil.loadConfig(configPath);
    }

    await basil.connect();

    return basil;
  }
}

const basil: Basil = new Basil();
