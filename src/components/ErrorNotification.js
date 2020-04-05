import React from "react";
import ErrorStyle from "../styles/Error";

const Error = props => {
  if (props.error) {
    return <ErrorStyle>{props.error}</ErrorStyle>;
  } else {
    return null;
  }
};

export default Error;
