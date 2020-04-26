import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumbs from "./../../Components/Categories/BreadCrumb/BreadCrumb";
import Input from "./../../UI/Input/Input";
import Row from "./../../UI/Row/ELXRow";
import Button from "./../../UI/Button/ELXButton";
import Card from "./../../Components/Categories/cards/cards";
import useStyles from "./Categories.styles";
import LinearProgress from "./../../UI/LinearProgress/LinearProgress";
import CircularProgressBar from "./../../UI/CircularProgressBar/CircularProgressBar";
import { useSnackbar } from "notistack";
import * as AppTypes from "./../../Store/Constants/App";
import * as CatActions from "./../../Store/Action/cat";
import BreadCrumb from "./../../Components/Categories/BreadCrumb/BreadCrumb";

const Categories = (props) => {
  //styles init...
  const classes = useStyles();
  //..............

  //..............
  const { enqueueSnackbar } = useSnackbar();

  //state management starts......
  const [breadCrumb, setBreadCrumb] = useState([
    { showData: "cat", title: "Categories" }, //type means the active data to show
  ]);

  //state management...
  const catBufferring_RP = useSelector((state) => state.app.catBufferring);
  const catBtnBufferring_RP = useSelector(
    (state) => state.app.catBtnBufferring
  );
  const cat_RP = useSelector((state) => state.cat.cat);
  const subCat_RP = useSelector((state) => state.cat.subCat);
  const subSubCat_RP = useSelector((state) => state.cat.subSubCat);
  const cat_isError_RP = useSelector((state) => state.cat.isError);
  const cat_errorMessage_RP = useSelector((state) => state.cat.errorMessage);
  const token_RP = useSelector((state) => state.auth.token);
  const dispatch_RP = useDispatch();
  const [currentData, setCurrentData] = useState("cat"); //which thing to show....
  const [inputState, setInputState] = useState("");
  const [activeCat, setActiveCat] = useState("");
  const [activeSubCat, setActiveSubCat] = useState("");
  const [activeSubSubCat, setActiveSubSubCat] = useState("");

  //Delete operations...
  const handleDeleteCategories = (elem) => {
    if (currentData == "cat") {
      dispatch_RP({
        type: AppTypes.STARTCATBTNBUFFERRING,
      });
      dispatch_RP(
        CatActions.handleDeleteCat(
          elem.cat,
          elem._id,
          token_RP,
          successCB,
          failCB
        )
      );
    } else if (currentData == "subCat") {
      dispatch_RP({
        type: AppTypes.STARTCATBTNBUFFERRING,
      });
      dispatch_RP(
        CatActions.handleDeleteSubCat(
          elem.cat,
          elem.subCat,
          elem._id,
          token_RP,
          successCB,
          failCB
        )
      );
    } else if (currentData == "subSubCat") {
      dispatch_RP({
        type: AppTypes.STARTCATBTNBUFFERRING,
      });
      dispatch_RP(
        CatActions.handleDeleteSubSubCat(
          elem.cat,
          elem.subCat,
          elem.subSubCat,
          elem._id,
          token_RP,
          successCB,
          failCB
        )
      );
    }
  };
  //....................Delete Categories ends;

  //Edit Operations starts....
  const handleEditCategories = (value, oldValue, id) => {
    dispatch_RP({
      type: AppTypes.STARTCATBTNBUFFERRING,
    });
    if (currentData === "cat") {
      dispatch_RP(
        CatActions.handleEditCat(
          value,
          oldValue,
          id,
          token_RP,
          successCB,
          failCB
        )
      );
    } else if (currentData === "subCat") {
      dispatch_RP(
        CatActions.handleEditSubcat(
          value,
          oldValue,
          id,
          token_RP,
          successCB,
          failCB
        )
      );
    } else if (currentData === "subSubCat") {
      dispatch_RP(
        CatActions.handleEditSubSubcat(
          value,
          oldValue,
          id,
          token_RP,
          successCB,
          failCB
        )
      );
    }
  };
  //Edit operations ends......

  //Methods starts...
  const handleFormSubmission = (event) => {
    event.preventDefault();
    dispatch_RP({
      type: AppTypes.STARTCATBTNBUFFERRING,
    });
    if (currentData === "cat") {
      dispatch_RP(
        CatActions.handleAddCat(token_RP, inputState, successCB, failCB)
      );
    } else if (currentData === "subCat") {
      dispatch_RP(
        CatActions.handleAddSubCat(
          token_RP,
          activeCat,
          inputState,
          successCB,
          failCB
        )
      );
    } else {
      dispatch_RP(
        CatActions.handleAddSubSubCat(
          token_RP,
          activeCat,
          activeSubCat,
          inputState,
          successCB,
          failCB
        )
      );
    }
  };

  const handleInputChange = (event) => {
    setInputState(event.target.value);
  };

  const handleShowSnackBar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  const successCB = (message) => {
    enqueueSnackbar(message, { variant: "success" });
    setInputState("");
  };

  const failCB = (message) => {
    enqueueSnackbar(message, { variant: "error" });
    setInputState("");
  };

  const handleBreadCrumbClick = (elem, index) => {
    if (elem.showData === "cat") {
      setCurrentData("cat");
      let oldBreadCrumbs = [...breadCrumb];
      let newBreadCrumb = [];
      for (let i = 0; i <= index; i++) {
        newBreadCrumb.push(oldBreadCrumbs[i]);
      }

      setBreadCrumb([...newBreadCrumb]);
    } else if (elem.showData === "subCat") {
      setCurrentData("subCat");
      setActiveCat(elem.cat);
      let oldBreadCrumbs = [...breadCrumb];
      let newBreadCrumb = [];
      for (let i = 0; i <= index; i++) {
        newBreadCrumb.push(oldBreadCrumbs[i]);
      }

      setBreadCrumb([...newBreadCrumb]);
    } else if (elem.showData === "subSubCat") {
    }
  };

  const handleCardClick = (elem) => {
    if (elem.type === "cat") {
      setCurrentData("subCat");
      setActiveCat(elem.cat);
      let oldBreadCrumbs = [...breadCrumb];
      let newBreadCrumb = oldBreadCrumbs.filter(
        (elem) => elem.showData !== "subCat"
      );
      newBreadCrumb.push({
        showData: "subCat",
        title: elem.cat,
        cat: elem.cat,
      });
      setBreadCrumb([...newBreadCrumb]);
    } else if (elem.type === "subCat") {
      setCurrentData("subSubCat");
      setActiveCat(elem.cat);
      setActiveSubCat(elem.subCat);
      let oldBreadCrumbs = [...breadCrumb];
      let newBreadCrumb = oldBreadCrumbs.filter(
        (elem) => elem.showData !== "subSubCat"
      );
      newBreadCrumb.push({
        showData: "subSubCat",
        title: elem.subCat,
        cat: elem.cat,
        subCat: elem.subCat,
      });
      setBreadCrumb([...newBreadCrumb]);
    } else {
      handleShowSnackBar("You Cannot add further sub-categories", "error");
    }
  };

  //...................................

  //Mappers.......
  let Mapper = null;

  if (currentData === "cat") {
    Mapper = cat_RP.map((elem, index) => {
      return (
        <Card
          edit={handleEditCategories}
          delete={handleDeleteCategories}
          handleCardClick={handleCardClick}
          elem={elem}
          key={index}
        >
          {elem.cat}
        </Card>
      );
    });
  } else if (currentData === "subCat") {
    Mapper = subCat_RP
      .filter((elem) => elem.cat === activeCat)
      .map((elem, index) => {
        return (
          <Card
            edit={handleEditCategories}
            delete={handleDeleteCategories}
            handleCardClick={handleCardClick}
            elem={elem}
            key={index}
          >
            {elem.subCat}
          </Card>
        );
      });
  } else if (currentData === "subSubCat") {
    Mapper = subSubCat_RP
      .filter((elem) => elem.cat === activeCat && elem.subCat === activeSubCat)
      .map((elem, index) => {
        return (
          <Card
            edit={handleEditCategories}
            delete={handleDeleteCategories}
            handleCardClick={handleCardClick}
            elem={elem}
            key={index}
          >
            {elem.subSubCat}
          </Card>
        );
      });
  }
  //..............

  //return statement starts here...
  return (
    <React.Fragment>
      {catBufferring_RP ? (
        <Row className={classes.buffContainer}>
          <LinearProgress color="secondary" />
          <LinearProgress color="secondary" />

          <Row className={classes.buffText}>Loading Categories...</Row>
        </Row>
      ) : (
        <React.Fragment>
          <BreadCrumbs data={breadCrumb} onClick={handleBreadCrumbClick} />

          <Row>
            <form onSubmit={handleFormSubmission}>
              <Input
                label="Add Category"
                value={inputState}
                onChange={handleInputChange}
                required
                className={classes.input}
              />
              <Button
                type="submit"
                disabled={catBtnBufferring_RP ? true : false}
              >
                {catBtnBufferring_RP ? <CircularProgressBar /> : <Row>+</Row>}
              </Button>
            </form>
          </Row>

          <Row className={classes.screen}>
            {cat_isError_RP ? (
              <Row className={classes.emptyContainer}>
                <Row className={classes.error}>{cat_errorMessage_RP}</Row>
              </Row>
            ) : cat_RP.length === 0 ? (
              <Row className={classes.emptyContainer}>
                <Row className={classes.empty}>No Category Added Yet!</Row>
              </Row>
            ) : (
              Mapper
            )}
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );
  //return statement ends here.....
}; //........................

export default Categories;
