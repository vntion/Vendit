import { AiOutlineComment } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatString } from "../../utils/helpers";
import ReviewButton from "./ReviewButton";
import ReviewThread from "./ReviewThread";
import { fetchThreadDetailById } from "../../slices/threadSlice";
import { useNavigate } from "react-router";
import { resetLoading } from "../../slices/loadingBarSlice";

function ThreadsItem({ thread, owner }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedUser } = useSelector((state) => state.user);

  const totalLike = thread.upVotesBy.length;
  const totalDislike = thread.downVotesBy.length;
  const formattedThreadBody = formatString(thread.body, 170);
  const formattedDate = formatDate(thread.createdAt);

  const handleLink = () => {
    dispatch(fetchThreadDetailById(thread.id))
      .then(() => {
        navigate(`/threads/${thread.id}`);
      })
      .finally(() => {
        dispatch(resetLoading());
      });
  };

  return (
    <>
      <div
        onClick={handleLink}
        className="relative z-10 grid h-28 grid-cols-[auto_1fr] grid-rows-[auto_2rem_1fr_auto] gap-x-2 rounded-md p-2 hover:bg-gray-500/40"
      >
        <div className="row-span-full mt-0.5 size-8 rounded-full">
          <img
            src={owner?.avatar}
            alt={owner?.name ?? ""}
            className="rounded-full"
          />
        </div>
        <span className="self-center text-[0.75rem]">{owner?.name ?? ""}</span>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">{thread?.title ?? ""}</p>
          <span className="rounded-xs bg-purple-500/80 p-0.5 text-[0.7rem]">
            #{thread?.category ?? ""}
          </span>
        </div>

        <p className="-mt-1.5 text-xs text-gray-400">{formattedThreadBody}</p>

        <span className="absolute top-2 right-6 text-[0.65rem] text-gray-100">
          {formattedDate}
        </span>
      </div>
      <ReviewThread className="-mt-14 ml-11">
        <ReviewButton
          like={totalLike}
          dislike={totalDislike}
          isLiked={thread.upVotesBy.includes(loggedUser?.id ?? true)}
          isDisLiked={thread.downVotesBy.includes(loggedUser?.id ?? true)}
          threadId={thread.id}
          type="threadItem"
        />
        <div>
          <AiOutlineComment />
          <span>{thread?.totalComments ?? "0"}</span>
        </div>
      </ReviewThread>
    </>
  );
}

export default ThreadsItem;
