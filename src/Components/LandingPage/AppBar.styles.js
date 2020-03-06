import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "50px",
    backgroundColor: "#039be5",
    color: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  leftSection: {
    paddingLeft: "70px",
    fontSize: "20px"
  },
  rightSection: {}
}));

export default useStyles;
