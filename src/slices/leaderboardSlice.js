import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLeaderboard } from "../API/apiLeaderboard";
import { loadingComplete, startLoading } from "./loadingBarSlice";

export const fetchLeaderboard = createAsyncThunk(
  "leaderboard/fetchLeaderboard",
  async function (_, { dispatch }) {
    dispatch(startLoading());
    const leaderboard = getLeaderboard();

    dispatch(loadingComplete());
    return leaderboard;
  },
);

const initialState = {
  leaderboard: [],
  status: "idle",
  error: "",
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.status = "idle";
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state) => {
        state.status = "error";
        state.error = "Gagal mendapatkan leaderboard";
      }),
});

export default leaderboardSlice.reducer;
