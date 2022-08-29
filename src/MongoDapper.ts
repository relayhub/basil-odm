import {
  Collection as MongoCollection,
  CollectionAggregationOptions,
  CollectionInsertManyOptions,
  CollectionInsertOneOptions,
  CommonOptions,
  Db,
  DeleteWriteOpResultObject,
  FilterQuery,
  FindOneOptions,
  InsertOneWriteOpResult,
  InsertWriteOpResult,
  MongoClient,
  MongoClientOptions,
  ObjectId,
  OptionalId,
  ReplaceOneOptions,
  ReplaceWriteOpResult,
  UpdateManyOptions,
  UpdateOneOptions,
  UpdateWriteOpResult,
  WithId,
} from "mongodb";
import {
  CountOptions,
  FindByIdOptions,
  FindManyOptions,
  MongoDapperSettings,
  TargetCollection,
  UpdateQuery,
} from "./types";
import { loadConfig } from "./Config";

type ClientCallbackQueue = ((client: MongoClient) => void)[];

export class MongoDapper {
  _client?: MongoClient;
  _settings?: MongoDapperSettings;

  _queue: ClientCallbackQueue = [];
  _timeoutId: any = undefined;

  configure(settings: MongoDapperSettings) {
    if (this._settings) {
      throw Error("This instance is already configured.");
    }

    Object.freeze(settings);
    this._settings = settings;

    this._client = new MongoClient(
      settings.connectionUri,
      settings.clientOptions,
    );
    this._client.addListener("close", this.handleClose);
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

  get settings(): MongoDapperSettings {
    if (!this._settings) {
      throw Error("Not configured. Call configure() or loadConfig().");
    }

    return this._settings;
  }

  private get client(): MongoClient {
    if (!this._client) {
      throw Error("Not configured. Call configure() or loadConfig().");
    }

    return this._client;
  }

  isConnected(): boolean {
    return !!this._client && this._client.isConnected();
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
    if (!this.client.isConnected()) {
      await this.client.connect();
      this.flushQueue();
    }
  }

  async close(): Promise<void> {
    await this.client.close();
  }

  getDatabase(databaseName: string = this.settings.databaseName): Db {
    return this.client.db(databaseName);
  }

  private queue(callback: (client: MongoClient) => void): void {
    if (this._client?.isConnected()) {
      callback(this._client);
    } else {
      if (this._queue.length === 0) {
        this._timeoutId = setTimeout(() => {
          throw Error(
            "TIMEOUT: Maybe MongoDapper is not initialized. Call MongoDapper.connect().",
          );
        }, 3000);
      }
      this._queue.push(callback);
    }
  }

  private flushQueue(): void {
    if (!this._client || !this._client.isConnected()) {
      throw Error("Invalid state");
    }

    clearTimeout(this._timeoutId);

    while (this._queue.length > 0) {
      const callback = this._queue.shift();
      if (callback) {
        callback(this._client);
      }
    }
  }

  useMongoClient<T>(
    callback: (client: MongoClient) => T | Promise<T>,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue(async (client: MongoClient) => {
        try {
          const result = await callback(client);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
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

  useCollection<T>(
    target: TargetCollection<any>,
    callback: (collection: MongoCollection) => T | Promise<T>,
  ): Promise<T> {
    const name = typeof target === "string" ? target : target.collectionName;

    return new Promise((resolve, reject) => {
      this.queue((client: MongoClient) => {
        try {
          const db = client.db(this.settings.databaseName);
          const collection = db.collection(name);
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

  findById<T extends { _id: any }>(
    target: TargetCollection<T>,
    id: string | ObjectId,
    options?: FindByIdOptions<T>,
  ): Promise<T | null> {
    return this.findOne(target, {
      ...(((options && options.filter) || {}) as any),
      _id: new ObjectId(id),
    });
  }

  findByIds<T extends { _id: any }>(
    target: TargetCollection<T>,
    ids: (string | ObjectId)[],
    baseQuery?: FilterQuery<T>,
  ): Promise<T[]> {
    const objectIds = ids.map((
      id,
    ) => (id instanceof ObjectId ? id : new ObjectId(id)));
    const query = {
      ...((baseQuery || {}) as any), // FIXME
      _id: { $in: objectIds },
    };

    return this.findMany(target, query);
  }

  async count<T extends { [key: string]: any }>(
    target: TargetCollection<T>,
    options?: CountOptions<T>,
  ): Promise<number> {
    return this.useCollection(target, (collection) => {
      return collection.countDocuments(options && options.filter);
    });
  }

  aggregate<T extends { [key: string]: any }>(
    target: TargetCollection<any>,
    pipeline: object[],
    options?: CollectionAggregationOptions,
  ): Promise<T[]> {
    return this.useCollection(target, (collection) => {
      const cursor = collection.aggregate(pipeline, options);
      return cursor.toArray() as Promise<T[]>;
    });
  }

  save<T extends { _id: any }>(
    target: TargetCollection<T>,
    document: T,
    options?: ReplaceOneOptions,
  ): Promise<ReplaceWriteOpResult> {
    return this.useCollection(target, async (collection) => {
      const payload = {
        query: { _id: document._id },
        entity: document,
      };
      const result = await collection.replaceOne(
        payload.query as FilterQuery<T>,
        target.schema.decode(payload.entity) as T,
        options,
      );

      if (result.matchedCount === 0) {
        throw Error('"save()" failed. Matched count is zero.');
      }

      return result;
    });
  }

  delete<T extends { _id: any }>(
    target: TargetCollection<T>,
    document: T,
    options?: CommonOptions,
  ): Promise<DeleteWriteOpResultObject> {
    return this.deleteOne(target, { _id: document._id }, options);
  }

  deleteOne<T extends { [key: string]: any }>(
    target: TargetCollection<T>,
    filter: FilterQuery<T>,
    options?: CommonOptions & { bypassDocumentValidation?: boolean },
  ): Promise<DeleteWriteOpResultObject> {
    return this.useCollection(target, (collection) => {
      return collection.deleteOne(filter, options);
    });
  }

  deleteMany<T extends { [key: string]: any }>(
    target: TargetCollection<T>,
    filter: FilterQuery<T>,
    options?: CommonOptions,
  ): Promise<DeleteWriteOpResultObject> {
    return this.useCollection(target, (collection) => {
      return collection.deleteMany(filter, options);
    });
  }

  insertOne<T extends { [key: string]: any }>(
    target: TargetCollection<T>,
    document: T,
    options?: CollectionInsertOneOptions,
  ): Promise<InsertOneWriteOpResult<WithId<T>>> {
    return this.useCollection(target, (collection) => {
      const serializedDocument = target.schema.decode(document) as OptionalId<
        T
      >;
      return collection.insertOne(serializedDocument, { ...options });
    });
  }

  insertMany<T extends { [key: string]: any }>(
    target: TargetCollection<T>,
    documents: T[],
    options?: CollectionInsertManyOptions,
  ): Promise<InsertWriteOpResult<WithId<T>>> {
    return this.useCollection(target, (collection) => {
      return collection.insertMany(
        documents.map<OptionalId<T>>((document) =>
          target.schema.decode(document) as OptionalId<T>
        ),
        options,
      );
    });
  }

  updateOne<T extends { [key: string]: any }>(
    target: TargetCollection<T>,
    filter: FilterQuery<T>,
    update: UpdateQuery,
    options?: UpdateOneOptions,
  ): Promise<UpdateWriteOpResult> {
    return this.useCollection(target, (collection) => {
      return collection.updateOne(filter, update, options);
    });
  }

  updateMany<T extends { [key: string]: any }>(
    target: TargetCollection<T>,
    filter: FilterQuery<T>,
    update: UpdateQuery,
    options?: UpdateManyOptions,
  ): Promise<UpdateWriteOpResult> {
    return this.useCollection(target, (collection) => {
      return collection.updateMany(filter, update, options);
    });
  }

  findOne<T extends { [key: string]: any }>(
    target: TargetCollection<T>,
    filter: FilterQuery<T>,
    options?: FindOneOptions<T>,
  ): Promise<T | null> {
    return this.useCollection(target, async (collection) => {
      const result = await collection.findOne<T>(
        filter,
        Object.assign({}, options) as any,
      ); // FIXME
      return result ? (target.schema.encode(result, {}) as T) : null;
    });
  }

  findMany<T extends { [key: string]: any }>(
    target: TargetCollection<T>,
    filter: FilterQuery<T>,
    options?: FindManyOptions,
  ): Promise<T[]> {
    return this.useCollection(target, async (collection) => {
      let cursor = await collection.find(filter, options);

      if (options) {
        if (typeof options.limit === "number") {
          cursor = cursor.limit(options.limit);
        }

        if (typeof options.skip === "number") {
          cursor = cursor.skip(options.skip);
        }

        if (options.sort) {
          cursor = cursor.sort(options.sort);
        }
      }

      const documents = await cursor.toArray() as any[];

      return documents.map((document) => {
        return target.schema.encode(document as any, {}) as T;
      });
    });
  }

  run<Result>(fn: (dapper: MongoDapper) => Result): Result {
    return fn(this);
  }

  static getInstance() {
    return dapper;
  }

  static async connect(configPath?: string) {
    if (!dapper.isConfigured()) {
      await dapper.loadConfig(configPath);
    }

    if (!dapper.isConnected()) {
      await dapper.connect();
    }

    return dapper;
  }
}

const dapper: MongoDapper = new MongoDapper();
