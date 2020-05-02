import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Row from "./../../../../UI/Row/ELXRow";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "./../../../../UI/Table/Table";
import TableRow from "./../../../../UI/Table/TableRow";
import TableCell from "./../../../../UI/Table/TableCell";
import Button from "@material-ui/core/Button";
import Gallery from "./../../../../Components/Reusable/Gallery";
import DownPayment from "./../../../../Components/Reusable/DownPayment";
import InstallmentPlan from "./../../../../Components/Reusable/InstallmentPlan";

const useStyles = makeStyles((theme) => ({
  topBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "40px",
    marginTop: "10px",
    backgroundColor: theme.palette.primary.main,
  },

  leftBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "20px",
    width: "100%",
    maxWidth: "130px",
  },
  rightBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "50px",
    width: "100%",
  },
  backIcon: {
    color: "white",
    fontSize: "25px",
    cursor: "pointer",
  },

  margin: {
    marginTop: "10px",
  },
  title: {
    color: "#fff",
    marginRight: "25px",
  },
}));

const AdsList = (props) => {
  const classes = useStyles();
  const [screen, setScreen] = useState("DEFAULT"); //Default, details
  const [ad, setAd] = useState();

  let mainGUI = null;

  if (screen === "DEFAULT") {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.topBar}>
          <Row className={classes.leftBar}>
            <Tooltip title="Go Back">
              <ArrowBackIcon
                onClick={props.back}
                className={classes.backIcon}
              />
            </Tooltip>
          </Row>
          <Row className={classes.rightBar}></Row>
        </Row>

        <Row className={classes.margin}>
          <Table
            headings={[
              { title: "SR", align: "center" },
              { title: "Product", align: "center" },
              { title: "Category", align: "center" },
              { title: "Price", align: "center" },
              { title: "Description", align: "center" },
              { title: "Details", align: "center" },
            ]}
          >
            {props.data.map((elem, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{elem.name}</TableCell>
                <TableCell align="center">{elem.cat}</TableCell>
                <TableCell align="center">{elem.price}</TableCell>
                <TableCell align="center">{elem.desc}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      setAd(elem);
                      setScreen("DETAILS");
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Ad Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Row>
      </React.Fragment>
    );
  } else {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.topBar}>
          <Row className={classes.leftBar}>
            <Tooltip title="Go Back">
              <ArrowBackIcon
                onClick={() => setScreen("DEFAULT")}
                className={classes.backIcon}
              />
            </Tooltip>
          </Row>
          <Row className={classes.title}>{ad.name}</Row>
        </Row>

        <Row className={classes.margin}>
          <Gallery data={ad.images} />
        </Row>
        <Row className={classes.margin}>
          <Table
            headings={[
              { title: "Product", align: "center" },
              { title: "Price", align: "center" },
              { title: "Category", align: "center" },
              { title: "Sub category", align: "center" },
              { title: "Sub Sub category", align: "center" },
              { title: "Description", align: "center" },
            ]}
          >
            <TableRow>
              <TableCell align="center">{ad.name}</TableCell>
              <TableCell align="center">{ad.price}</TableCell>
              <TableCell align="center">{ad.cat}</TableCell>
              <TableCell align="center">{ad.subCat}</TableCell>
              <TableCell align="center">{ad.subSubCat}</TableCell>
              <TableCell align="center">{ad.desc}</TableCell>
            </TableRow>
          </Table>
        </Row>

        <Row className={classes.margin}>
          <DownPayment downPayment={ad.installmentPlan.downPayment} />
        </Row>

        <Row className={classes.margin}>
          <InstallmentPlan
            installmentPlan={ad.installmentPlan.installmentPlan}
          />
        </Row>
      </React.Fragment>
    );
  }

  return <React.Fragment>{mainGUI}</React.Fragment>;
}; //...................Ads List

export default AdsList;
