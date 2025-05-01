function Spinner ({ size }) {
  return (
    <div className='flex h-min justify-center'>
      <div className={`${size === 'mini' ? 'loader-mini' : 'loader'}`} />
    </div>
  )
}

export default Spinner
