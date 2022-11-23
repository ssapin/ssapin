import { render } from "@testing-library/react";
import MapPage from "../MapPage";

test("first init", () => {
  render(<MapPage />);
  expect(true).toBeTruthy();
});
