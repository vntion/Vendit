import { Link } from "react-router";
import SideLeaderboardList from "./SideLeaderboardList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLeaderboard } from "../../slices/leaderboardSlice";
import Spinner from "../../ui/Spinner";
import SearchThreadByCategoryForm from "../threads/SearchThreadByCategoryForm";

function SideLeaderboard() {
  const dispatch = useDispatch();
  const { leaderboard, error } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <div className="space-y-3" data-testid="sideleaderboard-component">
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="self-start rounded-md border border-purple-600 p-2">
            <h1 className="my-1.5 text-sm font-semibold">Top user</h1>

            <SideLeaderboardList leaderboard={leaderboard} />
            <Link
              to="/leaderboard"
              className="mt-1 block text-center text-xs underline hover:text-neutral-300"
            >
              Lihat leaderboard
            </Link>
          </div>
          <SearchThreadByCategoryForm />
        </>
      )}
    </div>
  );
}

export default SideLeaderboard;
