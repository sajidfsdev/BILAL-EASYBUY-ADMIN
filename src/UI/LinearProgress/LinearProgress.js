import React from "react";
import useStyles from "./LinearProgress.styles";
import LinearBar from "@material-ui/core/LinearProgress";
import clsx from "clsx";
import Row from "./../Row/ELXRow";

const LinearProgress = props => {
  const classes = useStyles();
  return (
    <Row
      className={clsx({
        [classes.root]: props.className === undefined,
        [props.className]: props.className !== undefined
      })}
    >
      <LinearBar variant={props.variant} color={props.color} />
    </Row>
  );
}; //...........................

LinearProgress.defaultProps = {
  className: undefined,
  color: "primary",
  variant: "query"
};

export default LinearProgress;
