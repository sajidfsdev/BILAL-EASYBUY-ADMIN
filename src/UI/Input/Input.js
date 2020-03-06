import React from "react";
import TextField from "@material-ui/core/TextField";

const BasicTextFields = props => {
  return <TextField {...props} />;
};

BasicTextFields.defaultProps = {
  variant: "outlined",
  label: "",
  id: ""
};

export default BasicTextFields;
