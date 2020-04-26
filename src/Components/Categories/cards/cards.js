import React, { useState } from "react";
import Row from "./../../../UI/Row/ELXRow";
import Paper from "./../../../UI/Paper/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DraggableDialogue from "./../../../UI/DraggableDialogue/DraggableDialogue";
import Input from "./../../../UI/Input/Input";
import Button from "./../../../UI/Button/ELXButton";
import useStyles from "./cards.styles";

const Card = (props) => {
  //styles init...
  const classes = useStyles();

  //states....
  const [showEditDialogue, setShowEditDialogue] = useState(false);
  const [editText, setEditText] = useState("");
  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);

  //Methods..........
  const handleCardDelete = () => {
    setShowDeleteDialogue(false);
    props.delete(props.elem);
  }; //..........................

  const handleCardEdit = () => {
    const id = props.elem._id;
    const value = editText;
    setEditText("");
    props.edit(value, props.children, id);
    setShowEditDialogue(false);
  }; //.......................Handle Card Edit

  //return starts....
  return (
    <React.Fragment>
      <DraggableDialogue
        open={showDeleteDialogue}
        title={`Are You Sure You Want To Delete`}
        handleClose={() => {
          setShowDeleteDialogue(false);
        }}
      >
        <Row className={classes.btnRow}>
          <Button
            className={classes.deleteBtn}
            variant="contained"
            onClick={handleCardDelete}
          >
            Delete
          </Button>
          <Button
            className={classes.cancelBtn}
            variant="contained"
            onClick={() => {
              setShowDeleteDialogue(false);
            }}
          >
            Cancel
          </Button>
        </Row>
      </DraggableDialogue>
      <DraggableDialogue
        open={showEditDialogue}
        title={`Edit Category ${props.children.toLowerCase()}`}
        handleClose={() => {
          setShowEditDialogue(false);
        }}
      >
        <Row className={classes.inputWrapper}>
          <Input
            type="text"
            value={editText}
            onChange={(event) => {
              setEditText(event.target.value);
            }}
            className={classes.input}
          />
        </Row>
        <Row className={classes.btnRow}>
          <Button color="primary" variant="contained" onClick={handleCardEdit}>
            Edit
          </Button>
        </Row>
      </DraggableDialogue>
      <Paper elevation={8} className={classes.card}>
        <Row className={classes.iconBox}>
          <EditIcon
            color="primary"
            onClick={() => {
              setShowEditDialogue(true);
            }}
          />
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
          <DeleteIcon
            onClick={() => {
              setShowDeleteDialogue(true);
            }}
            color="secondary"
          />
        </Row>
      </Paper>
    </React.Fragment>
  );
  //return ends......
}; //...................

Card.defaultProps = {
  children: "",
};

export default Card;
