import React from "react";
import ELXRow from "./../../UI/Row/ELXRow";
import useStyles from "./AppBar.styles";

const AppBar = props => {
  //stykes init....
  const classes = useStyles();

  return (
    <ELXRow className={classes.root}>
      <ELXRow className={classes.leftSection}>Easy Buy</ELXRow>
      <ELXRow className={classes.rightSection}>Right</ELXRow>
    </ELXRow>
  );
}; //.....................

export default AppBar;
