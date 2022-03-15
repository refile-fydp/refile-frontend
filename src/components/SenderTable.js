import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Thread } from "../models/Thread";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Grid,
  Typography,
  TableFooter,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 100,
    border: "none",
  },
  tableContainer: {
    borderRadius: "4px",
    margin: "10px 10px",
    border: "none",
  },
  tableHeaderCell: {
    fontWeight: "regular",
    fontFamily: "Inter",
    backgroundColor: "#F5F5F5",
    color: "black",
    border: "none",
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "lightgrey",
      cursor: "pointer",
    },
  },
  name: {
    overflow: "hidden",
    numberOfLines: 1,
    fontSize: 13,
    fontFamily: "Inter",
    color: "black",
  },
  generic: {
    numberOfLines: 1,
  },
  tableCell: {
    border: "none",
  },
}));

let entries = [];

function SenderTable({ senders, setSenderNameClicked }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [tableSender, setTableSender] = useState([]);

  function handleSenderClick(senderName) {
    setSenderNameClicked(senderName);
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const tempArray = [];
    senders.forEach((sender) => {
      tempArray.push(sender.senderEmail);
    });
    setTableSender(tempArray);
  }, [senders]);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Senders</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableSender
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow className={classes.tableRow} key={row.name}>
                <TableCell className={classes.tableCell}>
                  <Grid container>
                    <Grid item lg={10} onClick={() => handleSenderClick(row)}>
                      <Typography className={classes.name}>{row}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </TableContainer>
  );
}

export default SenderTable;
