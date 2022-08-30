import { Basil } from "../Basil";
import { createFieldsSchema, objectId, string } from "..";
import { ObjectId } from "mongodb";
import { Base } from "../Base";

jest.setTimeout(15000);

const basil = Basil.getInstance();

beforeAll(async () => {
  const uri = process.env.MONGO_URL as string;

  basil.configure({
    connectionUri: uri,
    databaseName: "db",
    clientOptions: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  });
  await basil.connect();
});

afterAll(async () => {
  await basil.close();
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
    await basil.insertOne(User.getCollection(), user);

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
