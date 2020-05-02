import React, { useState, useEffect } from "react";
import Row from "./../../UI/Row/ELXRow";
import * as constants from "./constants/constants";
import clsx from "clsx";
import useStyles from "./Traffic.styles";
import NavBar from "./components/NavBar/NavBar";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "./../../Components/Reusable/LoadingScreen/LoadingScreen";
import ErrorScreen from "./../../Components/Reusable/ErrorScreen/ErrorScreen";
import * as Actions from "./../../Store/Action/Traffic";
import * as Types from "./../../Store/Constants/Traffic";
import Table from "./../../UI/Table/Table";
import TableRow from "./../../UI/Table/TableRow";
import TableCell from "./../../UI/Table/TableCell";
import Switch from "./../../UI/Switch/Switch";
import Spinner from "./../../UI/CircularProgressBar/CircularProgressBar";
import axios from "axios";
import AppConsts from "./../../Constants/Strings";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import AdsList from "./screens/AdsList/AdsList";

const Traffic = (props) => {
  //styles init...
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [screen, setScreen] = useState(constants.VENDORS_SCREEN);
  const [subScreens, setSubScreens] = useState(constants.DEFAULT_SCREEN);
  const buyerTraffic_RP = useSelector((state) => state.traffic.buyerTraffic);
  const vendorTraffic_RP = useSelector((state) => state.traffic.vendorTraffic);
  const loaded_RP = useSelector((state) => state.traffic.loaded);
  const isError_RP = useSelector((state) => state.traffic.isError);
  const errorMessage_RP = useSelector((state) => state.traffic.errorMessage);
  const [buyerTraffic, setBuyerTraffic] = useState([]);
  const [vendorTraffic, setVendorTraffic] = useState([]);
  const token_RP = useSelector((state) => state.auth.token);
  const [spinnerArray, setSpinnerArray] = useState([]);
  const [adsSpinnerArray, setAdsSpinnerArray] = useState([]);
  const [vendorAds, setVendorAds] = useState([]);
  const dispatch_RP = useDispatch();

  useEffect(() => {
    if (isError_RP || !loaded_RP) {
      handleLoadTraffic();
    }
  }, []);

  useEffect(() => {
    setBuyerTraffic(buyerTraffic_RP);
    setSpinnerArray(buyerTraffic_RP.map((elem) => false));
  }, [buyerTraffic_RP]);

  useEffect(() => {
    setVendorTraffic(vendorTraffic_RP);
    setSpinnerArray(vendorTraffic_RP.map((elem) => false));
    setAdsSpinnerArray(vendorTraffic_RP.map((elem) => false));
  }, [vendorTraffic_RP]);

  //Methods......
  const handleLoadVendorAds = async (vendorId, index) => {
    handleSetAdsSwitchBufferring(index, true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token_RP,
      },
    };
    const body = JSON.stringify({ vendorId });

    try {
      const res = await axios.post(
        AppConsts.server + "/admin/traffic/ads",
        body,
        config
      );

      if (res) {
        handleSetAdsSwitchBufferring(index, false);
        if (res.data.data.length === 0) {
          return handleShowSnackBar(
            "This Vendor has not posted any Ad Yet",
            "error"
          );
        }
        setVendorAds([...res.data.data]);
        setSubScreens(constants.ADS_SCREEN);
      } else {
        handleSetAdsSwitchBufferring(index, false);

        handleShowSnackBar("Network Error", "error");
      }
    } catch (err) {
      handleSetAdsSwitchBufferring(index, false);

      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
      } else {
        handleShowSnackBar(err.message, "error");
      }
    }
  }; //....................handle load traffic

  const handleShowSnackBar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  const handleLoadTraffic = () => {
    dispatch_RP({ type: Types.START_TRAFFIC_BUFFERRING });
    dispatch_RP(Actions.handleLoadAllTraffic(token_RP));
  }; //........................handle load traffic

  const handleChangeStatus = async (event, _id, index, type) => {
    const active = event.target.checked;

    handleSetSwitchBufferring(index, true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token_RP,
      },
    };
    const body = JSON.stringify({ active, _id, type });

    try {
      const res = await axios.post(
        AppConsts.server + "/admin/traffic/setstatus",
        body,
        config
      );

      if (res) {
        handleSetSwitchBufferring(index, false);
        let buyers;
        let vendors;
        if (type === "BUYER") {
          buyers = [
            ...buyerTraffic_RP.map((elem, ind) => {
              if (ind === index) {
                elem.active = active;
              }
              return elem;
            }),
          ];
          vendors = [...vendorTraffic_RP];
        } else {
          vendors = [
            ...vendorTraffic_RP.map((elem, ind) => {
              if (ind === index) {
                elem.active = active;
              }
              return elem;
            }),
          ];
          buyers = [...buyerTraffic_RP];
        }
        dispatch_RP({
          type: Types.TRAFFIC_LOADED_SUCCESS,
          payload: {
            buyerTraffic: [...buyers],
            vendorTraffic: [...vendors],
          },
        });
        handleShowSnackBar("Status Updated Successfully", "success");
      } else {
        handleSetSwitchBufferring(index, false);

        handleShowSnackBar("Network Error", "error");
      }
    } catch (err) {
      handleSetSwitchBufferring(index, false);

      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
      } else {
        handleShowSnackBar(err.message, "error");
      }
    }
  }; //............................Handle change status

  const handleSetAdsSwitchBufferring = (index, status) => {
    setAdsSpinnerArray([
      ...adsSpinnerArray.map((elem, ind) => (ind === index ? status : elem)),
    ]);
  }; //.....................handle set switch bufferring

  const handleSetSwitchBufferring = (index, status) => {
    setSpinnerArray([
      ...spinnerArray.map((elem, ind) => (ind === index ? status : elem)),
    ]);
  }; //.....................handle set switch bufferring

  //let main GUI
  let mainGUI = null;

  if (!loaded_RP) {
    mainGUI = <LoadingScreen title="Please wait loading traffic info" />;
  } else if (isError_RP) {
    mainGUI = (
      <ErrorScreen
        handleReload={handleLoadTraffic}
        errorMessage={errorMessage_RP}
      />
    );
  } else if (subScreens === constants.DEFAULT_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <NavBar
          setBuyerTraffic={setBuyerTraffic}
          setVendorTraffic={setVendorTraffic}
          buyerTraffic={buyerTraffic_RP}
          vendorTraffic={vendorTraffic_RP}
          screen={screen}
          setScreen={setScreen}
        />
        {screen === constants.VENDORS_SCREEN ? (
          <Row className={classes.marginTop}>
            <Table
              headings={[
                { title: "SR", align: "center" },
                { title: "Name", align: "center" },
                { title: "Email", align: "center" },
                { title: "Contact", align: "center" },
                { title: "City", align: "center" },
                { title: "Address", align: "center" },
                { title: "Posted Ads", align: "center" },
                { title: "Active", align: "center" },
              ]}
            >
              {vendorTraffic.map((traffic, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{traffic.name}</TableCell>
                  <TableCell align="center">{traffic.email}</TableCell>
                  <TableCell align="center">{traffic.contact}</TableCell>
                  <TableCell align="center">{traffic.city}</TableCell>
                  <TableCell align="center">{traffic.address}</TableCell>
                  <TableCell align="center">
                    <Tooltip
                      placement="left"
                      arrow
                      title="View All Ads Posted by Vendor"
                    >
                      {adsSpinnerArray[index] ? (
                        <Spinner color="secondary" size={35} />
                      ) : (
                        <Button
                          onClick={handleLoadVendorAds.bind(
                            this,
                            traffic._id,
                            index
                          )}
                          color="primary"
                          variant="contained"
                        >
                          Ads
                        </Button>
                      )}
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    {spinnerArray[index] ? (
                      <Spinner color="secondary" size={35} />
                    ) : (
                      <Switch
                        handleChange={(event) => {
                          handleChangeStatus(
                            event,
                            traffic._id,
                            index,
                            "VENDOR"
                          );
                        }}
                        checked={traffic.active}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </Row>
        ) : (
          <Row className={classes.marginTop}>
            <Table
              headings={[
                { title: "SR", align: "center" },
                { title: "Name", align: "center" },
                { title: "Email", align: "center" },
                { title: "Contact", align: "center" },
                { title: "City", align: "center" },
                { title: "Active", align: "center" },
              ]}
            >
              {buyerTraffic.map((traffic, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{traffic.name}</TableCell>
                  <TableCell align="center">{traffic.email}</TableCell>
                  <TableCell align="center">{traffic.contact}</TableCell>
                  <TableCell align="center">{traffic.city}</TableCell>

                  <TableCell align="center">
                    {spinnerArray[index] ? (
                      <Spinner color="secondary" size={35} />
                    ) : (
                      <Switch
                        handleChange={(event) => {
                          handleChangeStatus(
                            event,
                            traffic._id,
                            index,
                            "BUYER"
                          );
                        }}
                        checked={traffic.active}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </Row>
        )}
      </React.Fragment>
    );
  } else if (subScreens === constants.ADS_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <AdsList
          data={vendorAds}
          back={() => setSubScreens(constants.DEFAULT_SCREEN)}
        />
      </React.Fragment>
    );
  }

  return <React.Fragment>{mainGUI}</React.Fragment>;
}; //.....................

export default Traffic;
