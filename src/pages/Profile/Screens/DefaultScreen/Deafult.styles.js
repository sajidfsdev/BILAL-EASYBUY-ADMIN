import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  marginedCell: {
    marginLeft: "50px",
  },
  btnRow: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  inputRow: {
    marginBottom: "10px",
  },
  input: {
    width: "300px",
  },

  errorRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "2px",
    marginBottom: "2px",
    color: "red",
    fontSize: "15px",
  },
}));
