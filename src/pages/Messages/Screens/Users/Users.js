import React, { useState, useEffect } from "react";
import useStyles from "./Users.styles";
import Row from "./../../../../UI/Row/ELXRow";
import { useSelector } from "react-redux";
import LoadingScreen from "./../../../../Components/Reusable/LoadingScreen/LoadingScreen";
import ErrorScreen from "./../../../../Components/Reusable/ErrorScreen/ErrorScreen";
import AppConsts from "./../../../../Constants/Strings";
import axios from "axios";
import { useSnackbar } from "notistack";
import Table from "./../../../../UI/Table/Table";
import TableCell from "./../../../../UI/Table/TableCell";

import TableRow from "./../../../../UI/Table/TableRow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Spinner from "./../../../../UI/CircularProgressBar/CircularProgressBar";

//constants...
const LOADING = "LOADING";
const ERROR = "ERROR";
const DEFAULT = "DEFAULT";

const Users = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [screen, setScreen] = useState(LOADING);
  const token_RP = useSelector((state) => state.auth.token);
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [spinnerArray, setSpinnerArray] = useState([]);

  useEffect(() => {
    LoadUserMessages();
  }, []);

  //Methods...
  const handleDeleteMessage = async (_id, index) => {
    setSpinnerArray([
      ...spinnerArray.map((elem, ind) => (ind === index ? true : false)),
    ]);

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token_RP,
      },
    };

    const body = JSON.stringify({ _id });

    try {
      const res = await axios.post(
        AppConsts.server + "/admin/messages/deleteUserMessages",
        body,
        config
      );

      if (res) {
        handleShowSnackBar("Mesage delete successfully", "success");
        const messageArray = [...messages.filter((elem) => elem._id !== _id)];
        setMessages([...messageArray]);

        setSpinnerArray([...messageArray.map((elem) => false)]);
      } else {
        handleShowSnackBar(
          "Failed to Delete messages due to Network error",
          "error"
        );
      }
    } catch (err) {
      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
      } else {
        handleShowSnackBar(err.message, "error");
      }
    }
  }; //......................................Hanle delete message

  //Methods.....
  const LoadUserMessages = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token_RP,
      },
    };

    const body = JSON.stringify({ action: "LOAD" });

    try {
      const res = await axios.post(
        AppConsts.server + "/admin/messages/getUserMessages",
        body,
        config
      );

      if (res) {
        setMessages([...res.data.data]);
        if (res.data.data.length === 0) {
          handleShowSnackBar("There are no User Messgaes Available", "error");
        }
        setScreen(DEFAULT);
        setSpinnerArray([...res.data.data.map((elem) => false)]);
      } else {
        setScreen(ERROR);
        handleShowSnackBar(
          "Failed to load messages due to Network error",
          "error"
        );
        setErrorMessage("Failed to load messages due to Network error");
      }
    } catch (err) {
      if (err.response) {
        setScreen(ERROR);
        setErrorMessage(err.response.data.errorMessage);
        handleShowSnackBar(err.response.data.errorMessage, "error");
      } else {
        setScreen(ERROR);
        setErrorMessage(err.message);
        handleShowSnackBar(err.message, "error");
      }
    }
  }; //..................Load user messages

  const handleShowSnackBar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  let mainGUI = null;

  if (screen === LOADING) {
    mainGUI = <LoadingScreen title="Loading User Messages" />;
  } else if (screen === ERROR) {
    mainGUI = (
      <ErrorScreen
        handleReload={LoadUserMessages}
        errorMessage={errorMessage}
      />
    );
  } else if (screen === DEFAULT) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.margin}>
          <Table
            headings={[
              { title: "SR", align: "center" },
              { title: "Name", align: "center" },
              { title: "Email", align: "center" },
              { title: "Message", align: "center" },
              { title: "Delete", align: "center" },
            ]}
          >
            {messages.map((elem, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{elem.name}</TableCell>
                <TableCell align="center">{elem.email}</TableCell>
                <TableCell align="center">{elem.message}</TableCell>
                <TableCell align="center">
                  {spinnerArray[index] ? (
                    <Spinner size={25} color="secondary" />
                  ) : (
                    <DeleteForeverIcon
                      onClick={() => {
                        handleDeleteMessage(elem._id, index);
                      }}
                      className={classes.deleteIcon}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Row>
      </React.Fragment>
    );
  }

  return <React.Fragment>{mainGUI}</React.Fragment>;
}; //...................Users ends here

export default Users;
