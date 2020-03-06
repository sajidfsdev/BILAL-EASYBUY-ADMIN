import React from "react";
import * as Types from "./../Constants/cat";
import appConsts from "./../../Constants/Strings";
import * as appTyes from "./../Constants/App";
import * as catTypes from "./../Constants/cat";
import axios from "axios";

export const handleLoadAllCats = token => {
  //config....
  const config = {
    headers: {
      "x-auth-eptoken": token
    }
  };

  //return starts...
  return async dispatch => {
    try {
      const res = await axios.get(
        appConsts.server + "/admin/cat/getAllCats",
        config
      );
      if (res) {
        dispatch({ type: appTyes.STOPCATBUFFERRING });
        //console.log("LOADED CAT VIEW");
        //console.log(res.data.cat);
        return dispatch({
          type: catTypes.LOADINGCATDATAPASS,
          payload: {
            cat: [...res.data.cat],
            subCat: [...res.data.subCat],
            subSubCat: [...res.data.subSubCat]
          }
        });
      }
    } catch (err) {
      dispatch({ type: appTyes.STOPCATBUFFERRING });
      if (err.response) {
        return dispatch({
          type: Types.LOADINGCATDATAFAIL,
          payload: {
            errorMessage: err.response.data.errorMessage
          }
        });
      } else {
        return dispatch({
          type: Types.LOADINGCATDATAFAIL,
          payload: {
            errorMessage: err.message
          }
        });
      }
    }
  };
  //return ends.....
}; //......................................Handle Load All Cats

export const handleAddCat = (token, cat, successCB, failCB) => {
  //config setup...
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-eptoken": token
    }
  };

  //body setup....
  const body = JSON.stringify({
    cat: cat
  });

  //return starts...
  return async (dispatch, getState) => {
    const currentCats = [...getState().cat.cat];
    const index = currentCats.findIndex(
      elem => elem.cat.toUpperCase() === cat.toUpperCase()
    );
    if (index >= 0) {
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING
      });
      return failCB("Seems you have already added this category");
    }
    try {
      const res = await axios.post(
        appConsts.server + "/admin/cat/addCat",
        body,
        config
      );
      if (res) {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING
        });
        //window.alert(res.data);
        //window.alert(res.data.cat.toUpperCase());
        //console.log(res.data);

        currentCats.push(res.data);
        dispatch({
          type: catTypes.ADDCAT,
          payload: {
            cat: [...currentCats]
          }
        });

        return successCB("Category Added Successfully");
      } else {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING
        });
        return failCB("Network Response Timed Out");
      }
    } catch (err) {
      //console.log(err);
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING
      });
      //window.alert("ERROR");
      if (err.response) {
        //window.alert("err.response");
        //window.alert(err.response.data.errorMessage);
        return failCB(err.response.data.errorMessage);
      } else {
        //window.alert("err.message");
        //window.alert(err.message);
        return failCB(err.message);
      }
    }
  };
  //return ends....
}; //........................................Handle Add Cat

export const handleAddSubCat = (token, cat, subCat, successCB, failCB) => {
  //config setup...
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-eptoken": token
    }
  };

  //body setup....
  const body = JSON.stringify({
    cat: cat,
    subCat: subCat
  });

  //return starts...
  return async (dispatch, getState) => {
    const currentSubCats = [...getState().cat.subCat];
    const index = currentSubCats.findIndex(
      elem =>
        elem.cat.toUpperCase() === cat.toUpperCase() &&
        elem.subCat.toUpperCase() === subCat.toUpperCase()
    );
    if (index >= 0) {
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING
      });
      return failCB(
        subCat.toUpperCase() + " is already subCategory of " + cat.toUpperCase()
      );
    }
    try {
      const res = await axios.post(
        appConsts.server + "/admin/cat/addSubCat",
        body,
        config
      );
      if (res) {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING
        });
        //window.alert(res.data);
        //window.alert(res.data.cat.toUpperCase());
        //console.log(res.data);

        currentSubCats.push(res.data);
        dispatch({
          type: catTypes.ADDSUBCAT,
          payload: {
            subCat: [...currentSubCats]
          }
        });

        return successCB("SubCategory Added Successfully");
      } else {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING
        });
        return failCB("Network Response Timed Out");
      }
    } catch (err) {
      //console.log(err);
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING
      });
      //window.alert("ERROR");
      if (err.response) {
        //window.alert("err.response");
        //window.alert(err.response.data.errorMessage);
        return failCB(err.response.data.errorMessage);
      } else {
        //window.alert("err.message");
        //window.alert(err.message);
        return failCB(err.message);
      }
    }
  };
  //return ends....
}; //........................................Handle Add SUB Cat

export const handleAddSubSubCat = (
  token,
  cat,
  subCat,
  subSubCat,
  successCB,
  failCB
) => {
  //config setup...
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-eptoken": token
    }
  };

  //body setup....
  const body = JSON.stringify({
    cat: cat,
    subCat: subCat,
    subSubCat: subSubCat
  });

  //return starts...
  return async (dispatch, getState) => {
    const currentSubSubCats = [...getState().cat.subSubCat];
    const index = currentSubSubCats.findIndex(
      elem =>
        elem.cat.toUpperCase() === cat.toUpperCase() &&
        elem.subCat.toUpperCase() === subCat.toUpperCase() &&
        elem.subSubCat.toUpperCase() === subSubCat.toUpperCase()
    );
    if (index >= 0) {
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING
      });
      return failCB(
        subSubCat.toUpperCase() +
          " is already subCategory of " +
          subCat.toUpperCase()
      );
    }
    try {
      const res = await axios.post(
        appConsts.server + "/admin/cat/addSubSubCat",
        body,
        config
      );
      if (res) {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING
        });
        //window.alert(res.data);
        //window.alert(res.data.cat.toUpperCase());
        //console.log(res.data);

        currentSubSubCats.push(res.data);
        dispatch({
          type: catTypes.ADDSUBSUBCAT,
          payload: {
            subSubCat: [...currentSubSubCats]
          }
        });

        return successCB("SubCategory Added Successfully");
      } else {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING
        });
        return failCB("Network Response Timed Out");
      }
    } catch (err) {
      //console.log(err);
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING
      });
      //window.alert("ERROR");
      if (err.response) {
        //window.alert("err.response");
        //window.alert(err.response.data.errorMessage);
        return failCB(err.response.data.errorMessage);
      } else {
        //window.alert("err.message");
        //window.alert(err.message);
        return failCB(err.message);
      }
    }
  };
  //return ends....
}; //........................................Handle Add SUB SUB Cat
