import Logo from './Logo'
import Spacing from './Spacing'

function Header () {
  return (
    <header
      className='flex h-[4rem] items-center border-b border-b-gray-600'
      role='banner'
    >
      <Spacing>
        <Logo />
      </Spacing>
    </header>
  )
}

export default Header
