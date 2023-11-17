import React from 'react'

const Button = ({text,onClick}) => {
  return (
    <button className='py-1 px-5  bg-blue-800 ring ring-blue-800 text-white mx-2 hover:bg-transparent hover:text-blue-800' onClick={onClick}>{text}</button>
  )
}

export default Button