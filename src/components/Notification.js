import React from 'react'

const Notification = ({ message, flag }) => {
    if (message === null) {
      return null
    }

    const type = message.includes('succesfully')
    ? {
      color: 'green',
    }
    : {
      color: 'red',
    }
  
    return (
      <div style={type}>
        {message}
      </div>
    )
  }

  export default Notification