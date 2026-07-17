import { render } from "@testing-library/react";
import { axe } from "jest-axe";

function Button() {
  return <button>Click</button>;
}

test("should have no accessibility violations", async () => {
  const { container } = render(<Button />);
  const results = await axe(container);
  expect(results).toHaveNoViolations(); // <-- bây giờ OK
});
