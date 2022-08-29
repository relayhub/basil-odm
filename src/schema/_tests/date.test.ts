import { createFieldsSchema as s } from "../FieldsSchema";
import { date } from "../date";

test("date", () => {
  const schema = s({
    createdAt: date,
  });

  const now = new Date();
  expect(schema.decode({ createdAt: now })).toEqual({ createdAt: now });
});

test("date()", () => {
  const schema = s({
    createdAt: date(),
  });

  const now = new Date();
  expect(schema.decode({ createdAt: now })).toEqual({ createdAt: now });
});
