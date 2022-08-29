import { MongoDapper } from "../MongoDapper";
import { createFieldsSchema, objectId, string } from "..";
import { ObjectId } from "mongodb";
import { Base } from "../Base";

jest.setTimeout(15000);

const dapper = MongoDapper.getInstance();

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

describe("Base", () => {
  test("findById(), findOne()", async () => {
    class User extends Base {
      _id = new ObjectId();
      name = "Mitsunori Kubota";

      static getCollection() {
        return {
          collectionName: "users",
          indexes: [],
          schema: createFieldsSchema({
            _id: objectId(),
            name: string(),
          }),
        };
      }
    }

    const user = new User();
    expect(await User.findById(user._id)).toBe(null);
    await dapper.insertOne(User.getCollection(), user);

    {
      const result = await User.findById(user._id);
      expect(result?.name).toBe(user.name);
      expect(result instanceof User).toBe(true);
    }

    {
      const result = await User.findOne({ _id: user._id });
      expect(result?.name).toBe(user.name);
      expect(result instanceof User).toBe(true);
    }
  });
});
