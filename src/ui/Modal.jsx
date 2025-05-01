import { cloneElement, createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import useOutsideClick from '../hooks/useOutsideClick'
import Overlay from './Overlay'
import { AiOutlineClose } from 'react-icons/ai'

const ModalContext = createContext()

function Modal ({ children }) {
  const [openName, setOpenName] = useState('')

  const close = () => setOpenName('')
  const open = setOpenName

  return (
    <ModalContext.Provider
      value={{
        openName,
        open,
        close
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

function Open ({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext)

  return cloneElement(children, { onClick: () => open(opensWindowName) })
}

function Window ({ children, name }) {
  const { openName, close } = useContext(ModalContext)
  const ref = useOutsideClick(close)

  if (name !== openName) return null

  return createPortal(
    <Overlay>
      <div
        ref={ref}
        className='fixed top-1/2 left-1/2 z-50 -translate-1/2 transform rounded-md bg-gray-50 p-3 shadow transition-all'
      >
        <button
          className='absolute top-2 right-2 text-sm text-black hover:cursor-pointer'
          onClick={close}
        >
          <AiOutlineClose />
        </button>

        {cloneElement(children, { onCloseModal: close })}
      </div>
    </Overlay>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
