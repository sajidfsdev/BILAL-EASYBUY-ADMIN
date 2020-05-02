import React from "react";
import Switch from "@material-ui/core/Switch";

const SwitchComp = (props) => {
  return (
    <Switch
      checked={props.checked}
      onChange={props.handleChange}
      color={props.color}
      inputProps={{ "aria-label": "primary checkbox" }}
    />
  );
}; //.....................Switch

Switch.defaultProps = {
  checked: true,
  handleChange: () => {},
  color: "primary",
};

export default SwitchComp;
