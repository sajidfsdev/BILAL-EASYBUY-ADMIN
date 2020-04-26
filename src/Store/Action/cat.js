import React from "react";
import * as Types from "./../Constants/cat";
import appConsts from "./../../Constants/Strings";
import * as appTyes from "./../Constants/App";
import * as catTypes from "./../Constants/cat";
import axios from "axios";

export const handleLoadAllCats = (token) => {
  //config....
  const config = {
    headers: {
      "x-auth-eptoken": token,
    },
  };

  //return starts...
  return async (dispatch) => {
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
            subSubCat: [...res.data.subSubCat],
          },
        });
      }
    } catch (err) {
      dispatch({ type: appTyes.STOPCATBUFFERRING });
      if (err.response) {
        return dispatch({
          type: Types.LOADINGCATDATAFAIL,
          payload: {
            errorMessage: err.response.data.errorMessage,
          },
        });
      } else {
        return dispatch({
          type: Types.LOADINGCATDATAFAIL,
          payload: {
            errorMessage: err.message,
          },
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
      "x-auth-eptoken": token,
    },
  };

  //body setup....
  const body = JSON.stringify({
    cat: cat,
  });

  //return starts...
  return async (dispatch, getState) => {
    const currentCats = [...getState().cat.cat];
    const index = currentCats.findIndex(
      (elem) => elem.cat.toUpperCase() === cat.toUpperCase()
    );
    if (index >= 0) {
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING,
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
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        //window.alert(res.data);
        //window.alert(res.data.cat.toUpperCase());
        //console.log(res.data);

        currentCats.push(res.data);
        dispatch({
          type: catTypes.ADDCAT,
          payload: {
            cat: [...currentCats],
          },
        });

        return successCB("Category Added Successfully");
      } else {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        return failCB("Network Response Timed Out");
      }
    } catch (err) {
      //console.log(err);
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING,
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
      "x-auth-eptoken": token,
    },
  };

  //body setup....
  const body = JSON.stringify({
    cat: cat,
    subCat: subCat,
  });

  //return starts...
  return async (dispatch, getState) => {
    const currentSubCats = [...getState().cat.subCat];
    const index = currentSubCats.findIndex(
      (elem) =>
        elem.cat.toUpperCase() === cat.toUpperCase() &&
        elem.subCat.toUpperCase() === subCat.toUpperCase()
    );
    if (index >= 0) {
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING,
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
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        //window.alert(res.data);
        //window.alert(res.data.cat.toUpperCase());
        //console.log(res.data);

        currentSubCats.push(res.data);
        dispatch({
          type: catTypes.ADDSUBCAT,
          payload: {
            subCat: [...currentSubCats],
          },
        });

        return successCB("SubCategory Added Successfully");
      } else {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        return failCB("Network Response Timed Out");
      }
    } catch (err) {
      //console.log(err);
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING,
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
      "x-auth-eptoken": token,
    },
  };

  //body setup....
  const body = JSON.stringify({
    cat: cat,
    subCat: subCat,
    subSubCat: subSubCat,
  });

  //return starts...
  return async (dispatch, getState) => {
    const currentSubSubCats = [...getState().cat.subSubCat];
    const index = currentSubSubCats.findIndex(
      (elem) =>
        elem.cat.toUpperCase() === cat.toUpperCase() &&
        elem.subCat.toUpperCase() === subCat.toUpperCase() &&
        elem.subSubCat.toUpperCase() === subSubCat.toUpperCase()
    );
    if (index >= 0) {
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING,
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
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        //window.alert(res.data);
        //window.alert(res.data.cat.toUpperCase());
        //console.log(res.data);

        currentSubSubCats.push(res.data);
        dispatch({
          type: catTypes.ADDSUBSUBCAT,
          payload: {
            subSubCat: [...currentSubSubCats],
          },
        });

        return successCB("SubCategory Added Successfully");
      } else {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        return failCB("Network Response Timed Out");
      }
    } catch (err) {
      //console.log(err);
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING,
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

export const handleEditCat = (
  value,
  oldValue,
  id,
  token,
  successCB,
  failureCB
) => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token,
      },
    };

    const body = JSON.stringify({
      cat: value.toUpperCase(),
      id: id,
      oldValue: oldValue.toUpperCase(),
    });

    //try catch starts.....
    try {
      const res = await axios.post(
        appConsts.server + "/admin/cat/edit/cat",
        body,
        config
      );

      if (res) {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });

        //editting locally....
        const allCats = [...getState().cat.cat];
        const index = allCats.findIndex((elem) => elem._id == id);
        if (index < 0) {
          return failureCB("Could Not Find Index Locally");
        } else {
          allCats[index].cat = value.toUpperCase();
          const allSubCats = [];
          getState().cat.subCat.forEach((element, ind) => {
            allSubCats[ind] = element;
            if (allSubCats[ind].cat.toUpperCase() == oldValue.toUpperCase()) {
              allSubCats[ind].cat = value.toUpperCase();
            }
          });
          const allSubSubCats = [];
          getState().cat.subSubCat.forEach((element, ind) => {
            allSubSubCats[ind] = element;
            if (
              allSubSubCats[ind].cat.toUpperCase() == oldValue.toUpperCase()
            ) {
              allSubSubCats[ind].cat = value.toUpperCase();
            }
          });

          dispatch({
            type: catTypes.ADDCAT,
            payload: {
              cat: [...allCats],
            },
          });
          dispatch({
            type: catTypes.ADDSUBCAT,
            payload: {
              subCat: [...allSubCats],
            },
          });
          dispatch({
            type: catTypes.ADDSUBSUBCAT,
            payload: {
              subSubCat: [...allSubSubCats],
            },
          });
        }
        //....................
        return successCB("Category Has Been Modified Succesfully");
      } else {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        return failureCB("Could Not Update Due To Network Error");
      }
    } catch (err) {
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING,
      });
      if (err.response) {
        return failureCB(err.response.data.errorMessage);
      } else {
        return failureCB(err.message);
      }
    }
    //try catch ends.......
  }; //................return ends
}; //............................Handle Edit Cat

export const handleEditSubcat = (
  value,
  oldValue,
  id,
  token,
  successCB,
  failureCB
) => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token,
      },
    };

    const body = JSON.stringify({
      subCat: value.toUpperCase(),
      id: id,
      oldValue: oldValue.toUpperCase(),
    });

    //try catch starts.....
    try {
      const res = await axios.post(
        appConsts.server + "/admin/cat/edit/subCat",
        body,
        config
      );

      if (res) {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });

        //editting locally....
        const allSubcats = [...getState().cat.subCat];
        const index = allSubcats.findIndex((elem) => elem._id == id);
        if (index < 0) {
          return failureCB("Could Not Find Index Locally");
        } else {
          allSubcats[index].subCat = value.toUpperCase();
          //editting sub sub cat subCat ref starts
          const allSubSubCats = [];
          getState().cat.subSubCat.forEach((element, ind) => {
            allSubSubCats[ind] = element;
            if (
              allSubSubCats[ind].subCat.toUpperCase() == oldValue.toUpperCase()
            ) {
              allSubSubCats[ind].subCat = value.toUpperCase();
            }
          });
          //......................................
          dispatch({
            type: catTypes.ADDSUBSUBCAT,
            payload: {
              subSubCat: [...allSubSubCats],
            },
          });
          dispatch({
            type: catTypes.ADDSUBCAT,
            payload: {
              subCat: [...allSubcats],
            },
          });
        }
        //....................
        return successCB("Sub Category Has Been Modified Succesfully");
      } else {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        return failureCB("Could Not Update Due To Network Error");
      }
    } catch (err) {
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING,
      });
      if (err.response) {
        return failureCB(err.response.data.errorMessage);
      } else {
        return failureCB(err.message);
      }
    }
    //try catch ends.......
  }; //................return ends
}; //............................Handle Edit Cat

export const handleEditSubSubcat = (
  value,
  oldValue,
  id,
  token,
  successCB,
  failureCB
) => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token,
      },
    };

    const body = JSON.stringify({
      subSubCat: value.toUpperCase(),
      id: id,
      oldValue: oldValue.toUpperCase(),
    });

    //try catch starts.....
    try {
      const res = await axios.post(
        appConsts.server + "/admin/cat/edit/subSubCat",
        body,
        config
      );

      if (res) {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });

        //editting locally....
        const allSubSubcats = [...getState().cat.subSubCat];
        const index = allSubSubcats.findIndex((elem) => elem._id == id);
        if (index < 0) {
          return failureCB("Could Not Find Index Locally");
        } else {
          allSubSubcats[index].subSubCat = value.toUpperCase();
          dispatch({
            type: catTypes.ADDSUBSUBCAT,
            payload: {
              subSubCat: [...allSubSubcats],
            },
          });
        }
        //....................
        return successCB("Sub Category Has Been Modified Succesfully");
      } else {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        return failureCB("Could Not Update Due To Network Error");
      }
    } catch (err) {
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING,
      });
      if (err.response) {
        return failureCB(err.response.data.errorMessage);
      } else {
        return failureCB(err.message);
      }
    }
    //try catch ends.......
  }; //................return ends
}; //............................Handle Edit Cat

export const handleDeleteCat = (cat, id, token, successCB, failureCB) => {
  //return starts...
  return async (dispatch, getState) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token,
      },
    };

    const body = JSON.stringify({
      cat: cat.toUpperCase(),
      id: id,
    });

    //try catch starts...
    try {
      const res = await axios.post(
        appConsts.server + "/admin/cat/delete/cat",
        body,
        config
      );

      if (res) {
        //delete cat...subCat subsubcat...
        dispatch({
          type: catTypes.ADDCAT,
          payload: {
            cat: [...getState().cat.cat.filter((elem) => elem._id != id)],
          },
        });
        dispatch({
          type: catTypes.ADDSUBCAT,
          payload: {
            subCat: [
              ...getState().cat.subCat.filter(
                (elem) => elem.cat.toUpperCase() != cat.toUpperCase()
              ),
            ],
          },
        });
        dispatch({
          type: catTypes.ADDSUBSUBCAT,
          payload: {
            subSubCat: [
              ...getState().cat.subSubCat.filter(
                (elem) => elem.cat.toUpperCase() != cat.toUpperCase()
              ),
            ],
          },
        });

        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        return successCB("Category Removed Successfully");
        //delete cat sub cat sub sub cat locally remainug
      } else {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        return failureCB("Failed To Delete Cat Due To Network Error");
      }
    } catch (err) {
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING,
      });
      if (err.response) {
        return failureCB(err.response.data.errorMessage);
      } else {
        return failureCB(err.message);
      }
    }
    //try catch ends.....
  };
  //return ends.....
}; //............handle delete cat

export const handleDeleteSubCat = (
  cat,
  subCat,
  id,
  token,
  successCB,
  failureCB
) => {
  //return starts...
  return async (dispatch, getState) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token,
      },
    };

    const body = JSON.stringify({
      cat: cat.toUpperCase(),
      subCat: subCat.toUpperCase(),
      id: id,
    });

    //try catch starts...
    try {
      const res = await axios.post(
        appConsts.server + "/admin/cat/delete/subCat",
        body,
        config
      );

      if (res) {
        //filtering out subCategroies....
        const allSubCat = [];
        getState().cat.subCat.forEach((elem) => {
          if (
            elem.cat.toUpperCase() == cat.toUpperCase() &&
            elem.subCat.toUpperCase() == subCat.toUpperCase()
          ) {
          } else {
            allSubCat.push(elem);
          }
        });
        //...............................
        dispatch({
          type: catTypes.ADDSUBCAT,
          payload: {
            subCat: [...allSubCat],
          },
        });
        const allSubSubCat = [];
        getState().cat.subSubCat.forEach((elem) => {
          if (
            elem.cat.toUpperCase() == cat.toUpperCase() &&
            elem.subCat.toUpperCase() == subCat.toUpperCase()
          ) {
          } else {
            allSubSubCat.push(elem);
          }
        });
        dispatch({
          type: catTypes.ADDSUBSUBCAT,
          payload: {
            subSubCat: [...allSubSubCat],
          },
        });

        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        return successCB("Sub Category Removed Successfully");
        //delete cat sub cat sub sub cat locally remainug
      } else {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        return failureCB("Failed To Delete Sub Cat Due To Network Error");
      }
    } catch (err) {
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING,
      });
      if (err.response) {
        return failureCB(err.response.data.errorMessage);
      } else {
        return failureCB(err.message);
      }
    }
    //try catch ends.....
  };
  //return ends.....
}; //............handle delete subCat

export const handleDeleteSubSubCat = (
  cat,
  subCat,
  subSubCat,
  id,
  token,
  successCB,
  failureCB
) => {
  //return starts...
  return async (dispatch, getState) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token,
      },
    };

    const body = JSON.stringify({
      cat: cat.toUpperCase(),
      subCat: subCat.toUpperCase(),
      subSubCat: subSubCat.toUpperCase(),
      id: id,
    });

    //try catch starts...
    try {
      const res = await axios.post(
        appConsts.server + "/admin/cat/delete/subSubCat",
        body,
        config
      );

      if (res) {
        //filtering out subCategroies....

        const allSubSubCat = [];
        getState().cat.subSubCat.forEach((elem) => {
          if (
            elem.cat.toUpperCase() == cat.toUpperCase() &&
            elem.subCat.toUpperCase() == subCat.toUpperCase() &&
            elem.subSubCat.toUpperCase() == subSubCat.toUpperCase()
          ) {
          } else {
            allSubSubCat.push(elem);
          }
        });
        dispatch({
          type: catTypes.ADDSUBSUBCAT,
          payload: {
            subSubCat: [...allSubSubCat],
          },
        });

        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        return successCB("Sub sub Category Removed Successfully");
        //delete cat sub cat sub sub cat locally remainug
      } else {
        dispatch({
          type: appTyes.STOPCATBTNBUFFERRING,
        });
        return failureCB("Failed To Delete Sub sub Cat Due To Network Error");
      }
    } catch (err) {
      dispatch({
        type: appTyes.STOPCATBTNBUFFERRING,
      });
      if (err.response) {
        return failureCB(err.response.data.errorMessage);
      } else {
        return failureCB(err.message);
      }
    }
    //try catch ends.....
  };
  //return ends.....
}; //............handle delete subsubCat
