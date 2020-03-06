import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./Backdrop.styles";

const SimpleBackdrop = props => {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.open}>
        <CircularProgress
          color={props.color}
          style={{
            width: props.size,
            height: props.size
          }}
        />
        <div className={classes.paddingDiv}></div>
        <div>Please Wait!</div>
      </Backdrop>
    </div>
  );
};

SimpleBackdrop.defaultProps = {
  open: false,
  color: "#cededc",
  size: 50
};

export default SimpleBackdrop;
