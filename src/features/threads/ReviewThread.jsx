function ReviewThread ({ children, className }) {
  return (
    <div
      className={
        'relative z-30 flex space-x-2 *:flex *:items-center [&_span]:text-xs' +
        ` ${className}`
      }
    >
      {children}
    </div>
  )
}

export default ReviewThread
