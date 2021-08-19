import React from 'react'

const Notification = ({ status, message }) => {
  const errorStyle = {
    color: status === 'ok' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message) {
    return <div style={errorStyle}>{message}</div>
  } else {
    return <div></div>
  }
}

export default Notification
