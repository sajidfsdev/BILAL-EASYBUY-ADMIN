import React from "react";
import useStyles from "./Stats.styles";
import Row from "./../../UI/Row/ELXRow";

const Stats = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Row className={classes.topBar}></Row>
    </React.Fragment>
  );
}; //...................Stats

export default Stats;
