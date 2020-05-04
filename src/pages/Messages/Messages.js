import React, { useState } from "react";
import Row from "./../../UI/Row/ELXRow";
import useStyles from "./Messages.styles";
import clsx from "clsx";
import BuyersScreen from "./Screens/Buyers/Buyers";
import VendorsScreen from "./Screens/Vendors/Vendors";
import UsersScreen from "./Screens/Users/Users";

//constants....
const USERS = "USERS";
const BUYERS = "BUYERS";
const VENDORS = "VENDORS";

const Messages = (props) => {
  const classes = useStyles();

  const [screen, setScreen] = useState(USERS); //USERS,VENDORS,BUYERS

  let mainGUI = null;

  if (screen === USERS) {
    mainGUI = (
      <React.Fragment>
        <UsersScreen />
      </React.Fragment>
    );
  } else if (screen === VENDORS) {
    mainGUI = (
      <React.Fragment>
        <VendorsScreen />
      </React.Fragment>
    );
  } else {
    mainGUI = (
      <React.Fragment>
        <BuyersScreen />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Row className={classes.bar}>
        <Row
          onClick={() => setScreen(USERS)}
          className={clsx({
            [classes.link]: screen !== USERS,
            [classes.navLink]: screen === USERS,
          })}
        >
          Users
        </Row>
        <Row
          onClick={() => setScreen(BUYERS)}
          className={clsx({
            [classes.link]: screen !== BUYERS,
            [classes.navLink]: screen === BUYERS,
          })}
        >
          Buyers
        </Row>
        <Row
          onClick={() => setScreen(VENDORS)}
          className={clsx({
            [classes.link]: screen !== VENDORS,
            [classes.navLink]: screen === VENDORS,
          })}
        >
          Vendors
        </Row>
      </Row>

      <Row className={classes.margin}>{mainGUI}</Row>
    </React.Fragment>
  );
}; //..................Messages

export default Messages;
