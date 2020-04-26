import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  createMuiTheme,
  ThemeProvider,
  useTheme
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CategoryIcon from "@material-ui/icons/Category";
import HomeIcon from "@material-ui/icons/Home";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import useStyles from "./Dashboard.styles";
import { Route, Switch, NavLink } from "react-router-dom";
import CategoryPage from "./../pages/Categories/Categories";
import FourOFourPage from "./../pages/404/404";
import { useSelector, useDispatch } from "react-redux";
import * as AppTypes from "./../Store/Constants/App";
import * as CatActions from "./../Store/Action/cat";

const MyTheme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      root: {}
    }
  },
  palette: {
    primary: {
      main: "#1c7ba2"
    }
  }
});
const Dashboard = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeNav, setActiveNav] = useState("/");
  const token_RP = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  //use effect starts.....
  useEffect(() => {
    handleLoadinAllCats();
  }, []);

  const handleLoadinAllCats = () => {
    dispatch({ type: AppTypes.STARTCATBUFFERRING });
    dispatch(CatActions.handleLoadAllCats(token_RP));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={MyTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List></List>
          <Divider />
          <List>
            <NavLink
              to="/"
              onClick={() => {
                setActiveNav("/");
              }}
              exact
              activeStyle={{
                color: "red",
                textDecoration: "none"
              }}
            >
              <ListItem button>
                <ListItemIcon>
                  <CategoryIcon
                    color={
                      activeNav === "/categories" ? "secondary" : "primary"
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={"Categories"} />
              </ListItem>
            </NavLink>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <PermContactCalendarIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path="/" component={CategoryPage} />
            <Route component={FourOFourPage} />
          </Switch>

          {/* <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography> */}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
