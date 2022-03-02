import React from 'react'
import Person from './Person'

const Numbers = ({remove, list}) => {
    return (
      <div>
      {list.map(result =>
      <Person result={result} remove={remove} key={result.id}/>
      )}
      </div>
    )
    
  }  

export default Numbers 