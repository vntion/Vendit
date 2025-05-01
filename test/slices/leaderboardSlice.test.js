import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as leaderboardApi from "../../src/API/apiLeaderboard";
import { fetchLeaderboard } from "../../src/slices/leaderboardSlice";
import {
  loadingComplete,
  startLoading,
} from "../../src/slices/loadingBarSlice";

/**
 * skenario tes
 *
 * - fetchLeaderboard thunk
 * - should dispatch actions correctly when data fetching succeeds
 * - should return the API response as payload
 * - should handle errors correctly
 *
 */

const fakeLeaderboardResponse = [
  {
    user: {
      id: "users-1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    score: 10,
  },
  {
    user: {
      id: "users-2",
      name: "Jane Doe",
      email: "jane@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    score: 5,
  },
];

describe("fetchLeaderboard thunk", () => {
  beforeEach(() => {
    vi.spyOn(leaderboardApi, "getLeaderboard").mockImplementation(() =>
      Promise.resolve(fakeLeaderboardResponse),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should dispatch actions correctly when data fetching succeeds", async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = vi.fn();

    // action
    await fetchLeaderboard()(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(startLoading());
    expect(dispatch).toHaveBeenCalledWith(loadingComplete());
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: `${fetchLeaderboard.typePrefix}/pending`,
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: `${fetchLeaderboard.typePrefix}/fulfilled`,
        payload: fakeLeaderboardResponse,
      }),
    );
  });

  it("should return the API response as payload", async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = vi.fn();

    // action
    const result = await fetchLeaderboard()(dispatch, getState);

    // assert
    expect(result.payload).toEqual(fakeLeaderboardResponse);
    expect(leaderboardApi.getLeaderboard).toHaveBeenCalled();
  });

  it("should handle errors correctly", async () => {
    // arrange
    const error = new Error("Failed to fetch leaderboard");
    vi.spyOn(leaderboardApi, "getLeaderboard").mockRejectedValueOnce(error);
    const dispatch = vi.fn();
    const getState = vi.fn();

    // action
    const result = await fetchLeaderboard()(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(startLoading());
    expect(dispatch).toHaveBeenCalledWith(loadingComplete());
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: `${fetchLeaderboard.typePrefix}/pending`,
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: `${fetchLeaderboard.typePrefix}/rejected`,
      }),
    );
    expect(result.error).toBeTruthy();
  });
});
