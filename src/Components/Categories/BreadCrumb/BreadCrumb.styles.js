import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: "10px"
  },

  link: {
    cursor: "pointer"
  }
}));

export default useStyles;
