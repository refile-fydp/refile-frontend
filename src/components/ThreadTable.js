import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Thread } from "../models/Thread";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
    fontSize: 14,
    fontFamily: "Inter",
    color: "black",
  },
  name_subtitle: {
    overflow: "hidden",
    numberOfLines: 1,
    fontSize: 12,
    fontFamily: "Inter",
    color: "#000000DE",
  },
  generic: {
    numberOfLines: 1,
  },
  tableCell: {
    border: "none",
  },
}));

let entries = [];

function ThreadTable({ threads, setThreadNameClicked }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [tableThread, setTableThread] = useState([]);

  function handleThreadClick(threadName) {
    setThreadNameClicked(threadName);
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const tempArray = [];
    threads.forEach((thread) => {
      tempArray.push(
        new Thread(thread.thread, thread.senderEmail, thread.createdDate)
      );
    });
    setTableThread(tempArray);
  }, [threads]);

  return (
    <TableContainer
      component={Paper}
      className={classes.tableContainer}
      elevation={0}
    >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Threads</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableThread
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow className={classes.tableRow} key={row.name}>
                <TableCell className={classes.tableCell}>
                  <Grid container>
                    <Grid
                      item
                      lg={10}
                      onClick={() => handleThreadClick(row.name)}
                    >
                      <Typography className={classes.name}>
                        {row.name}
                      </Typography>
                      <Typography className={classes.name_subtitle}>
                        {row.senderEmail}
                      </Typography>
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

export default ThreadTable;
