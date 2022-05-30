import React from 'react'

const TitlePage = (props) => {
  return (
    <h1  className="text-center uppercase textMono text-2xl md:text-3xl lg:text-4xl font-bold mb-6">{props.children}</h1>
  )
}

export default TitlePage