import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  topBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "40px",
    marginTop: "10px",
    backgroundColor: theme.palette.primary.main,
  },

  leftBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "20px",
    width: "100%",
    maxWidth: "130px",
  },
  active: {
    color: "gold",
  },
  inActive: {
    color: "white",
  },
  navLink: {
    cursor: "pointer",
  },

  rightBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "20px",
    width: "100%",
    maxWidth: "400px",
  },

  input: {
    width: "200px",
    fontSize: "15px",
    padding: "5px",
    marginLeft: "5px",
  },
}));
