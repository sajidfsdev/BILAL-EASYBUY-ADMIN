import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  detailsIcon: {
    fontSize: "25px",
    cursor: "pointer",
    color: "green",
  },

  deleteIcon: {
    fontSize: "25px",
    cursor: "pointer",
    color: "red",
  },

  margin: {
    marginTop: "10px",
  },
  backBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "30px",
    backgroundColor: theme.palette.primary.main,
  },
  backspaceIcon: {
    fontSize: "25px",
    color: "red",
    cursor: "pointer",
    marginLeft: "10px",
  },

  deActivateBtn: {
    marginRight: "10px",
  },

  title: {
    color: "white",
  },
}));
