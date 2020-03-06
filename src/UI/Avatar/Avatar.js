import React from "react";
import Avatar from "@material-ui/core/Avatar";
import useStyles from "./Avatar.styles";
import Row from "./../Row/ELXRow";
import clsx from "clsx";

const AvatarComp = props => {
  const classes = useStyles(props.size, props.spacing)();

  return (
    <Row
      className={clsx({
        [classes.root]: props.className === undefined,
        [props.className]: props.className !== undefined
      })}
    >
      <Avatar
        alt="Failed To Load Image"
        src={props.src}
        className={classes.large}
      />
    </Row>
  );
}; //....................

AvatarComp.defaultProps = {
  src: null,
  className: undefined,
  size: 7,
  spacing: 1
};

export default AvatarComp;
