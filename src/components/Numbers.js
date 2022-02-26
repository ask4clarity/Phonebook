import React from 'react'

const Numbers = (props) => {
    return (
      props.list.map(result =>
        <p key={result.name}>{result.name} {result.number}</p>
      )
    )
  }  

export default Numbers 