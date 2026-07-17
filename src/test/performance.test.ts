test("performance test", () => {
  const start = performance.now();

  for (let i = 0; i < 1000000; i++) {}

  const end = performance.now();

  expect(end - start).toBeLessThan(100);
});
