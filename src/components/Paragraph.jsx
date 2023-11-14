import React from 'react'
import { Link } from 'react-router-dom'

const Paragraph = ({text,className,link,path}) => {
  return (
    <p className={`${className}`}>{text}<Link className='text-blue-700' to={path}>{link}</Link></p>
  )
}

export default Paragraph