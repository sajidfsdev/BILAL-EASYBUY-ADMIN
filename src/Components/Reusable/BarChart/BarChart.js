import React from "react";
import useStyles from "./BarChart.styles";
import Row from "./../../../UI/Row/ELXRow";
import { Chart } from "react-google-charts";

const BarChart = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Row>
        <Chart
          width={props.width}
          height={props.height}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={props.data}
          options={{
            // Material design options
            chart: {
              title: props.title,
              subtitle: props.subTitle,
            },
          }}
        />
      </Row>
    </React.Fragment>
  );
}; //....................BarChart

BarChart.defaultProps = {
  width: "100%",
  height: "400px",
  data: [
    ["Date", "Consigned", "Accomplished"],
    ["2014", 1000, 400],
    ["2015", 1170, 460],
    ["2016", 660, 1120],
    ["2017", 1030, 540],
  ],
  title: "Accomplished and Consignments",
  subTitle: "Date vs Sales",
};

export default BarChart;
