import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchVoteComment, fetchVoteThread } from "../../slices/threadSlice";
import { useNavigate } from "react-router";

function ReviewButton({
  like,
  dislike,
  isLiked,
  isDisLiked,
  commentId = null,
  threadId,
  type,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthorized } = useSelector((state) => state.auth);

  const handleLike = () => {
    if (!isAuthorized) return navigate("/login");

    const voteType = isLiked ? "neutral" : "upVote";

    if (!commentId) {
      dispatch(
        fetchVoteThread({ id: threadId, fetchType: type, voteType, commentId }),
      );
    } else {
      dispatch(
        fetchVoteComment({
          id: threadId,
          fetchType: type,
          voteType,
          commentId,
        }),
      );
    }
  };

  const handleDisLike = () => {
    if (!isAuthorized) return navigate("/login");

    const voteType = isDisLiked ? "neutral" : "downVote";

    if (!commentId) {
      dispatch(
        fetchVoteThread({ id: threadId, fetchType: type, voteType, commentId }),
      );
    } else {
      dispatch(
        fetchVoteComment({
          id: threadId,
          fetchType: type,
          voteType,
          commentId,
        }),
      );
    }
  };

  return (
    <>
      <button
        onClick={handleLike}
        className="rounded-full p-1 hover:cursor-pointer hover:bg-gray-600"
      >
        {isLiked ? <AiFillLike /> : <AiOutlineLike />}
        <span>{like}</span>
      </button>
      <button
        onClick={handleDisLike}
        className="rounded-full p-1 hover:cursor-pointer hover:bg-gray-600"
      >
        {isDisLiked ? <AiFillDislike /> : <AiOutlineDislike />}

        <span>{dislike}</span>
      </button>
    </>
  );
}

export default ReviewButton;
