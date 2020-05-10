import React, { useState, useEffect } from "react";
import Row from "./../../UI/Row/ELXRow";
import useStyles from "./Report.styles";
import { useSelector } from "react-redux";
import axios from "axios";
import AppConsts from "./../../Constants/Strings";
import LoadingScreen from "./../../Components/Reusable/LoadingScreen/LoadingScreen";
import ErrorScreen from "./../../Components/Reusable/ErrorScreen/ErrorScreen";
import { useSnackbar } from "notistack";
import Table from "./../../UI/Table/Table";
import TableRow from "./../../UI/Table/TableRow";
import TableCell from "./../../UI/Table/TableCell";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Button from "@material-ui/core/Button";
import Gallery from "./../../Components/Reusable/Gallery";
import InstallmentPlan from "./../../Components/Reusable/InstallmentPlan";
import DownPayment from "./../../Components/Reusable/DownPayment";
import CircularProgress from "./../../UI/CircularProgressBar/CircularProgressBar";

//constants...
const LOADING_SCREEN = "LOADINGSCREEN";
const ERROR_SCREEN = "ERRORSCREEN";
const EMPTY_SCREEN = "EMPTYSCREEN";
const DEFAULT_SCREEN = "DEFAULTSCREEN";
const DETAILS_SCREEN = "DETAILS_SCREEN";

const Report = (props) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const token_RP = useSelector((state) => state.auth.token);
  const [screen, setScreen] = useState(LOADING_SCREEN);
  const [errorMessage, setErrorMessage] = useState("");
  const [reportedAds, setReportedAds] = useState([]);
  const [currentData, setCurrentData] = useState();
  const [deActivateBufferring, setDeactivateBufferring] = useState(false);

  useEffect(() => {
    handleLoadAllReportedAds();
  }, []);

  //Methods starts...

  //Handle change status starts...
  const handleBlockVendor = async () => {
    //window.alert(currentData.product.vendorId._id);
    setDeactivateBufferring(true);
    const active = false;
    const type = "VENDOR";

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token_RP,
      },
    };
    // const body = JSON.stringify({ active: active, _id: _id, type: type });
    const body = JSON.stringify({
      active: false,
      _id: currentData.product.vendorId._id,
      type: "VENDOR",
    });

    try {
      const res = await axios.post(
        AppConsts.server + "/admin/traffic/setstatus",
        body,
        config
      );

      if (res) {
        setDeactivateBufferring(false);

        handleShowSnackBar("Vendor account has been blocked", "success");
        handleDeleteAd(currentData._id);
      } else {
        setDeactivateBufferring(false);

        handleShowSnackBar("Network Error", "error");
      }
    } catch (err) {
      setDeactivateBufferring(false);

      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
      } else {
        handleShowSnackBar(err.message, "error");
      }
    }
  }; //............................Handle change status
  //Handle change status ends.....

  const handleDeleteAd = async (_id) => {
    setScreen(LOADING_SCREEN);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token_RP,
      },
    };

    const body = JSON.stringify({ _id });

    try {
      const res = await axios.post(
        AppConsts.server + "/admin/report/delete",
        body,
        config
      );

      if (res) {
        setScreen(DEFAULT_SCREEN);
        handleShowSnackBar("Deleted Successfully", "success");
        handleLoadAllReportedAds();
      } else {
        setScreen(DEFAULT_SCREEN);
        handleShowSnackBar("Network error", "error");
      }
    } catch (err) {
      setScreen(DEFAULT_SCREEN);

      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
      } else {
        handleShowSnackBar(err.message, "error");
      }
    }
  }; //.................handle delete ad

  const handleLoadAllReportedAds = async () => {
    setScreen(LOADING_SCREEN);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token_RP,
      },
    };

    try {
      const res = await axios.get(
        AppConsts.server + "/admin/report/get",
        config
      );
      if (res) {
        setScreen(DEFAULT_SCREEN);
        setReportedAds([...res.data.data]);
        handleShowSnackBar("Data Loaded successfully", "success");
        console.log("Please check reported ads");
        console.log(res.data.data);
      } else {
        setScreen(DEFAULT_SCREEN);
        setErrorMessage("Failed to load data due to network error");
        handleShowSnackBar("Failed to load data", "error");
      }
    } catch (err) {
      setScreen(DEFAULT_SCREEN);
      if (err.response) {
        setErrorMessage(err.response.data.errorMessage);
        handleShowSnackBar(err.response.data.errorMessage, "error");
      } else {
        setErrorMessage(err.message);
        handleShowSnackBar(err.message, "error");
      }
    }
  }; //........................Handle Load Reported Ads

  //let mainGUI=null;

  const handleShowSnackBar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };
  let mainGUI = null;

  if (screen === LOADING_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <LoadingScreen title="Please wait while loading reported Ads" />
      </React.Fragment>
    );
  } else if (screen === ERROR_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen
          errorMessage={errorMessage}
          handleReload={handleLoadAllReportedAds}
        />
      </React.Fragment>
    );
  } else if (screen === EMPTY_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen
          errorMessage={"There is no Reported Ads"}
          showReloadButton={false}
        />
      </React.Fragment>
    );
  } else if (screen === DEFAULT_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.margin}>
          <Table
            headings={[
              { title: "SR", align: "center" },
              { title: "Reporter", align: "center" },
              { title: "Buyer Contact", align: "center" },
              { title: "Vendor", align: "center" },
              { title: "Vendor Contact", align: "center" },
              { title: "Reason", align: "center" },
              { title: "Details", align: "center" },
              { title: "Delete", align: "center" },
            ]}
          >
            {reportedAds.map((elem, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{elem.buyerId.name}</TableCell>
                <TableCell align="center">{elem.buyerId.contact}</TableCell>
                <TableCell align="center">
                  {elem.product.vendorId.name}
                </TableCell>
                <TableCell align="center">
                  {elem.product.vendorId.contact}
                </TableCell>
                <TableCell align="center">{elem.reason}</TableCell>
                <TableCell align="center">
                  <ZoomInIcon
                    onClick={() => {
                      setCurrentData(elem);
                      setScreen(DETAILS_SCREEN);
                    }}
                    className={classes.detailsIcon}
                  />
                </TableCell>
                <TableCell align="center">
                  <DeleteForeverIcon
                    onClick={handleDeleteAd.bind(this, elem._id)}
                    className={classes.deleteIcon}
                  />
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Row>
      </React.Fragment>
    );
  } else if (screen === DETAILS_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.backBar}>
          <BackspaceIcon
            onClick={() => setScreen(DEFAULT_SCREEN)}
            className={classes.backspaceIcon}
          />
          <Row className={classes.title}>{currentData.product.name}</Row>
          <Row>
            {deActivateBufferring ? (
              <CircularProgress color="seconadry" size={40} />
            ) : (
              <Button
                className={classes.deActivateBtn}
                color="secondary"
                variant="contained"
                onClick={handleBlockVendor}
              >
                De-activate Vendor
              </Button>
            )}
          </Row>
        </Row>

        <Row className={classes.margin}>
          <Gallery data={currentData.product.images} />
        </Row>

        <Row className={classes.margin}>
          <Table
            headings={[
              { title: "Name", align: "center" },
              { title: "Price", align: "center" },
              { title: "Cat", align: "center" },
              { title: "SubCat", align: "center" },
              { title: "SubSubCat", align: "center" },
              { title: "Desc", align: "center" },
            ]}
          >
            <TableRow>
              <TableCell align="center">{currentData.product.name}</TableCell>
              <TableCell align="center">{currentData.product.price}</TableCell>
              <TableCell align="center">{currentData.product.cat}</TableCell>
              <TableCell align="center">{currentData.product.subCat}</TableCell>
              <TableCell align="center">
                {currentData.product.subSubCat}
              </TableCell>
              <TableCell align="center">{currentData.product.desc}</TableCell>
            </TableRow>
          </Table>
        </Row>

        <Row className={classes.margin}>
          <DownPayment
            downPayment={currentData.product.installmentPlan.downPayment}
          />
        </Row>

        <Row className={classes.margin}>
          <InstallmentPlan
            installmentPlan={
              currentData.product.installmentPlan.installmentPlan
            }
          />
        </Row>
      </React.Fragment>
    );
  }
  return <React.Fragment>{mainGUI}</React.Fragment>;
}; //..................Report ends..

export default Report;
