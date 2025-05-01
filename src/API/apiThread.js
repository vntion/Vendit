import { getSession } from '../utils/session'

/**
 * Create thread
 */
export async function createThread (newThread) {
  const session = getSession()
  const res = await fetch('https://forum-api.dicoding.dev/v1/threads', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newThread)
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.message)

  return data.data.thread
}

/**
 * Get all threads
 */
export async function getAllThreads () {
  const res = await fetch('https://forum-api.dicoding.dev/v1/threads')

  const data = await res.json()

  if (!res.ok) throw new Error(data.message)

  return data.data.threads
}

/**
 * Get thread detail by id
 */
export async function getThreadDetailById (id) {
  const res = await fetch(`https://forum-api.dicoding.dev/v1/threads/${id}`)

  const data = await res.json()

  if (!res.ok) throw new Error(data.message)

  return data.data.detailThread
}

/**
 * Create comment
 */
export async function createComment (comment) {
  const session = getSession()

  const res = await fetch(
    `https://forum-api.dicoding.dev/v1/threads/${comment.id}/comments`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: comment.content })
    }
  )

  const data = await res.json()

  if (!res.ok) throw new Error(data.message)

  return data.data.comment
}

/// ///////////////////////////////////////////////
/// ////////////////
/**
 * Votes api
 */

/**
 * Up-vote thread
 */
export async function upVoteThread (id) {
  const session = getSession()

  const res = await fetch(
    `https://forum-api.dicoding.dev/v1/threads/${id}/up-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session}`,
        'Content-Type': 'application/json'
      }
    }
  )

  const data = await res.json()

  if (!res.ok) throw new Error(data.message)

  return data.data.vote
}

/**
 * Down-vote thread
 */
export async function downVoteThread (id) {
  const session = getSession()

  const res = await fetch(
    `https://forum-api.dicoding.dev/v1/threads/${id}/down-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session}`,
        'Content-Type': 'application/json'
      }
    }
  )

  const data = await res.json()

  if (!res.ok) throw new Error(data.message)

  return data.data.vote
}

/**
 * Neutralize thread vote
 */
export async function neutralizeThreadVote (id) {
  const session = getSession()

  const res = await fetch(
    `https://forum-api.dicoding.dev/v1/threads/${id}/neutral-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session}`,
        'Content-Type': 'application/json'
      }
    }
  )

  const data = await res.json()

  if (!res.ok) throw new Error(data.message)

  return data.data.vote
}

/**
 * Up-vote comment
 */
export async function UpVoteComment (threadId, commentId) {
  const session = getSession()

  const res = await fetch(
    `https://forum-api.dicoding.dev/v1/threads/${threadId}/comments/${commentId}/up-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session}`,
        'Content-Type': 'application/json'
      }
    }
  )

  const data = await res.json()

  if (!res.ok) throw new Error(data.message)

  return data.data.vote
}

/**
 * Down-vote comment
 */
export async function downVoteComment (threadId, commentId) {
  const session = getSession()

  const res = await fetch(
    `https://forum-api.dicoding.dev/v1/threads/${threadId}/comments/${commentId}/down-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session}`,
        'Content-Type': 'application/json'
      }
    }
  )

  const data = await res.json()

  if (!res.ok) throw new Error(data.message)

  return data.data.vote
}

/**
 * Neutralize comment vote
 */
export async function neutralizeComment (threadId, commentId) {
  const session = getSession()

  const res = await fetch(
    `https://forum-api.dicoding.dev/v1/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session}`,
        'Content-Type': 'application/json'
      }
    }
  )

  const data = await res.json()

  if (!res.ok) throw new Error(data.message)

  return data.data.vote
}
