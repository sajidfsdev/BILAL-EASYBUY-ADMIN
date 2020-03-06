import * as Types from "../Constants/Auth";
import AppConst from "../../Constants/Strings";
import * as AppTypes from "../../Store/Constants/App";
import axios from "axios";

//Handling Auth Checking starts.........
export const handleAuthChecking = () => {
  //It will search session storage.......
  //1 if present then set values.........
  //else set Un Auth and direct to login...

  const sessionPaylod = sessionStorage.getItem(AppConst.sessionStorage);

  //Must submit to Auth Validator On Server Later.....
  if (sessionPaylod) {
    const payload = {
      token: sessionStorage.getItem(AppConst.sessionStorage + "/token"),
      fname: sessionStorage.getItem(AppConst.sessionStorage + "/fname"),
      lname: sessionStorage.getItem(AppConst.sessionStorage + "/lname"),
      email: sessionStorage.getItem(AppConst.sessionStorage + "/email")
    };

    return {
      type: Types.PERSON_AUTH_TRUE,
      payload: JSON.parse(JSON.stringify(payload))
    };
  } else {
    return {
      type: Types.PERSON_AUTH_FALSE,
      payload: {
        errorMessage: ""
      }
    };
  }
};
//Handling Auth Checking Ends Here......

//Handle Login Starts Here.........................
export const handleLogin = (email, password) => {
  //Sudo code.....
  //first email and password to API
  //get response...................
  //if yes --> set session storage
  //                              set reddux isAuth
  //else
  //    set Redux isAuth False
  //    delete session storage

  //alert(email);
  //alert(password);

  return async dispatch => {
    const body = JSON.stringify({
      email: email,
      password: password
    });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    //try catc starts here......
    try {
      const res = await axios.post(
        AppConst.server + "/admin/auth/login",
        body,
        config
      );

      if (res) {
        //Setting Session Storage Starts Here.....
        const payload = {
          token: res.data.token,
          fname: res.data.fname,
          lname: res.data.lname,
          email: res.data.email
        };

        sessionStorage.setItem(AppConst.sessionStorage, "2WDR45RTGFHGTHJ");
        sessionStorage.setItem(
          AppConst.sessionStorage + "/token",
          payload.token
        );
        sessionStorage.setItem(
          AppConst.sessionStorage + "/fname",
          payload.fname
        );
        sessionStorage.setItem(
          AppConst.sessionStorage + "/lname",
          payload.lname
        );
        sessionStorage.setItem(
          AppConst.sessionStorage + "/email",
          payload.email
        );

        //Setting Session Storage Ends Here.......
        //console.log(res.data);
        dispatch({ type: AppTypes.STOPAPPBUFFERRING });
        return dispatch({
          type: Types.PERSON_AUTH_TRUE,
          payload: JSON.parse(JSON.stringify(payload))
        });
      } else {
        //Clearing Session Storage.....
        sessionStorage.removeItem(AppConst.sessionStorage);
        dispatch({ type: AppTypes.STOPAPPBUFFERRING });
        return dispatch({
          type: Types.PERSON_AUTH_FALSE,
          payload: {
            errorMessage: "Network Error"
          }
        });
      }
    } catch (err) {
      if (err.response) {
        //alert("error with resp "+err.response.data.errorMessage);
        //Clearing Session Storage.....
        sessionStorage.removeItem(AppConst.sessionStorage);
        sessionStorage.removeItem(AppConst.sessionStorage + "/token");
        sessionStorage.removeItem(AppConst.sessionStorage + "/fname");
        sessionStorage.removeItem(AppConst.sessionStorage + "/lname");
        sessionStorage.removeItem(AppConst.sessionStorage + "/email");
        dispatch({ type: AppTypes.STOPAPPBUFFERRING });
        return dispatch({
          type: Types.PERSON_AUTH_FALSE,
          payload: {
            errorMessage: err.response.data.errorMessage
          }
        });
      } else {
        //alert("error: "+err.message);
        //Clearing Session Storage.....
        sessionStorage.removeItem(AppConst.sessionStorage);
        sessionStorage.removeItem(AppConst.sessionStorage + "/token");
        sessionStorage.removeItem(AppConst.sessionStorage + "/fname");
        sessionStorage.removeItem(AppConst.sessionStorage + "/lname");
        sessionStorage.removeItem(AppConst.sessionStorage + "/email");
        dispatch({ type: AppTypes.STOPAPPBUFFERRING });
        return dispatch({
          type: Types.PERSON_AUTH_FALSE,
          payload: {
            errorMessage: err.message
          }
        });
      }
    }
    //try catch ends here.......
  }; //return method ends here.....................
};
//Handle Login Ends Here...........................

//Handle Logout Starts Here.............
export const handleLogout = () => {
  sessionStorage.removeItem(AppConst.sessionStorage);

  return {
    type: Types.PERSON_AUTH_FALSE,
    payload: {
      errorMessage: ""
    }
  };
};
//Handle Logout Ends Here...............
