import React, { useState, useEffect } from "react";
import useStyles from "./Vendors.styles";
import Row from "./../../../../UI/Row/ELXRow";
import { useSelector } from "react-redux";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

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
import Button from "@material-ui/core/Button";
import Dialogue from "./../../../../UI/DraggableDialogue/DraggableDialogue";
import { CircularProgress } from "@material-ui/core";

//constants...
const LOADING = "LOADING";
const ERROR = "ERROR";
const DEFAULT = "DEFAULT";

const Buyers = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [screen, setScreen] = useState(LOADING);
  const token_RP = useSelector((state) => state.auth.token);
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [spinnerArray, setSpinnerArray] = useState([false, false]);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [inlineSpinner, setInlineSpinner] = useState(false);
  const [reply, setReply] = useState();

  useEffect(() => {
    handleLoadBuyerMessages();
  }, []);

  //Methods...

  const handleDoReply = async (event) => {
    event.preventDefault();
    const _id = currentData._id;

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token_RP,
      },
    };

    const body = JSON.stringify({ _id, reply });

    setInlineSpinner(true);

    try {
      const res = await axios.post(
        AppConsts.server + "/admin/messages/replyVendor",
        body,
        config
      );

      if (res) {
        handleShowSnackBar("Message has been replied successfully", "success");
        setOpenDialogue(false);
        setInlineSpinner(false);
        setReply("");
        handleLoadBuyerMessages();
      } else {
        handleShowSnackBar(
          "Unable to send message due to network error",
          "error"
        );
        setInlineSpinner(false);
      }
    } catch (err) {
      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
        setInlineSpinner(false);
      } else {
        handleShowSnackBar(err.message, "error");
        setInlineSpinner(false);
      }
    }
  }; //.................Handle do reply

  const handleLoadBuyerMessages = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token_RP,
      },
    };

    try {
      const res = await axios.post(
        AppConsts.server + "/admin/messages/getVendorMessages",
        JSON.stringify({ action: "Load" }),
        config
      );

      if (res) {
        console.log(res.data.data);
        setMessages([...res.data.data]);
        if (res.data.data.length === 0) {
          handleShowSnackBar("There are no Vendor Messgaes Available", "error");
        }
        setScreen(DEFAULT);
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
  }; //...............Handle load buyer messages

  const handleShowSnackBar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  let mainGUI = null;

  if (screen === LOADING) {
    mainGUI = <LoadingScreen title="Loading Vendor Messages" />;
  } else if (screen === ERROR) {
    mainGUI = (
      <ErrorScreen handleReload={() => {}} errorMessage={errorMessage} />
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
              { title: "Contact", align: "center" },
              { title: "City", align: "center" },
              { title: "Title", align: "center" },
              { title: "Message", align: "center" },
              { title: "Reply", align: "center" },
            ]}
          >
            {messages.map((elem, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{elem.vendorId.name}</TableCell>
                <TableCell align="center">{elem.vendorId.email}</TableCell>
                <TableCell align="center">{elem.vendorId.contact}</TableCell>
                <TableCell align="center">{elem.vendorId.city}</TableCell>
                <TableCell align="center">{elem.title}</TableCell>
                <TableCell align="center">{elem.message}</TableCell>
                <TableCell align="center">
                  {spinnerArray[index] ? (
                    <Spinner size={25} color="secondary" />
                  ) : (
                    <Button
                      onClick={() => {
                        setCurrentData(elem);
                        setOpenDialogue(true);
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Reply
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Row>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Dialogue
        open={openDialogue}
        title={`Reply to  Message`}
        handleClose={() => {
          if (!inlineSpinner) {
            setOpenDialogue(false);
          }
        }}
      >
        <form onSubmit={handleDoReply}>
          <Row className={classes.margin}>
            <TextareaAutosize
              style={{
                minWidth: "300px",
              }}
              required
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              aria-label="minimum height"
              rowsMin={6}
              colsMin={10}
              placeholder="Reply..."
            />
          </Row>
          <Row className={classes.margin + " " + classes.btnRow}>
            {inlineSpinner ? (
              <Button type="btn" disabled={true}>
                <CircularProgress color="secondary" size={20} />
              </Button>
            ) : (
              <Button type="submit" color="primary" variant="contained">
                Send
              </Button>
            )}
          </Row>
        </form>
      </Dialogue>

      <Row>{mainGUI}</Row>
    </React.Fragment>
  );
}; //...................Users ends here

export default Buyers;
