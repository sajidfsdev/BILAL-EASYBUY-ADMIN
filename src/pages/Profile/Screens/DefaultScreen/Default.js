import React, { useState } from "react";
import Row from "./../../../../UI/Row/ELXRow";
import DraggableDialogue from "./../../../../UI/DraggableDialogue/DraggableDialogue";
import Input from "./../../../../UI/Input/Input";
import Button from "./../../../../UI/Button/ELXButton";
import Table from "./../../../../UI/Table/Table";
import TableRow from "./../../../../UI/Table/TableRow";
import TableCell from "./../../../../UI/Table/TableCell";
import EditIcon from "@material-ui/icons/Edit";
import * as constants from "./../../constants";
import { iconStyling } from "./../../../../commonStyles/commonStyles";
import Spinner from "./../../../../UI/CircularProgressBar/CircularProgressBar";
import useStyles from "./Deafult.styles";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../../../Store/Action/Profile";
import * as Types from "./../../../../Store/Constants/Profile";

//Variables...
let currentField = "";

const Default = (props) => {
  //styes init
  const classes = useStyles();
  const iconClass = iconStyling();
  const [openDialogue, setOpenDialogue] = useState(false);
  const [dialogueTitle, setDialogueTitle] = useState("");
  const [firstinputValue, setFirstInputValue] = useState("");
  const [passwordEditing, setPasswordEditting] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  //Redux...
  const editBufferring_RP = useSelector(
    (state) => state.profile.editBufferring
  );
  const isEditError_RP = useSelector((state) => state.profile.isEditError);
  const editErrorMessage_RP = useSelector(
    (state) => state.profile.editErrorMessage
  );
  const openDialogue_RP = useSelector((state) => state.profile.openDialogue);
  const token_RP = useSelector((state) => state.auth.token);
  const dispatch_RP = useDispatch();

  //Methods......
  const handleEditing = () => {
    if (currentField == constants.EDIT_FIRST_NAME) {
      if (firstinputValue === "") return;
      dispatch_RP({ type: Types.START_EDIT_BUFFERRING });
      dispatch_RP(
        Actions.handleEditProfileData(
          {
            fname: firstinputValue.toUpperCase(),
            lname: props.data.lname,
            email: props.data.email,
          },
          token_RP
        )
      );
    } else if (currentField === constants.EDIT_LAST_NAME) {
      if (firstinputValue === "") return;
      dispatch_RP({ type: Types.START_EDIT_BUFFERRING });
      dispatch_RP(
        Actions.handleEditProfileData(
          {
            fname: props.data.fname,
            lname: firstinputValue.toUpperCase(),
            email: props.data.email,
          },
          token_RP
        )
      );
    } else if (currentField === constants.EDIT_USERNAME) {
      if (firstinputValue === "") return;
      dispatch_RP({ type: Types.START_EDIT_BUFFERRING });
      dispatch_RP(
        Actions.handleEditProfileData(
          {
            fname: props.data.fname,
            lname: props.data.lname,
            email: firstinputValue,
          },
          token_RP
        )
      );
    } else if (currentField === constants.EDIT_PASSWORD) {
      if (oldPassword === "" || newPassword === "" || confirmNewPassword === "")
        return;
      if (newPassword !== confirmNewPassword) {
        return dispatch_RP({
          type: Types.EDITING_FAILED,
          payload: { errorMessage: "New and confirm password did not match" },
        });
      }

      dispatch_RP({ type: Types.START_EDIT_BUFFERRING });
      dispatch_RP(
        Actions.handleEditPassword(oldPassword, newPassword, token_RP)
      );
    }
  }; //.......................Handle Editing

  const handleOpenDialogue = (fieldtype) => {
    switch (fieldtype) {
      case constants.EDIT_FIRST_NAME:
        setDialogueTitle("Edit Your First Name");
        currentField = constants.EDIT_FIRST_NAME;
        setFirstInputValue(props.data.fname);
        setPasswordEditting(false);
        dispatch_RP({ type: Types.OPEN_DIALOGUE });
        break;

      case constants.EDIT_LAST_NAME:
        setDialogueTitle("Edit Your Last Name");
        setFirstInputValue(props.data.lname);
        currentField = constants.EDIT_LAST_NAME;
        setPasswordEditting(false);
        dispatch_RP({ type: Types.OPEN_DIALOGUE });
        break;

      case constants.EDIT_USERNAME:
        setDialogueTitle("Edit Your Username Name");
        setFirstInputValue(props.data.email);
        currentField = constants.EDIT_USERNAME;
        setPasswordEditting(false);
        dispatch_RP({ type: Types.OPEN_DIALOGUE });
        break;

      case constants.EDIT_PASSWORD:
        setDialogueTitle("Update your password");
        currentField = constants.EDIT_PASSWORD;
        setPasswordEditting(true);
        dispatch_RP({ type: Types.OPEN_DIALOGUE });
        break;
    }
  }; //................................Handle open Dialogue

  const handleCloseDialogue = () => {
    if (editBufferring_RP) return;
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setFirstInputValue("");
    dispatch_RP({ type: Types.RESET_EDIT });
  };

  return (
    <React.Fragment>
      <Table
        headings={[
          { title: "Title", align: "center" },
          { title: "Current Value", align: "left" },
          { title: "Edit", align: "center" },
        ]}
      >
        <TableRow>
          <TableCell align="center">Username</TableCell>
          <TableCell align="left">{props.data.email}</TableCell>
          <TableCell align="center">
            <EditIcon
              onClick={handleOpenDialogue.bind(this, constants.EDIT_USERNAME)}
              className={iconClass.icon}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="center">First Name</TableCell>
          <TableCell align="left">{props.data.fname}</TableCell>
          <TableCell align="center">
            <EditIcon
              onClick={handleOpenDialogue.bind(this, constants.EDIT_FIRST_NAME)}
              className={iconClass.icon}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="center">Last Name</TableCell>
          <TableCell align="left">{props.data.lname}</TableCell>
          <TableCell align="center">
            <EditIcon
              onClick={handleOpenDialogue.bind(this, constants.EDIT_LAST_NAME)}
              className={iconClass.icon}
            />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell align="center">Password</TableCell>
          <TableCell align="left">XXX.......</TableCell>
          <TableCell align="center">
            <EditIcon
              onClick={handleOpenDialogue.bind(this, constants.EDIT_PASSWORD)}
              className={iconClass.icon}
            />
          </TableCell>
        </TableRow>
      </Table>

      {/* Dialogue Box starts... */}
      <DraggableDialogue
        open={openDialogue_RP}
        title={dialogueTitle}
        handleClose={handleCloseDialogue}
      >
        {passwordEditing ? (
          <React.Fragment>
            <Row className={classes.inputRow}>
              <Input
                type="password"
                label="Current Password"
                value={oldPassword}
                className={classes.input}
                onChange={(event) => setOldPassword(event.target.value)}
              />
            </Row>
            <Row className={classes.inputRow}>
              <Input
                type="password"
                label="New Password"
                value={newPassword}
                className={classes.input}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </Row>
            <Row className={classes.inputRow}>
              <Input
                type="password"
                label="confirm new password"
                value={confirmNewPassword}
                className={classes.input}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
              />
            </Row>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Row className={classes.inputRow}>
              <Input
                type="text"
                value={firstinputValue}
                className={classes.input}
                onChange={(event) => setFirstInputValue(event.target.value)}
              />
            </Row>
          </React.Fragment>
        )}
        <React.Fragment>
          {isEditError_RP ? (
            <Row className={classes.errorRow}>{editErrorMessage_RP}</Row>
          ) : null}

          <Row className={classes.btnRow}>
            <Button
              onClick={handleEditing}
              disabled={editBufferring_RP ? true : false}
              color="primary"
            >
              {editBufferring_RP ? (
                <Spinner className={classes.spinner} />
              ) : (
                "Edit"
              )}
            </Button>
          </Row>
        </React.Fragment>
      </DraggableDialogue>
      {/* Dialogue Box Ends..... */}
    </React.Fragment>
  );
}; //.......................Deafult Screen

export default Default;
