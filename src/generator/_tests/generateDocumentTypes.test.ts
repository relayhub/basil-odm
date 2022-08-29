import { enums } from "../../schema/enums";
import { generateDocumentTypes } from "../codeGenerator";
import { CollectionSchema } from "../../schema/CollectionSchema";
import { format } from "../../_tests/testUtils";
import { objectId } from "../../schema/objectId";
import { date } from "../../schema/date";
import { boolean } from "../../schema/boolean";
import { string } from "../../schema/string";

const table = [
  [
    new CollectionSchema({
      fields: {
        _id: objectId(),
        createdAt: date(),
        flag: boolean(),
        status: enums({ values: ["created", "deleted"] }),
        name: string(),
        sub: {
          name: string(),
        },
      },
      collectionName: "docs",
    }),
    `export class Doc extends basil.Base {
      constructor(params?: Partial<Doc>) {
        super();
        Object.assign(this, params);
      }
      static getCollection() {
        return {
          collectionName: "docs",
          schema: $defs["docs"].schema,
          indexes: $defs["docs"].indexes,
        };
      }
      _id: mongodb.ObjectId = new mongodb.ObjectId();
      createdAt: Date = new Date();
      flag: boolean = false;
      status: "created" | "deleted" = "created";
      name: string = "";
      sub: {name: string} = {
        name: "",
      };
    }`,
  ],
] as const;

test.each(table)("generateDocumentTypes() #%#", (collection, expected) => {
  const code = generateDocumentTypes([collection]);
  expect(format(code)).toBe(format(expected));
});
