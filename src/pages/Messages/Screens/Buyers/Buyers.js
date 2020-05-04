import React, { useState, useEffect } from "react";
import useStyles from "./Buyers.styles";
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

//constants...
const LOADING = "LOADING";
const ERROR = "ERROR";
const DEFAULT = "DEFAULT";

const data = [
  {
    _id: "187127381",
    buyerId: {
      _id: "868768676876",
      name: "Sajid Ali",
      email: "som email",
      contact: "contact",
      city: "Rawalpindi",
    },
    status: "PENDING",
    title: "Message One",
    message: "Some Message",
    reply: "",
  },
  {
    _id: "187127381",
    buyerId: {
      _id: "868768676876",
      email: "som email",
      contact: "contact",

      name: "Bilal",
      city: "Islamabad",
    },
    status: "PENDING",
    title: "Message Two",
    message: "Some Message Two",
    reply: "",
  },
];

const Buyers = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [screen, setScreen] = useState(DEFAULT);
  const token_RP = useSelector((state) => state.auth.token);
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [spinnerArray, setSpinnerArray] = useState([false, false]);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [reply, setReply] = useState();
  let mainGUI = null;

  if (screen === LOADING) {
    mainGUI = <LoadingScreen title="Loading Buyer Messages" />;
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
            {data.map((elem, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{elem.buyerId.name}</TableCell>
                <TableCell align="center">{elem.buyerId.email}</TableCell>
                <TableCell align="center">{elem.buyerId.contact}</TableCell>
                <TableCell align="center">{elem.buyerId.city}</TableCell>
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
        handleClose={() => setOpenDialogue(false)}
      >
        <Row className={classes.margin}>
          <TextareaAutosize
            style={{
              minWidth: "300px",
            }}
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            aria-label="minimum height"
            rowsMin={6}
            colsMin={10}
            placeholder="Reply..."
          />
        </Row>
        <Row className={classes.margin + " " + classes.btnRow}>
          <Button color="primary" variant="contained">
            Send
          </Button>
        </Row>
      </Dialogue>
      <Row>{mainGUI}</Row>
    </React.Fragment>
  );
}; //...................Users ends here

export default Buyers;
