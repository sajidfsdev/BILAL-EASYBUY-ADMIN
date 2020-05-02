import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import useStyles from "./ErrorScreen.styles";
import WarningIcon from "@material-ui/icons/Warning";
import CachedIcon from "@material-ui/icons/Cached";
import { Button } from "@material-ui/core";

const ErrorScreen = (props) => {
  const classes = useStyles();

  return (
    <Row className={classes.container}>
      <Row className={classes.iconRow}>
        <WarningIcon className={classes.icon} />
      </Row>
      <Row className={classes.errorMessageRow}>{props.errorMessage}</Row>
      {props.showReloadButton ? (
        <Row className={classes.btnRow}>
          <Button
            onClick={props.handleReload}
            className={classes.btn}
            startIcon={<CachedIcon />}
            color="primary"
            variant="contained"
          >
            Reload
          </Button>
        </Row>
      ) : null}
    </Row>
  );
}; //.........................Error Screen
ErrorScreen.defaultProps = {
  errorMessage: "Failed To Load Resources Due To Network Error",
  showReloadButton: true,
  handleReload: () => {},
};

export default ErrorScreen;
