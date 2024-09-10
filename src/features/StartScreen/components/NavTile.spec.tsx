import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { NavTile } from "./NavTile.tsx";

describe("NavTile", () => {
  it("has title", () => {
    render(<NavTile title="title" subtitle="subtitle" onClick={() => {}} />);
  });
});
