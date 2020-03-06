import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },

  upperBar: {
    width: "150px",
    marginBottom: "10px"
  },

  lowerBar: {
    width: "150px",
    marginTop: "10px"
  }
}));

export default useStyles;
