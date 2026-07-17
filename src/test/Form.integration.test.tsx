import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";

function Form() {
  const [message, setMessage] = useState("");

  return (
    <>
      <input
        placeholder="Enter name"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => setMessage("Submitted")}>Submit</button>
      <p>{message}</p>
    </>
  );
}

describe("Integration Test - Form", () => {
  test("user flow works", () => {
    render(<Form />);

    fireEvent.change(screen.getByPlaceholderText("Enter name"), {
      target: { value: "Hưng" },
    });

    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("Submitted")).toBeInTheDocument();
  });
});
