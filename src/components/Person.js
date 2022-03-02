import React from 'react'

const Person = ({result, remove}) => {
    return (
        <>
        <p>{result.name} {result.number}</p>
        <button onClick={() => remove(result.id)}>delete</button>
        </>
    )
}

export default Person 