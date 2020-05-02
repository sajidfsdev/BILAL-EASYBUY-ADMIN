import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const CustomizedTables = (props) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell
              style={{
                padding: "5px",
              }}
              align="center"
            >
              SR
            </StyledTableCell>
            <StyledTableCell
              style={{
                padding: "5px",
              }}
              align="center"
            >
              Duration
            </StyledTableCell>
            <StyledTableCell
              style={{
                padding: "5px",
              }}
              align="center"
            >
              Installment
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.installmentPlan.map((elem, index) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell style={{ fontSize: "15px" }} align="center">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "15px" }} align="center">
                  {elem.duration + "#" + (index + 1)}
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "15px" }} align="center">
                  {elem.installment}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CustomizedTables.defaultProps = {
  installmentPlan: [
    {
      duration: "Month",
      installment: 25000,
    },
  ],
};

export default CustomizedTables;
