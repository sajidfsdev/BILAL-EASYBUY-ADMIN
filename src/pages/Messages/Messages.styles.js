import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  bar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: "35px",
    backgroundColor: theme.palette.primary.main,
    alignItems: "center",
  },
  navLink: {
    fontSize: "15px",
    marginLeft: "15px",
    color: "gold",
    cursor: "pointer",
  },
  link: {
    fontSize: "15px",
    marginLeft: "15px",
    color: "white",
    cursor: "pointer",
  },
}));
