import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingBar from 'react-top-loading-bar'

function Loading () {
  const { status } = useSelector((state) => state.loadingBar)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (status === 'idle') return
    if (status === 'loading') setProgress(50)
    if (status === 'complete') setProgress(100)
  }, [status])

  return (
    <LoadingBar
      color='red'
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  )
}

export default Loading
