import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import LinearProgress from "./../../../UI/LinearProgress/LinearProgress";
import useStyles from "./LoadingScreen.styles";

const LoadingScreen = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Row className={classes.buffContainer}>
        <LinearProgress color="secondary" />
        <LinearProgress color="secondary" />

        <Row className={classes.buffText}>{props.title}</Row>
      </Row>
    </React.Fragment>
  );
}; //......................Loading Screen

LoadingScreen.defaultProps = {
  title: "",
};

export default LoadingScreen;
