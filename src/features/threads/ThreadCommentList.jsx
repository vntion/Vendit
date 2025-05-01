import { useSelector } from 'react-redux'
import { formatDate } from '../../utils/helpers'
import ReviewButton from './ReviewButton'
import ReviewThread from './ReviewThread'
import { useParams } from 'react-router'

function ThreadCommentList ({ comment }) {
  const { loggedUser } = useSelector((state) => state.user)
  const { id } = useParams()

  const totalLike = comment.upVotesBy.length
  const totalDisLike = comment.downVotesBy.length
  const formattedDate = formatDate(comment.createdAt)

  return (
    <li className='border-b py-6'>
      <div className='flex items-center gap-2'>
        <img
          src={comment.owner.avatar}
          alt={comment.owner.name}
          className='size-8 rounded-full'
        />
        <div className='flex flex-col'>
          <span>{comment.owner.name}</span>
          <span className='text-xs text-gray-400'>{formattedDate}</span>
        </div>
      </div>

      <p className='mt-2 mb-2 text-sm'>{comment.content}</p>

      <ReviewThread>
        <ReviewButton
          like={totalLike}
          dislike={totalDisLike}
          isLiked={comment.upVotesBy.includes(loggedUser?.id)}
          isDisLiked={comment.downVotesBy.includes(loggedUser?.id)}
          threadId={id}
          commentId={comment.id}
        />
      </ReviewThread>
    </li>
  )
}

export default ThreadCommentList
