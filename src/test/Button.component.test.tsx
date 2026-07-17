import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("button click works", async () => {
  const handleClick = jest.fn();
  render(<button onClick={handleClick}>Click me</button>);

  const btn = screen.getByText("Click me");
  await userEvent.click(btn);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
