import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  buffContainer: {
    width: "100%",
    height: "100%",
    padding: "150px",
    display: "flex",
    flexFlow: "column",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  buffText: {
    marginTop: "20px",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
}));
