import PropTypes from "prop-types";
import React from "react";
import Button from "@material-ui/core/Button";
import useStyles from "./ELXButton.styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const ELXButton = props => {
  const classes = useStyles(props.width)();
  return (
    <Button
      classes={{
        root: classes.rootclass
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

ELXButton.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.any,
  width: PropTypes.string
};

ELXButton.defaultProps = {
  variant: "contained",
  color: "primary",
  children: "ElXButton",
  width: "auto"
};

export default React.memo(ELXButton);
