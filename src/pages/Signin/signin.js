import React, { useState } from "react";
import useStyles from "./signin.styles";
import Row from "./../../UI/Row/ELXRow";
import Paper from "./../../UI/Paper/Paper";
import LinearProgressBar from "./../../UI/LinearProgress/LinearProgress";
import logo from "./../../Assets/images/optimalLogo.png";
import Avatar from "./../../UI/Avatar/Avatar";
import Input from "./../../UI/Input/Input";
import Button from "./../../UI/Button/ELXButton";
import { useSelector, useDispatch } from "react-redux";
import * as AppTypes from "./../../Store/Constants/App";
import * as Actions from "./../../Store/Action/Auth";

const Signup = props => {
  //styles init...
  const classes = useStyles();

  //state management starts...
  const errorMessage_RP = useSelector(state => state.auth.errorMessage);
  const dispatch_RP = useDispatch();
  const bufferring_RP = useSelector(state => state.app.bufferring);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  //Methods starts...
  const handleFormSubmission = event => {
    event.preventDefault();
    dispatch_RP({ type: AppTypes.STARTAPPBUFFERRING });
    dispatch_RP(Actions.handleLogin(username, password));
  };

  const handleUsernameChange = event => {
    setusername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <Row className={classes.root}>
      <Paper elevation={5} className={classes.box}>
        {bufferring_RP ? <LinearProgressBar color="secondary" /> : null}
        <Row className={classes.logo}>
          <Avatar src={logo} size={14} spacing={2} className={classes.avatar} />
        </Row>
        <form onSubmit={handleFormSubmission}>
          <Row className={classes.inputRow}>
            <Input
              value={username}
              onChange={handleUsernameChange}
              type="text"
              label="Username"
              className={classes.input}
              required
            />
          </Row>
          <Row className={classes.inputRow}>
            <Input
              value={password}
              onChange={handlePasswordChange}
              type="password"
              label="Password"
              className={classes.input}
              required
            />
          </Row>
          <Row className={classes.errorMessage}>{errorMessage_RP}</Row>
          <Row className={classes.inputRow}>
            <Button
              type="submit"
              width={"350px"}
              disabled={bufferring_RP ? true : false}
            >
              SignIn
            </Button>
          </Row>
        </form>
      </Paper>
    </Row>
  );
}; //.....................

export default Signup;
