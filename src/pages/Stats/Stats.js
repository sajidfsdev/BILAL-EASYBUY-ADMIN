import React, { useState, useEffect } from "react";
import useStyles from "./Stats.styles";
import Row from "./../../UI/Row/ELXRow";
import Paper from "@material-ui/core/Paper";
import ContactsIcon from "@material-ui/icons/Contacts";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ReceiptIcon from "@material-ui/icons/Receipt";
import { FaStore } from "react-icons/fa";
import BarChart from "./../../Components/Reusable/BarChart/BarChart";
import LinearProgressBar from "./../../UI/LinearProgress/LinearProgress";
import LoadingScreen from "./../../Components/Reusable/LoadingScreen/LoadingScreen";
import ErrorScreen from "./../../Components/Reusable/ErrorScreen/ErrorScreen";
import axios from "axios";
import AppConsts from "./../../Constants/Strings";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import sorter from "sort-isostring";

//screen stats.
const LOADING_SCREEN = "LOADING_SCREEN";
const DEFAULT_SCREEN = "DEFAULT_SCREEN";
const ERROR_SCREEN = "ERROR_SCREEN";

const Stats = (props) => {
  const classes = useStyles();

  const [screen, setScreen] = useState(LOADING_SCREEN);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({});

  const token_RP = useSelector((state) => state.auth.token);
  const [graphData, setGraphData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    handleLoadStats();
  }, []);

  const handleShowSnackbar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  }; //.........................handle Load Snackbar

  const handleLoadChart = (consigned) => {
    let chartData = [];
    //["Date", "Consigned", "Accomplished"]
    chartData.push();
    consigned.consigned.forEach((elem) => {
      let isPresent = false;
      let index = 0;
      chartData.forEach((cd, ind) => {
        if (cd[0] == elem.date) {
          isPresent = true;
          index = ind;
        }
      });

      //Outer operations...
      if (isPresent) {
        if (elem.status == "APPROVED") {
          chartData[index][1] = chartData[index][1] + 1;
        } else if (elem.status == "COMPLETED") {
          chartData[index][2] = chartData[index][2] + 1;
        }
      } else {
        //Not present starts...
        if (elem.status == "APPROVED") {
          chartData.push([elem.date, 1, 0]);
        } else if (elem.status == "COMPLETED") {
          chartData.push([elem.date, 0, 1]);
        }
      }
    });
    //doing sorting starts....
    // let dates = [];
    // chartData.forEach((date, index) => {
    //   if (index != 0) dates.push(date[0]);
    // });

    let sortedChartData = [
      ["Date", "Consigned", "Accomplished"],
      ...chartData.sort((x, y) => sorter(x[0], y[0])),
    ];

    //doing sorting ends......

    setGraphData([...sortedChartData]);
  }; //...........................handle Load Chart

  const handleLoadStats = async () => {
    setScreen(LOADING_SCREEN);

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken": token_RP,
      },
    };

    try {
      const res = await axios.get(
        AppConsts.server + "/admin/stats/get",
        config
      );

      if (res) {
        setScreen(DEFAULT_SCREEN);
        setData({ ...res.data });
        handleLoadChart({ ...res.data });
        console.log(res.data);
      } else {
        setScreen(ERROR_SCREEN);
        setErrorMessage("Network Error");
        handleShowSnackbar("Network Error", "error");
      }
    } catch (err) {
      if (err.response) {
        setScreen(ERROR_SCREEN);
        setErrorMessage(err.response.data.errorMessage);
        handleShowSnackbar(err.response.data.errorMessage, "error");
      } else {
        setScreen(ERROR_SCREEN);
        setErrorMessage(err.message);
        handleShowSnackbar(err.message, "error");
      }
    }
  }; //...........................Handle load stats

  let mainGUI = null;

  if (screen === LOADING_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <LoadingScreen title="Please wait, Loading stats info" />
      </React.Fragment>
    );
  } else if (screen === ERROR_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen
          errorMessage={errorMessage}
          handleReload={handleLoadStats}
        />
      </React.Fragment>
    );
  } else {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.topBar}>
          <Paper elevation={5} className={classes.topStatsBox}>
            <Row className={classes.leftSection}>
              <Row className={classes.leftTop}>{data.buyers}</Row>
              <Row className={classes.leftBottom}>REGISTERED BUYERS</Row>
            </Row>
            <Row className={classes.rightSection}>
              <ContactsIcon className={classes.statIcon} />
            </Row>
          </Paper>
          <Paper elevation={5} className={classes.topStatsBox}>
            <Row className={classes.leftSection}>
              <Row className={classes.leftTop}>{data.vendors}</Row>
              <Row className={classes.leftBottom}>REGISTERED VENDORS</Row>
            </Row>
            <Row className={classes.rightSection}>
              <FaStore className={classes.statIconFa} />
            </Row>
          </Paper>
          <Paper elevation={5} className={classes.topStatsBox}>
            <Row className={classes.leftSection}>
              <Row className={classes.leftTop}>
                {data.consigned
                  ? data.consigned.filter((elem) => elem.status == "COMPLETED")
                      .length
                  : "..."}
              </Row>
              <Row className={classes.leftBottom}>Accompished Sales</Row>
            </Row>
            <Row className={classes.rightSection}>
              <MonetizationOnIcon className={classes.statIcon} />
            </Row>
          </Paper>
          <Paper elevation={5} className={classes.topStatsBox}>
            <Row className={classes.leftSection}>
              <Row className={classes.leftTop}>
                {data.consigned
                  ? data.consigned.filter((elem) => elem.status == "APPROVED")
                      .length
                  : "..."}
              </Row>
              <Row className={classes.leftBottom}>CONSIGNMENTS</Row>
            </Row>
            <Row className={classes.rightSection}>
              <ReceiptIcon className={classes.statIcon} />
            </Row>
          </Paper>
        </Row>

        <BarChart data={graphData} />
      </React.Fragment>
    );
  }

  return <React.Fragment>{mainGUI}</React.Fragment>;
}; //...................Stats

export default Stats;
