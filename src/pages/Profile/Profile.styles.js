import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10px",
    fontSize: "20px",
    color: theme.palette.primary.main,
  },
}));
