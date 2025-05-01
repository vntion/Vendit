import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import Spinner from "../../ui/Spinner";
import { formatDate } from "../../utils/helpers";
import AddCommentForm from "./AddCommentForm";
import ReviewButton from "./ReviewButton";
import ReviewThread from "./ReviewThread";
import ThreadComment from "./ThreadComment";
import { fetchThreadDetailById } from "../../slices/threadSlice";

function ThreadDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { threadDetail, status } = useSelector((state) => state.thread);
  const { isAuthorized } = useSelector((state) => state.auth);
  const { loggedUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (threadDetail !== null) return;
    dispatch(fetchThreadDetailById(id));
  }, [dispatch, id, threadDetail]);

  if (status === "loading" || !threadDetail) {
    return <Spinner />;
  }

  if (status === "error") {
    return <p>error</p>;
  }

  const formattedDate = formatDate(threadDetail.createdAt);
  const totalLike = threadDetail.upVotesBy.length;
  const totalDisLike = threadDetail.downVotesBy.length;

  return (
    <div className="px-8 py-2">
      <h1 className="text-4xl font-bold">{threadDetail.title}</h1>
      <span className="rounded-xs bg-purple-500/80 p-0.5 text-[0.7rem]">
        #{threadDetail.category}
      </span>

      <div className="my-3 flex items-center gap-2">
        <div className="size-8 rounded-full bg-amber-400">
          <img
            src={threadDetail.owner.avatar}
            alt={threadDetail.owner.name}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span>{threadDetail.owner.name}</span>
          <span className="text-xs text-gray-400">{formattedDate}</span>
        </div>
      </div>

      <p className="mb-2 text-sm">{threadDetail.body}</p>

      <ReviewThread>
        <ReviewButton
          like={totalLike}
          dislike={totalDisLike}
          isLiked={threadDetail.upVotesBy.includes(loggedUser?.id)}
          isDisLiked={threadDetail.downVotesBy.includes(loggedUser?.id)}
          threadId={id}
          type="threadDetail"
        />
      </ReviewThread>

      {isAuthorized ? (
        <AddCommentForm />
      ) : (
        <p className="mt-6">
          <Link
            to="/login"
            className="text-blue-600 underline hover:text-blue-500"
          >
            Login
          </Link>{" "}
          untuk memberikan komentar
        </p>
      )}
      <ThreadComment />
    </div>
  );
}

export default ThreadDetail;
