import { makeStyles } from "@material-ui/core/styles";

const useStyles = (size, spacing) => {
  return makeStyles(theme => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(spacing)
      }
    },

    large: {
      width: theme.spacing(size),
      height: theme.spacing(size)
    }
  }));
};

export default useStyles;
