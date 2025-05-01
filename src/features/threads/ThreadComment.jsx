import { useSelector } from 'react-redux'
import ThreadCommentList from './ThreadCommentList'

function ThreadComment () {
  const {
    threadDetail: { comments }
  } = useSelector((state) => state.thread)
  const totalComments = comments.length

  return (
    <>
      <h1 className='mt-8 -mb-4 font-bold'>{totalComments} komentar</h1>
      <section>
        {comments.length === 0
          ? (
            <p className='text-center'>Belum ada komentar</p>
            )
          : (
            <ul>
              {comments.map((comment) => (
                <ThreadCommentList comment={comment} key={comment.id} />
              ))}
            </ul>
            )}
      </section>
    </>
  )
}

export default ThreadComment
