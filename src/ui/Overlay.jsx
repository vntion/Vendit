function Overlay ({ children }) {
  return (
    <div className='fixed top-0 left-0 z-40 size-full backdrop-blur-xs'>
      {children}
    </div>
  )
}

export default Overlay
