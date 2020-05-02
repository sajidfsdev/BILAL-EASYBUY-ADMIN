import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  iconRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "20px",
  },
  icon: {
    fontSize: "100px",
    color: "red",
  },
  errorMessageRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: "18px",
    color: "red",
  },

  btnRow: {
    marginTop: "20px",
  },
}));
