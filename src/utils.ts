import { Db, IndexOptions } from "mongodb";
import { format } from "prettier";
import { Basil } from "./Basil";
import { Index, IndexFields, TargetCollection } from "./types";

// コレクションとスキーマとインデックスを設定
export async function ensureCollection(
  db: Db,
  collectionName: string,
  { $jsonSchema, indexes }: {
    $jsonSchema: Record<string, unknown>;
    indexes: Index[];
  } = { $jsonSchema: {}, indexes: [] },
) {
  if (!Array.isArray(indexes)) {
    throw TypeError('"indexes" option must be an array.');
  }

  await setJsonSchemaValidator(db, collectionName, $jsonSchema);

  const collection = await db.collection(collectionName);

  await Promise.all(
    indexes.map(async (index) => {
      await collection.createIndex(index.fields, index.options ?? {});
    }),
  );
}

export async function setJsonSchemaValidator(
  db: Db,
  collectionName: string,
  jsonSchema: Object,
) {
  // もしコレクションがすでにある場合にはschemaを変更する
  if (await collectionExists(db, collectionName)) {
    await db.command({
      collMod: collectionName,
      validator: { $jsonSchema: jsonSchema },
    });
  } else {
    await db.createCollection(collectionName, {
      validator: { $jsonSchema: jsonSchema },
    });
  }
}

export async function collectionExists(db: Db, collectionName: string) {
  return (await db.listCollections({ name: collectionName }).toArray()).length >
    0;
}

export const prepareCollections = async (
  collections: TargetCollection<any>[],
) => {
  const basil = await Basil.connect();

  await Promise.all(
    collections.map(async (collection) => {
      const bsonSchema = collection.schema.generateBsonSchema();

      await basil.useDatabase(async (db) => {
        await ensureCollection(db, collection.collectionName, {
          $jsonSchema: bsonSchema,
          indexes: collection.indexes,
        });
      });
    }),
  );
};

export const dumpValidationSchemas = (collections: TargetCollection<any>[]) => {
  collections.forEach((collection) => {
    const bsonSchema = collection.schema.generateBsonSchema();
    const collectionName = collection.collectionName;

    process.stdout.write(
      `${collectionName}: ${JSON.stringify(bsonSchema, null, "  ")} \n\n`,
    );
  });
};

export function prettier(code: string) {
  return format(code, {
    parser: "typescript",
  });
}

export function index(fields: IndexFields, options: IndexOptions = {}): Index {
  return {
    fields,
    options,
  };
}
