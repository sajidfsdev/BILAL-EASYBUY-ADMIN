import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const CPB = props => {
  return (
    <CircularProgress
      color={props.color}
      style={{
        width: props.size,
        height: props.size
      }}
    />
  );
}; //..................

CPB.defaultProps = {
  color: "#fff",
  size: 25
};

export default CPB;
