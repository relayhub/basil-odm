import mongodb, { CreateCollectionOptions } from 'mongodb';
import { format } from 'prettier';
import { Basil } from './Basil';
import { Index, RuntimeCollectionSchema, DefinedSchema, CollectionOptions } from './types';

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
  if (await collectionExists(db, collectionName)) {
    await db.command({
      collMod: collectionName,
      validator: { $jsonSchema: jsonSchema },
    });
  } else {
    await db.createCollection(collectionName, {
      validator: { $jsonSchema: jsonSchema },
      ...options,
    });
  }

  const collection = await db.collection(collectionName);

  await Promise.all(
    indexes.map(async (index) => {
      await collection.createIndex(index.fields, index.options ?? {});
    })
  );
}

export async function collectionExists(db: mongodb.Db, collectionName: string) {
  return (await db.listCollections({ name: collectionName }).toArray()).length > 0;
}

export const prepareDb = async (schema: DefinedSchema) => {
  const basil = await Basil.connect();
  const collections = Object.values(schema);

  await Promise.all(
    collections.map(async (collection) => {
      const bsonSchema = collection.fields.generateBsonSchema();

      await basil.useDatabase(async (db) => {
        await ensureCollection(db, collection.collectionName, {
          jsonSchema: bsonSchema,
          indexes: collection.indexes,
          options: collection.options ?? {},
        });
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
