import React from 'react'

const Hedding = ({className,text,span}) => {
  return (
    <h1 className={`${className} text-2xl font-bold`}>{text}{span}</h1>
  )
}

export default Hedding