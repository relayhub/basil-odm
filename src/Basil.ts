import * as mongodb from 'mongodb';
import { ResolvedConfig, RuntimeCollectionSchema } from './types';
import { loadConfig } from './Config';

type ClientCallbackQueue = ((client: mongodb.MongoClient) => void)[];

export class Basil {
  _mongoClient?: mongodb.MongoClient;
  _settings?: ResolvedConfig;

  _queue: ClientCallbackQueue = [];
  _timeoutIds: ReturnType<typeof setTimeout>[] = [];

  configure(settings: ResolvedConfig) {
    if (this._settings) {
      console.warn('This instance is already configured.');
      return;
    }

    Object.freeze(settings);
    this._settings = settings;

    this._mongoClient = new mongodb.MongoClient(settings.connectionUri, settings.clientOptions);
    this._mongoClient.addListener('close', this.handleClose);

    this.flushQueue();
  }

  async transaction(
    {
      transactionOptions = {},
      sessionOptions = {},
    }: {
      sessionOptions?: mongodb.ClientSessionOptions;
      transactionOptions?: mongodb.TransactionOptions;
    },
    callback: (session: mongodb.ClientSession) => Promise<void> | void
  ): Promise<void> {
    const session = this.mongoClient.startSession(sessionOptions);

    try {
      await session.withTransaction(async () => {
        await callback(session);
      }, transactionOptions);
    } finally {
      await session.endSession();
    }
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

  get settings(): ResolvedConfig {
    if (!this._settings) {
      throw Error('Not configured. Call configure() or loadConfig().');
    }

    return this._settings;
  }

  get mongoClient(): mongodb.MongoClient {
    if (!this._mongoClient) {
      throw Error('Not configured. Call configure() or loadConfig().');
    }

    return this._mongoClient;
  }

  get connectionUri() {
    return this.settings.connectionUri;
  }

  get clientOptions(): mongodb.MongoClientOptions {
    return this.settings.clientOptions;
  }

  get databaseName(): string {
    return this.settings.databaseName;
  }

  async disconnect(): Promise<void> {
    await this.mongoClient.close();
  }

  private queue(callback: (client: mongodb.MongoClient) => void): void {
    if (this._mongoClient) {
      callback(this._mongoClient);
    } else {
      if (this._queue.length === 0) {
        this._timeoutIds.push(
          setTimeout(() => {
            throw Error(
              'TIMEOUT: Maybe Basil is not initialized. Call configure() or loadConfig().'
            );
          }, 5000)
        );
      }
      this._queue.push(callback);
    }
  }

  private flushQueue(): void {
    if (!this._mongoClient) {
      throw Error('Invalid state');
    }

    for (const timeoutId of this._timeoutIds) {
      clearTimeout(timeoutId);
    }
    this._timeoutIds = [];

    while (this._queue.length > 0) {
      const callback = this._queue.shift();
      if (callback) {
        callback(this._mongoClient);
      }
    }
  }

  useDatabase<T>(callback: (db: mongodb.Db) => T | Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue(async (client: mongodb.MongoClient) => {
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

  getDatabase(): Promise<mongodb.Db> {
    return new Promise((resolve, reject) => {
      this.queue(async (client: mongodb.MongoClient) => {
        try {
          const db = client.db(this.settings.databaseName);
          resolve(db);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async getCollection<T extends mongodb.Document>(
    collectionName: string
  ): Promise<mongodb.Collection<T>> {
    const db = await this.getDatabase();
    return db.collection<T>(collectionName);
  }

  useCollection<T extends mongodb.Document, R>(
    target: RuntimeCollectionSchema<unknown>,
    callback: (collection: mongodb.Collection<T>) => R | Promise<R>
  ): Promise<R> {
    const name = typeof target === 'string' ? target : target.collectionName;

    return new Promise((resolve, reject) => {
      this.queue((client: mongodb.MongoClient) => {
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

    return basil;
  }
}

export const basil: Basil = new Basil();

/**
 * Set connection information by code without using a configuration file.
 *
 * @param settings
 */
export function configure(settings: ResolvedConfig): void {
  basil.configure(settings);
}

/**
 * Disconnect from MongoDB established by Basil ODM.
 *
 * Explicitly call this function when exiting the application, exiting a test, or exiting a batch process.
 */
export function disconnect(): Promise<void> {
  return basil.disconnect();
}
