import mongodb, { ObjectId } from 'mongodb';
import { format } from 'prettier';
import { Basil } from './Basil';
import { Index, RuntimeCollectionSchema, DefinedSchema, CollectionOptions, ResolvedConfig } from './types';

// コレクションとスキーマとインデックスを設定
export async function ensureCollection(
  db: mongodb.Db,
  collectionName: string,
  {
    jsonSchema,
    indexes,
    options,
  }: {
    jsonSchema: Record<string, unknown>;
    indexes: Index[];
    options: CollectionOptions;
  }
) {
  const label = `[${collectionName}]`;
  console.log(`${label} Ensuring ${JSON.stringify(collectionName)} collection`);
  if (await collectionExists(db, collectionName)) {
    console.log(`${label} ${JSON.stringify(collectionName)} collection is already exists.`);
    await db.command({
      collMod: collectionName,
      validator: { $jsonSchema: jsonSchema },
    });
    console.log(`${label} Updated ${JSON.stringify(collectionName)} collection`);
  } else {
    await db.createCollection(collectionName, {
      validator: { $jsonSchema: jsonSchema },
      ...options,
    });
    console.log(`${label} Created ${JSON.stringify(collectionName)} collection`);
  }

  const collection = await db.collection(collectionName);

  console.log(`${label} Start to prepare indexes`);
  await Promise.all(
    indexes.map(async (index) => {
      console.log(`${label} Prepare index: ${JSON.stringify(index)}`);
      await collection.createIndex(index.fields, index.options ?? {});
    })
  );

  console.log(`${label} Finished to ensure ${JSON.stringify(collectionName)} collection`);
}

export async function collectionExists(db: mongodb.Db, collectionName: string) {
  return (await db.listCollections({ name: collectionName }).toArray()).length > 0;
}

export const prepareDb = async (schema: DefinedSchema, config?: ResolvedConfig) => {
  const basil = Basil.getInstance();

  if (config) {
    await basil.configure(config);
  } else {
    await basil.loadConfig();
  }
  const collections = Object.values(schema);

  const db = await basil.getDatabase();

  await Promise.all(
    collections.map(async (collection) => {
      const bsonSchema = collection.fields.generateBsonSchema();
      await ensureCollection(db, collection.collectionName, {
        jsonSchema: bsonSchema,
        indexes: collection.indexes,
        options: collection.options ?? {},
      });
    })
  );
};

export const dumpValidationSchemas = (collections: RuntimeCollectionSchema<unknown>[]) => {
  collections.forEach((collection) => {
    const bsonSchema = collection.fields.generateBsonSchema();
    const collectionName = collection.collectionName;

    process.stdout.write(`${collectionName}: ${JSON.stringify(bsonSchema, null, '  ')} \n\n`);
  });
};

export function prettier(code: string) {
  return format(code, {
    parser: 'typescript',
  });
}

const objectIdBsonType = new ObjectId()._bsontype;

export function isObjectId(target: unknown): target is ObjectId {
  return target instanceof ObjectId || (target as ObjectId)?._bsontype === objectIdBsonType;
}
