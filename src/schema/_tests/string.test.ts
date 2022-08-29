import { createFieldsSchema as s } from "../FieldsSchema";
import { string } from "../string";

test("string", () => {
  const schema = s({
    name: string,
  });

  expect(schema.decode({ name: "hoge" })).toEqual({ name: "hoge" });
  expect(() => schema.decode({ name: null })).toThrowError();
});

test("string()", () => {
  const schema = s({
    name: string(),
  });

  expect(schema.decode({ name: "hoge" })).toEqual({ name: "hoge" });
});

test("string({maxLength})", () => {
  const schema = s({
    name: string({ maxLength: 3 }),
  });

  expect(schema.decode({ name: "hog" })).toEqual({ name: "hog" });
  expect(() => schema.decode({ name: "hoge" })).toThrowError();
});
