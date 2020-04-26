import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "20px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "fit-content",
    minWidth: "230px",
    overflow: "auto",
    height: "auto",
  },

  iconBox: {
    width: "10%",
    display: "flex",
    height: "auto",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  text: {
    width: "80%",
    height: "auto",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textOverflow: "ellipsis",
    cursor: "pointer",
  },
  btnRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  deleteBtn: {
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  cancelBtn: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default useStyles;
