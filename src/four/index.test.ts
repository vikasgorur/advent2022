import { fullyContained } from ".";

test("contained", () => {
  expect(fullyContained({
    s1: { start: 2, end: 8},
    s2: { start: 3, end: 6}
  })).toBeTruthy();
})