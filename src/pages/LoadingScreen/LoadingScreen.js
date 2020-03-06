import React from "react";
import useStyles from "./LoadingScreen.styles";
import src from "./../../Assets/images/optimalLogo.png";
import LinearBuffer from "./../../UI/LinearProgress/LinearProgress";

const LoadingScreen = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LinearBuffer color="secondary" className={classes.upperBar} />
      <img src={src} className={classes.image} />
      <LinearBuffer color="primary" className={classes.lowerBar} />
      <div>Please Wait</div>
    </div>
  );
}; //............................

export default LoadingScreen;
