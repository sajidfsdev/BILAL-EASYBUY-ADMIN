import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },

  box: {
    width: "450px",
    height: "auto",
    paddingBottom: "30px"
  },

  avatar: {
    display: "flex",
    "& > *": {
      margin: "20px auto"
    }
  },
  large: {
    width: theme.spacing(140),
    height: theme.spacing(140)
  },

  inputRow: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "10px"
  },
  errorMessage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "10px",
    color: "red"
  },

  input: {
    width: "350px"
  },
  btn: {
    width: "350px"
  }
}));

export default useStyles;
