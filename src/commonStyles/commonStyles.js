import { makeStyles } from "@material-ui/core/styles";

export const containerStyles = (subContainerWidth = "90%") => {
  return makeStyles((theme) => ({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    subContainer: {
      width: subContainerWidth,
      display: "flex",
      flexDirection: "column",
    },
  }))();
}; //................................container Styling

export const marginStyling = (margin = "10px") => {
  return makeStyles((theme) => ({
    marginTop: {
      marginTop: margin,
    },
  }))();
}; //..................................marginStyling

export const iconStyling = (size = "22px", color = undefined) => {
  return makeStyles((theme) => {
    let fontColor = color === undefined ? theme.palette.primary.main : color;
    return {
      icon: {
        fontSize: size,
        color: fontColor,
        cursor: "pointer",
      },
    };
  })();
}; //....................................icon styling
