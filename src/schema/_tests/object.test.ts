import { createFieldsSchema as s } from "../FieldsSchema";
import { object } from "../object";

test("objectId()", () => {
  const schema = s({
    payload: object(),
  });

  expect(schema.decode({ payload: { name: "foobar" } })).toEqual({
    payload: { name: "foobar" },
  });
});
