import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import * as AuthActions from "./Store/Action/Auth";

//components starts....
// import Spinner from "./Reusable/Bufferring/Bufferring";

//pages imports......
import LoginPage from "./pages/Signin/signin";
import Dashboard from "./Dashboard/Dashboard";
import Bufferring from "./pages/LoadingScreen/LoadingScreen";

const App = props => {
  //redux state starts here......
  const auth_RP = useSelector(state => state.auth.isAuth);
  const app_buff_RP = useSelector(state => state.app.bufferring);
  const resolved_RP = useSelector(state => state.auth.resolved);
  const dispatch = useDispatch();
  //redux state ends here........

  //use effect starts here......
  useEffect(() => {
    dispatch(AuthActions.handleAuthChecking());
  }, []);
  //use effect ends here........

  //GUI man starts here............
  let mainGUI = null;

  if (resolved_RP) {
    if (auth_RP) {
      mainGUI = <Dashboard />;
    } else {
      mainGUI = <LoginPage />;
    }
  } else {
    mainGUI = <Bufferring />;
  }
  //GUI man ends here..............

  //Gen Bufferring starts here.....
  let buff = null;
  // if (app_buff_RP) {
  //   buff = <Spinner />;
  // }
  //Gen bufferring ends............

  //return statement starts here......
  return (
    <React.Fragment>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>{mainGUI}</BrowserRouter>
      </SnackbarProvider>
    </React.Fragment>
  );
  //return statement ends here........
}; //.....................

export default App;
