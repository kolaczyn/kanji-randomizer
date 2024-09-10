import { expect, test } from "vitest";
import { textToLvl } from "./textToLvl.ts";

test("textToLvl", () => {
  expect(textToLvl("level-n1")).toBe(1);
  expect(textToLvl("level-n5")).toBe(5);
  expect(textToLvl("dfasklj")).toBe(Infinity);
});
