import { Basil } from "../Basil";
import { CollectionSchema, objectId, string } from "..";
import { ObjectId } from "mongodb";

jest.setTimeout(15000);

const dapper: Basil = new Basil();

beforeAll(async () => {
  const uri = process.env.MONGO_URL as string;

  dapper.configure({
    connectionUri: uri,
    databaseName: "db",
    clientOptions: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  });
  await dapper.connect();
});

afterAll(async () => {
  await dapper.close();
});

describe("Basil", () => {
  test("useDatabase()", async () => {
    await dapper.useDatabase((db) => {
      expect(typeof db.databaseName).toBe("string");
    });

    await dapper.useDatabase(async (db) => {
      const col = db.collection("hoge");

      await col.insertMany([
        { _id: new ObjectId(), tag: "apple" },
        { _id: new ObjectId(), tag: "pineapple" },
        { _id: new ObjectId(), tag: "pen" },
        { _id: new ObjectId(), tag: "apple" },
      ]);

      expect(await col.countDocuments()).toBe(4);
      await col.deleteMany({});
    });
  });

  test("insertOne()", async () => {
    const Hoge = new CollectionSchema({
      collectionName: "hoge-hoge",
      fields: {
        _id: objectId(),
        name: string(),
      },
    });
    const id = new ObjectId();

    await dapper.insertOne(Hoge, {
      _id: id,
      name: "Taro",
    });

    await dapper.useDatabase(async (db) => {
      const col = db.collection(Hoge.collectionName);
      const document = await col.findOne({ _id: id }, {});
      expect(document?.name).toBe("Taro");
    });
  });

  test("aggregate()", async () => {
    const hoge = new CollectionSchema({
      collectionName: "hoge",
    });

    await dapper.useCollection(hoge, async (col) => {
      await col.insertMany([
        { _id: new ObjectId(), tag: "apple" },
        { _id: new ObjectId(), tag: "pineapple" },
        { _id: new ObjectId(), tag: "pen" },
        { _id: new ObjectId(), tag: "apple" },
      ]);
    });

    const result = await dapper.aggregate<{ count: number }>(hoge, [{
      $count: "count",
    }]);

    expect(result[0].count).toBe(4);
    await dapper.useCollection(hoge, async (collection) => {
      await collection.deleteMany({});
    });
  });

  test("deleteOne()", () =>
    dapper.useDatabase(async (db) => {
      const hoge = new CollectionSchema({ collectionName: "hoge" });

      const col = db.collection(hoge.collectionName);
      await col.insertOne({ name: "hoge" });
      await col.insertOne({ name: "fuga" });
      expect(await col.countDocuments()).toBe(2);
      await dapper.deleteOne(hoge, { name: "hoge" });
      expect(await col.countDocuments()).toBe(1);
    }));

  test.todo("insertOne()");
  test.todo("insertMany()");
  test.todo("updateOne()");
  test.todo("updateMany()");
});
