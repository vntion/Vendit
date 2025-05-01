import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import NotFound from "../../src/ui/NotFound";

/**
 * Skenario testing
 *
 * - NotFound Component
 * - should render the 404 heading, error message, and home button
 * - should navigate to home when the home button is clicked
 */
const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("NotFound Component", () => {
  it("should render the 404 heading, error message, and home button", () => {
    // arrange
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    const headingEl = screen.getByText("404");
    const messageEl = screen.getByText("Anda tersesat kocak");
    const homeButton = screen.getByRole("button", { name: "Kembali ke home" });

    // assert
    expect(headingEl).toBeInTheDocument();
    expect(messageEl).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
  });

  it("should navigate to home when the home button is clicked", async () => {
    // arrange
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    const homeButton = screen.getByRole("button", { name: "Kembali ke home" });
    expect(homeButton).toBeTruthy();

    // action
    await userEvent.click(homeButton);

    // assert
    await waitFor(() =>
      expect(mockNavigate).toBeCalledWith("/home", { replace: true }),
    );

    // await expect(mockNavigate).toHaveBeenCalledWith("/home", { replace: true });
    vi.resetAllMocks();
  });
});
