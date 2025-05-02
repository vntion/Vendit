function Spacing ({ children, isHeightFull = false, testid = null }) {
  return (
    <div
      className={'mx-auto w-[75rem]' + `${isHeightFull ? ' h-full' : ''}`}
      data-testid={testid}
    >
      {children}
    </div>
  )
}

export default Spacing
