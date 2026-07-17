function sum(a: number, b: number): number {
  return a + b;
}

describe("Sum function", () => {
  test("adds 1 + 2 = 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("adds negative numbers", () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});
