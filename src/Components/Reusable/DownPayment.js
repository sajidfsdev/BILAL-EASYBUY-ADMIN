import React from "react";
import Row from "./../../UI/Row/ELXRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  downContainer: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  downLeft: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },

  downRight: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
  },
}));

const Gallery = (props) => {
  //const classes
  const classes = useStyles();
  return (
    <Row className={classes.downContainer}>
      <Row className={classes.downLeft}>Down Payment</Row>
      <Row className={classes.downRight}>Rs: {props.downPayment}</Row>
    </Row>
  );
}; //...................
Gallery.defaultProps = {
  downPayment: 0,
};

export default Gallery;
