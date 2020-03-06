import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Row from "./../../../UI/Row/ELXRow";
import useStyles from "./BreadCrumb.styles";

const SimpleBreadcrumbs = props => {
  const classes = useStyles();
  return (
    <Row className={classes.container}>
      <Breadcrumbs aria-label="breadcrumb">
        {props.data.map((elem, index) => (
          <Link
            key={index}
            color="inherit"
            className={classes.link}
            // href="/"
            onClick={() => {
              props.onClick(elem, index);
            }}
          >
            {elem.title}
          </Link>
        ))}
      </Breadcrumbs>
    </Row>
  );
};

SimpleBreadcrumbs.defaultProps = {
  data: [],
  handleClick: () => {}
};

export default SimpleBreadcrumbs;
