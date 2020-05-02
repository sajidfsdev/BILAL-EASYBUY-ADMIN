import React from "react";
import Row from "./../../UI/Row/ELXRow";
import { makeStyles } from "@material-ui/core/styles";
import AppConsts from "./../../Constants/Strings";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  gallery: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  imageBox: {
    width: "215px",
    height: "215px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Gallery = (props) => {
  //const classes
  const classes = useStyles();
  return (
    <React.Fragment>
      <Row className={classes.gallery}>
        {props.data.map((elem, index) => {
          return (
            <Paper key={index} elevation={4} className={classes.imageBox}>
              <img
                style={{
                  width: "215px",
                  height: "auto",
                }}
                src={`${AppConsts.server}/${elem}`}
              />
            </Paper>
          );
        })}
      </Row>
    </React.Fragment>
  );
}; //...................
Gallery.defaultProps = {
  data: [],
};

export default Gallery;
