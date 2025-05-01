import { configureStore } from "@reduxjs/toolkit";
import threadReducer from "./slices/threadSlice";
import userReducer from "./slices/userSlice";
import leaderboardSlice from "./slices/leaderboardSlice";
import authSlice from "./slices//authSlice";
import loadingBarSlice from "./slices/loadingBarSlice";

const store = configureStore({
  reducer: {
    thread: threadReducer,
    user: userReducer,
    leaderboard: leaderboardSlice,
    auth: authSlice,
    loadingBar: loadingBarSlice,
  },
});

export default store;
