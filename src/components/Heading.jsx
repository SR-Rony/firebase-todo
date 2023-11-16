import React from 'react'

const Heading = ({className,text,span}) => {
  return (
    <h1 className={`${className} text-2xl font-bold`}>{text}{span}</h1>
  )
}

export default Heading