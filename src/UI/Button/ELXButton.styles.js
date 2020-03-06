import { makeStyles } from "@material-ui/core/styles";

const useStyles = width => {
  return makeStyles(theme => ({
    rootclass: {
      height: "35px",
      width: width,
      borderRadius: "18px",
      color: "#FFFFFF",
      margin: "10px",
      fontFamily: "Arial",
      fontWeight: "normal",
      fontSize: "10.5pt"
    }
  }));
};

export default useStyles;
