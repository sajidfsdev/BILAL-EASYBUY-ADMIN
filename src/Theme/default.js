import { createMuiTheme } from "@material-ui/core/styles";

const DefaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#29ABE1"
    },
    secondary: {
      main: "#56c9ef"
    }
  },
  typography: {
    fontFamily: "Helvetica Neue"
  }
});

export default DefaultTheme;
