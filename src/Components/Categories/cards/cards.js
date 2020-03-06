import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import Paper from "./../../../UI/Paper/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./cards.styles";

const Card = props => {
  //styles init...
  const classes = useStyles();

  //return starts....
  return (
    <Paper elevation={8} className={classes.card}>
      <Row className={classes.iconBox}>
        <EditIcon color="primary" />
      </Row>
      <Row
        onClick={() => {
          props.handleCardClick(props.elem);
        }}
        className={classes.text}
      >
        {props.children}
      </Row>
      <Row className={classes.iconBox}>
        <DeleteIcon color="secondary" />
      </Row>
    </Paper>
  );
  //return ends......
}; //...................

Card.defaultProps = {
  children: ""
};

export default Card;
