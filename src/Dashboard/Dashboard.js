import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  createMuiTheme,
  ThemeProvider,
  useTheme,
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
import Tooltip from "@material-ui/core/Tooltip";
import ProfilePage from "./../pages/Profile/Profile";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import TrafficIcon from "@material-ui/icons/Traffic";
import DraggableDialogue from "./../UI/DraggableDialogue/DraggableDialogue";
import TrafficPage from "./../pages/Traffic/Traffic";
import Button from "./../UI/Button/ELXButton";
import * as AuthTypes from "./../Store/Constants/Auth";
import * as AuthActions from "./../Store/Action/Auth";
import { useLocation } from "react-router-dom";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import StatsPage from "./../pages/Stats/Stats";

const MyTheme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      root: {},
    },
  },
  palette: {
    primary: {
      main: "#1c7ba2",
    },
  },
});
const Dashboard = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [activeNav, setActiveNav] = useState("");
  const token_RP = useSelector((state) => state.auth.token);
  const [openConfirm, setConfirm] = useState(false);
  const dispatch = useDispatch();

  //use effect starts.....
  useEffect(() => {
    setActiveNav(location.pathname);
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
      <DraggableDialogue
        title="Are you sure you want to logout?"
        open={openConfirm}
        handleClose={() => {
          setConfirm(false);
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Button
            size="small"
            onClick={() => dispatch(AuthActions.handleLogout())}
          >
            Confirm
          </Button>
          <Button size="small" onClick={() => setConfirm(false)}>
            Cancel
          </Button>
        </div>
      </DraggableDialogue>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>

            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" noWrap>
                Dashboard
              </Typography>
              <Tooltip title="Logout">
                <MeetingRoomIcon
                  onClick={() => {
                    setConfirm(true);
                  }}
                  style={{
                    fontSize: "25px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
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
          {/* <List></List> */}
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
                textDecoration: "none",
              }}
            >
              <Tooltip title="Categories" placement="right">
                <ListItem button>
                  <ListItemIcon>
                    <CategoryIcon
                      color={activeNav === "/" ? "secondary" : "primary"}
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Categories"} />
                </ListItem>
              </Tooltip>
            </NavLink>

            <NavLink
              to="/profile"
              onClick={() => {
                setActiveNav("/profile");
              }}
              exact
              activeStyle={{
                color: "red",
                textDecoration: "none",
              }}
            >
              <Tooltip title="Profile" placement="right">
                <ListItem button>
                  <ListItemIcon>
                    <PermContactCalendarIcon
                      color={activeNav === "/profile" ? "secondary" : "primary"}
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Profile"} />
                </ListItem>
              </Tooltip>
            </NavLink>

            <NavLink
              to="/traffic"
              onClick={() => {
                setActiveNav("/traffic");
              }}
              exact
              activeStyle={{
                color: "red",
                textDecoration: "none",
              }}
            >
              <Tooltip title="Traffic" placement="right">
                <ListItem button>
                  <ListItemIcon>
                    <TrafficIcon
                      color={activeNav === "/traffic" ? "secondary" : "primary"}
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Traffic"} />
                </ListItem>
              </Tooltip>
            </NavLink>
            <NavLink
              to="/stats"
              onClick={() => {
                setActiveNav("/stats");
              }}
              exact
              activeStyle={{
                color: "red",
                textDecoration: "none",
              }}
            >
              <Tooltip title="Statistics" placement="right">
                <ListItem button>
                  <ListItemIcon>
                    <EqualizerIcon
                      color={activeNav === "/stats" ? "secondary" : "primary"}
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Statistics"} />
                </ListItem>
              </Tooltip>
            </NavLink>
          </List>
          <Divider />

          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path="/" component={CategoryPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/traffic" component={TrafficPage} />
            <Route exact path="/stats" component={StatsPage} />
            <Route component={FourOFourPage} />
          </Switch>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
