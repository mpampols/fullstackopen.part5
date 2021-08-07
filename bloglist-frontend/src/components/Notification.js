import React from "react";

const Notification = ({ message }) => {
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message) {
    return <li style={errorStyle}>{message}</li>;
  } else {
    return <div></div>;
  }
};

export default Notification;
