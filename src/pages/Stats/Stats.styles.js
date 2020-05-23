import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  topBar: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  topStatsBox: {
    width: "230px",
    height: "70px",
    display: "flex",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("lg")]: {
      marginBottom: "20px",
    },
  },

  leftSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  rightSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  statIcon: {
    fontSize: "40px",
    color: theme.palette.primary.main,
  },
  statIconFa: {
    fontSize: "40px",
    color: theme.palette.primary.main,
    marginRight: "4px",
  },
  leftTop: {
    fontSize: "30px",
    color: theme.palette.secondary.main,
    marginLeft: "20px",
    marginTop: "10px",
  },
  leftBottom: {
    marginLeft: "20px",
    fontSize: "10px",
    color: theme.palette.primary.main,
  },
}));
