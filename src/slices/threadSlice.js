import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  createThread,
  downVoteComment,
  downVoteThread,
  getAllThreads,
  getThreadDetailById,
  neutralizeComment,
  neutralizeThreadVote,
  UpVoteComment,
  upVoteThread,
} from "../API/apiThread";
import { loadingComplete, startLoading } from "./loadingBarSlice";

export const fetchGetThreads = createAsyncThunk(
  "thread/fetchGetThreads",
  async function (_, { dispatch }) {
    dispatch(startLoading());
    const thread = getAllThreads();

    dispatch(loadingComplete());
    return thread;
  },
);

export const fetchThreadDetailById = createAsyncThunk(
  "thread/fetchThreadById",
  async function (id, { dispatch }) {
    dispatch(startLoading());
    const thread = getThreadDetailById(id);

    dispatch(loadingComplete());
    return thread;
  },
);

export const fetchCreateThread = createAsyncThunk(
  "thread/fetchCreateThread",
  createThread,
);

export const fetchCreateComment = createAsyncThunk(
  "thread/fetchCreateComment",
  createComment,
);

export const fetchVoteThread = createAsyncThunk(
  "thread/fetchVoteThread",
  async function (data, { getState, dispatch }) {
    const {
      user: { loggedUser },
    } = getState();

    let vote;

    if (data.voteType === "upVote") {
      dispatch(
        threadSlice.actions.optimisticVote({
          threadId: data.id,
          userId: loggedUser.id,
          type: data.fetchType,
          voteType: 1,
        }),
      );
      vote = await upVoteThread(data.id);
    }

    if (data.voteType === "downVote") {
      dispatch(
        threadSlice.actions.optimisticVote({
          threadId: data.id,
          userId: loggedUser.id,
          type: data.fetchType,
          voteType: -1,
        }),
      );
      vote = await downVoteThread(data.id);
    }

    if (data.voteType === "neutral") {
      dispatch(
        threadSlice.actions.optimisticVote({
          threadId: data.id,
          userId: loggedUser.id,
          type: data.fetchType,
          voteType: 0,
        }),
      );
      vote = await neutralizeThreadVote(data.id);
    }

    return { vote, fetchType: data.fetchType };
  },
);

export const fetchVoteComment = createAsyncThunk(
  "thread/fetchVoteComment",
  async function (data, { getState, dispatch }) {
    const {
      user: { loggedUser },
    } = getState();
    let vote;

    if (data.voteType === "upVote") {
      dispatch(
        threadSlice.actions.optimisticVote({
          threadId: data.id,
          userId: loggedUser.id,
          commentId: data.commentId,
          type: data.fetchType,
          voteType: 1,
        }),
      );
      vote = await UpVoteComment(data.id, data.commentId);
    }

    if (data.voteType === "downVote") {
      dispatch(
        threadSlice.actions.optimisticVote({
          threadId: data.id,
          userId: loggedUser.id,
          commentId: data.commentId,
          type: data.fetchType,
          voteType: -1,
        }),
      );
      vote = await downVoteComment(data.id, data.commentId);
    }

    if (data.voteType === "neutral") {
      dispatch(
        threadSlice.actions.optimisticVote({
          threadId: data.id,
          userId: loggedUser.id,
          commentId: data.commentId,
          type: data.fetchType,
          voteType: 0,
        }),
      );
      vote = await neutralizeComment(data.id, data.commentId);
    }

    return { vote };
  },
);

const initialState = {
  threads: [],
  threadDetail: null,
  category: "",
  status: "idle",
  error: "",
};

const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    changeCategory(state, action) {
      // payload = category
      state.category = action.payload;
    },
    optimisticVote(state, action) {
      const { threadId, commentId, userId, type, voteType } = action.payload;
      if (type === "threadDetail") {
        if (voteType === 1) {
          state.threadDetail.upVotesBy.push(userId);
          state.threadDetail.downVotesBy = [
            ...state.threadDetail.downVotesBy.filter((id) => id !== userId),
          ];
        }
        if (voteType === -1) {
          state.threadDetail.downVotesBy.push(userId);
          state.threadDetail.upVotesBy = [
            ...state.threadDetail.upVotesBy.filter((id) => id !== userId),
          ];
        }
        if (voteType === 0) {
          state.threadDetail.downVotesBy = [
            ...state.threadDetail.downVotesBy.filter((id) => id !== userId),
          ];
          state.threadDetail.upVotesBy = [
            ...state.threadDetail.upVotesBy.filter((id) => id !== userId),
          ];
        }
      }

      if (type === "threadItem") {
        if (voteType === 1) {
          state.threads = state.threads.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  upVotesBy: [...thread.upVotesBy, userId],
                  downVotesBy: [
                    ...thread.downVotesBy.filter((item) => item !== userId),
                  ],
                }
              : thread,
          );
        }
        if (voteType === -1) {
          state.threads = state.threads.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  downVotesBy: [...thread.downVotesBy, userId],
                  upVotesBy: [
                    ...thread.upVotesBy.filter((item) => item !== userId),
                  ],
                }
              : thread,
          );
        }
        if (voteType === 0) {
          state.threads = state.threads.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  downVotesBy: [
                    ...thread.downVotesBy.filter((item) => item !== userId),
                  ],
                  upVotesBy: [
                    ...thread.upVotesBy.filter((item) => item !== userId),
                  ],
                }
              : thread,
          );
        }
      }

      if (type === "comment") {
        if (voteType === 1) {
          state.threadDetail.comments = state.threadDetail.comments.map(
            (comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  upVotesBy: [...comment.upVotesBy, userId],
                  downVotesBy: comment.downVotesBy.filter(
                    (item) => item !== userId,
                  ),
                };
              }
              return comment;
            },
          );
        }
        if (voteType === -1) {
          state.threadDetail.comments = state.threadDetail.comments.map(
            (comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  downVotesBy: [...comment.downVotesBy, userId],
                  upVotesBy: comment.upVotesBy.filter(
                    (item) => item !== userId,
                  ),
                };
              }
              return comment;
            },
          );
        }
        if (voteType === 0) {
          state.threadDetail.comments = state.threadDetail.comments.map(
            (comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  upVotesBy: comment.upVotesBy.filter(
                    (item) => item !== userId,
                  ),
                  downVotesBy: comment.downVotesBy.filter(
                    (item) => item !== userId,
                  ),
                };
              }
              return comment;
            },
          );
        }
      }
    },
  },
  extraReducers: (builder) =>
    builder
      /// //// Get all thread
      .addCase(fetchGetThreads.fulfilled, (state, action) => {
        state.status = "idle";
        state.threads = action.payload;
      })
      .addCase(fetchGetThreads.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      /// //// Get thread detail by id
      .addCase(fetchThreadDetailById.fulfilled, (state, action) => {
        state.status = "idle";
        state.threadDetail = action.payload;
      })
      .addCase(fetchThreadDetailById.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      /// /// Create thread
      .addCase(fetchCreateThread.fulfilled, (state, action) => {
        state.status = "idle";
        state.threads.unshift(action.payload);
      })
      .addCase(fetchCreateThread.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      /// /// Create comment
      .addCase(fetchCreateComment.fulfilled, (state, action) => {
        state.status = "idle";
        state.threadDetail.comments.unshift(action.payload);
      })
      .addCase(fetchCreateComment.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      /// /// Vote thread
      .addCase(fetchVoteThread.fulfilled, (state, action) => {
        const { vote, fetchType } = action.payload;
        state.status = "idle";
        if (fetchType === "threadItem") {
          if (vote.voteType === 1) {
            state.threads = state.threads.map((thread) =>
              thread.id === vote.threadId
                ? {
                    ...thread,
                    upVotesBy: [...new Set([...thread.upVotesBy, vote.userId])],
                    downVotesBy: [
                      ...thread.downVotesBy.filter(
                        (item) => item !== vote.userId,
                      ),
                    ],
                  }
                : thread,
            );
          }

          if (vote.voteType === -1) {
            state.threads = state.threads.map((thread) =>
              thread.id === vote.threadId
                ? {
                    ...thread,
                    downVotesBy: [
                      ...new Set([...thread.downVotesBy, vote.userId]),
                    ],
                    upVotesBy: [
                      ...thread.upVotesBy.filter(
                        (item) => item !== vote.userId,
                      ),
                    ],
                  }
                : thread,
            );
          }

          if (vote.voteType === 0) {
            state.threads = state.threads.map((thread) =>
              thread.id === vote.threadId
                ? {
                    ...thread,
                    downVotesBy: [
                      ...thread.downVotesBy.filter(
                        (item) => item !== vote.userId,
                      ),
                    ],
                    upVotesBy: [
                      ...thread.upVotesBy.filter(
                        (item) => item !== vote.userId,
                      ),
                    ],
                  }
                : thread,
            );
          }
        }

        if (fetchType === "threadDetail") {
          if (vote.voteType === 1) {
            state.threadDetail.upVotesBy = [
              ...new Set([...state.threadDetail.upVotesBy, vote.userId]),
            ];
            state.threadDetail.downVotesBy = [
              ...state.threadDetail.downVotesBy.filter(
                (id) => id !== vote.userId,
              ),
            ];
          }

          if (vote.voteType === -1) {
            state.threadDetail.downVotesBy = [
              ...new Set([...state.threadDetail.downVotesBy, vote.userId]),
            ];
            state.threadDetail.upVotesBy = [
              ...state.threadDetail.upVotesBy.filter(
                (id) => id !== vote.userId,
              ),
            ];
          }

          if (vote.voteType === 0) {
            state.threadDetail.downVotesBy = [
              ...state.threadDetail.downVotesBy.filter(
                (id) => id !== vote.userId,
              ),
            ];
            state.threadDetail.upVotesBy = [
              ...state.threadDetail.upVotesBy.filter(
                (id) => id !== vote.userId,
              ),
            ];
          }
        }
      })
      .addCase(fetchVoteThread.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      /// /// Vote comment
      .addCase(fetchVoteComment.fulfilled, (state, action) => {
        const { vote } = action.payload;
        if (vote.voteType === 1) {
          state.threadDetail.comments = state.threadDetail.comments.map(
            (comment) => {
              if (comment.id === vote.commentId) {
                return {
                  ...comment,
                  upVotesBy: [...new Set([...comment.upVotesBy, vote.userId])],
                  downVotesBy: comment.downVotesBy.filter(
                    (item) => item !== vote.userId,
                  ),
                };
              }
              return comment;
            },
          );
        }

        if (vote.voteType === -1) {
          state.threadDetail.comments = state.threadDetail.comments.map(
            (comment) => {
              if (comment.id === vote.commentId) {
                return {
                  ...comment,
                  downVotesBy: [
                    ...new Set([...comment.downVotesBy, vote.userId]),
                  ],
                  upVotesBy: comment.upVotesBy.filter(
                    (item) => item !== vote.userId,
                  ),
                };
              }
              return comment;
            },
          );
        }

        if (vote.voteType === 0) {
          state.threadDetail.comments = state.threadDetail.comments.map(
            (comment) => {
              if (comment.id === vote.commentId) {
                return {
                  ...comment,
                  upVotesBy: comment.upVotesBy.filter(
                    (item) => item !== vote.userId,
                  ),
                  downVotesBy: comment.downVotesBy.filter(
                    (item) => item !== vote.userId,
                  ),
                };
              }
              return comment;
            },
          );
        }
        state.status = "idle";
      })
      .addCase(fetchVoteComment.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});

export const { changeCategory } = threadSlice.actions;

export default threadSlice.reducer;

// export const getThreadByCategory = (state) =>
//   state.thread.threads.filter((thread) =>
//     thread.category.includes(state.thread.category),
//   );
export const getThreadByCategory = (state) => {
  const threads = state.thread.threads;
  const category = state.thread.category;
  const filteredThreadsByCategory = threads.filter((thread) =>
    thread.category.includes(category),
  );
  return filteredThreadsByCategory;
};
