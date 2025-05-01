import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  loadingComplete,
  startLoading,
} from "../../src/slices/loadingBarSlice";
import threadReducer, {
  changeCategory,
  fetchGetThreads,
  fetchThreadDetailById,
} from "../../src/slices/threadSlice";

import * as threadApi from "../../src/API/apiThread";

/**
 * skenario tes
 *
 * - fungsi threadReducers
 * - should return the initial state when given by unknown action
 * - should return the category when given by changeCategory action
 *
 * - asyncfetchGetThreads thunk
 * - should dispatch action correctly when data fetching success
 * - should return the API response as payload
 * - should handle errors correctly
 *
 * - fetchThreadDetailById thunk
 * - should dispatch actions correctly when data fetching succeeds
 * - should return the API response as payload
 * - should handle errors correctly
 *
 */

const fakeThreadsResponse = [
  {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "users-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: "thread-2",
    title: "Thread Kedua",
    body: "Ini adalah thread kedua",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "users-2",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeDetailThreadResponse = {
  id: "thread-1",
  title: "Thread Pertama",
  body: "Ini adalah thread pertama",
  category: "General",
  createdAt: "2021-06-21T07:00:00.000Z",
  owner: {
    id: "users-1",
    name: "John Doe",
    avatar: "https://generated-image-url.jpg",
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: "comment-1",
      content: "Ini adalah komentar pertama",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe("threadReducer", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = {
      threads: [],
      threadDetail: null,
      category: "",
      status: "idle",
      error: "",
    };
    const unknownAction = { type: "UNKNOWN_ACTION" };

    const nextState = threadReducer(initialState, unknownAction);
    expect(nextState).toEqual(initialState);
  });

  it("should return the category when given by changeCategory action", () => {
    const initialState = {
      threads: [],
      threadDetail: null,
      category: "",
      status: "idle",
      error: "",
    };
    const payload = "react";
    const action = changeCategory(payload);

    const nextState = threadReducer(initialState, action);
    expect(nextState.category).toBe(payload);
  });

  it("should return the category when given by changeCategory action", () => {
    const initialState = {
      threads: [],
      threadDetail: null,
      category: "",
      status: "idle",
      error: "",
    };
    const payload = "jsx";
    const action = changeCategory(payload);

    const nextState = threadReducer(initialState, action);
    expect(nextState.category).toBe(payload);
  });

  it("should return the category when given by changeCategory action", () => {
    const initialState = {
      threads: [],
      threadDetail: null,
      category: "",
      status: "idle",
      error: "",
    };
    const payload = "perkenalan";
    const action = changeCategory(payload);

    const nextState = threadReducer(initialState, action);
    expect(nextState.category).toBe(payload);
  });
});

describe("asyncfetchGetThreads thunk", () => {
  beforeEach(() => {
    vi.spyOn(threadApi, "getAllThreads").mockImplementation(() =>
      Promise.resolve(fakeThreadsResponse),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    const mockDispatch = vi.fn();
    const getState = vi.fn();

    // action
    await fetchGetThreads()(mockDispatch, getState);

    // assert

    expect(mockDispatch).toHaveBeenCalledWith(startLoading());
    expect(mockDispatch).toHaveBeenCalledWith(loadingComplete());
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: `${fetchGetThreads.typePrefix}/pending`,
      }),
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: `${fetchGetThreads.typePrefix}/fulfilled`,
        payload: fakeThreadsResponse,
      }),
    );
  });

  it("should return the API response as payload", async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = vi.fn();

    // action
    const result = await fetchGetThreads()(dispatch, getState);

    // assert
    expect(result.payload).toEqual(fakeThreadsResponse);
    expect(threadApi.getAllThreads).toHaveBeenCalled();
  });

  it("should handle errors correctly", async () => {
    // arrange
    const error = new Error("Failed to fetch threads");
    vi.spyOn(threadApi, "getAllThreads").mockRejectedValueOnce(error);
    const dispatch = vi.fn();
    const getState = vi.fn();

    // action
    const result = await fetchGetThreads()(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(startLoading());
    expect(dispatch).toHaveBeenCalledWith(loadingComplete());
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: `${fetchGetThreads.typePrefix}/pending`,
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: `${fetchGetThreads.typePrefix}/rejected`,
        error: expect.objectContaining({
          message: error.message,
        }),
      }),
    );
    expect(result.error.message).toBe(error.message);
  });
});

describe("fetchThreadDetailById thunk", () => {
  beforeEach(() => {
    vi.spyOn(threadApi, "getThreadDetailById").mockImplementation(() =>
      Promise.resolve(fakeDetailThreadResponse),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should dispatch actions correctly when data fetching succeeds", async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = vi.fn();
    const threadId = "1";

    // action
    await fetchThreadDetailById(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(startLoading());
    expect(dispatch).toHaveBeenCalledWith(loadingComplete());
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: `${fetchThreadDetailById.typePrefix}/pending`,
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: `${fetchThreadDetailById.typePrefix}/fulfilled`,
        payload: fakeDetailThreadResponse,
      }),
    );
    expect(threadApi.getThreadDetailById).toHaveBeenCalledWith(threadId);
  });

  it("should return the API response as payload", async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = vi.fn();
    const threadId = "1";

    // action
    const result = await fetchThreadDetailById(threadId)(dispatch, getState);

    // assert
    expect(result.payload).toEqual(fakeDetailThreadResponse);
    expect(threadApi.getThreadDetailById).toHaveBeenCalledWith(threadId);
  });

  it("should handle errors correctly", async () => {
    // arrange
    const error = new Error("Failed to fetch thread detail");
    const threadId = "1";
    vi.spyOn(threadApi, "getThreadDetailById").mockRejectedValueOnce(error);
    const dispatch = vi.fn();
    const getState = vi.fn();

    // action
    const result = await fetchThreadDetailById(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(startLoading());
    expect(dispatch).toHaveBeenCalledWith(loadingComplete());
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: `${fetchThreadDetailById.typePrefix}/pending`,
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: `${fetchThreadDetailById.typePrefix}/rejected`,
        error: expect.objectContaining({
          message: error.message,
        }),
      }),
    );
    expect(result.error.message).toBe(error.message);
  });
});
