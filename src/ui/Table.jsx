function Table ({ cols, rows, children }) {
  return (
    <div
      role='table'
      className={`grid ${cols} ${rows} grow gap-y-5 rounded-md border border-gray-600 p-3`}
    >
      {children}
    </div>
  )
}

function Header ({ children }) {
  return children
}

function Body ({ children }) {
  return children
}

Table.Header = Header
Table.Body = Body

export default Table
