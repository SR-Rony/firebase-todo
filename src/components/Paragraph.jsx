import React from 'react'
import { Link } from 'react-router-dom'

const Paragraph = ({text,className,link,path}) => {
  return (
    <p className={`${className}`}>{text}<Link to={path}>{link}</Link></p>
  )
}

export default Paragraph