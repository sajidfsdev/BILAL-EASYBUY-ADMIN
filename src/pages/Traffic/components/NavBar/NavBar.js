import React, { useState } from "react";
import useStyles from "./NavBar.styles";
import Row from "./../../../../UI/Row/ELXRow";
import clsx from "clsx";
import * as constants from "./../../constants/constants";

const NavBar = (props) => {
  //styles init...
  const classes = useStyles();

  const [searchKeywords, setSearchKeywords] = useState("");
  const [searchType, setSearchType] = useState(constants.SEARCH_BY_EMAIL);

  //Methods....
  const handleDoSearching = (event) => {
    const value = event.target.value;
    setSearchKeywords(value);

    const data =
      props.screen === constants.VENDORS_SCREEN
        ? [...props.vendorTraffic]
        : [...props.buyerTraffic];
    const setData =
      props.screen === constants.VENDORS_SCREEN
        ? props.setVendorTraffic
        : props.setBuyerTraffic;

    if (value === "") {
      return setData([...data]);
    }

    switch (searchType) {
      case constants.SEARCH_BY_NAME:
        setData([
          ...data.filter((elem) =>
            elem.name.toUpperCase().search(value.toUpperCase()) > -1
              ? true
              : false
          ),
        ]);
        break;

      case constants.SEARCH_BY_EMAIL:
        setData([
          ...data.filter((elem) =>
            elem.email.toUpperCase().search(value.toUpperCase()) > -1
              ? true
              : false
          ),
        ]);
        break;

      case constants.SEARCH_BY_CONTACT:
        setData([
          ...data.filter((elem) =>
            elem.contact.toUpperCase().search(value.toUpperCase()) > -1
              ? true
              : false
          ),
        ]);
        break;

      case constants.SEARCH_BY_CITY:
        setData([
          ...data.filter((elem) =>
            elem.city.toUpperCase().search(value.toUpperCase()) > -1
              ? true
              : false
          ),
        ]);
        break;
    } //switch ends....
  }; //.................handle do seraching

  return (
    <React.Fragment>
      <Row className={classes.topBar}>
        <Row className={classes.leftBar}>
          <Row
            onClick={() => props.setScreen(constants.VENDORS_SCREEN)}
            className={clsx({
              [classes.navLink]: true,
              [classes.active]: props.screen === constants.VENDORS_SCREEN,
              [classes.inActive]: props.screen !== constants.VENDORS_SCREEN,
            })}
          >
            Vendors
          </Row>
          <Row
            onClick={() => props.setScreen(constants.BUYERS_SCREEN)}
            className={clsx({
              [classes.navLink]: true,
              [classes.active]: props.screen === constants.BUYERS_SCREEN,
              [classes.inActive]: props.screen !== constants.BUYERS_SCREEN,
            })}
          >
            Buyers
          </Row>
        </Row>
        <Row className={classes.rightBar}>
          <select
            className={classes.input}
            value={searchType}
            onChange={(event) => setSearchType(event.target.value)}
          >
            <option>{constants.SEARCH_BY_EMAIL}</option>
            <option>{constants.SEARCH_BY_NAME}</option>
            <option>{constants.SEARCH_BY_CONTACT}</option>
            <option>{constants.SEARCH_BY_CITY}</option>
          </select>
          <input
            className={classes.input}
            type="text"
            placeholder="Search..."
            value={searchKeywords}
            onChange={handleDoSearching}
          />
        </Row>
      </Row>
    </React.Fragment>
  );
}; //..................NavBar

export default NavBar;
