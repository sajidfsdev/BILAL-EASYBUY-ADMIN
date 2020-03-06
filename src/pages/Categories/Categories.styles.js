import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  input: {
    width: "300px"
  },

  screen: {
    width: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginTop: "10px"
  },

  buffContainer: {
    width: "100%",
    height: "100%",
    padding: "200px",
    display: "flex",
    flexFlow: "column",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  buffText: {
    marginTop: "20px",
    fontWeight: "bold",
    color: theme.palette.primary.main
  },

  emptyContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px"
  },

  empty: {
    color: theme.palette.primary.main,
    fontSize: "17px"
  },
  error: {
    color: theme.palette.secondary.main,
    fontSize: "17px"
  }
}));

export default useStyles;
