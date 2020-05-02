import * as Types from "./../Constants/Traffic";
import AppConsts from "./../../Constants/Strings";
import axios from "axios";

export const handleLoadAllTraffic = (token) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token,
      },
    };

    const body = JSON.stringify({ action: "Load" });

    //try catch starts...
    try {
      const res = await axios.post(
        AppConsts.server + "/admin/traffic/get",
        body,
        config
      );
      if (res) {
        return dispatch({
          type: Types.TRAFFIC_LOADED_SUCCESS,
          payload: {
            buyerTraffic: [...res.data.buyerTraffic],
            vendorTraffic: [...res.data.vendorTraffic],
          },
        });
      } else {
        return dispatch({
          type: Types.TRAFFIC_LOADED_FAILED,
          payload: {
            errorMessage: "Failed To Load Traffic Due To Network Error",
          },
        });
      }
    } catch (err) {
      if (err.response) {
        return dispatch({
          type: Types.TRAFFIC_LOADED_FAILED,
          payload: { errorMessage: err.response.data.errorMessage },
        });
      } else {
        return dispatch({
          type: Types.TRAFFIC_LOADED_FAILED,
          payload: { errorMessage: err.message },
        });
      }
    }
    //try catch ends.....
  }; //...........return method
}; //.....................Handle Load All Traffic
