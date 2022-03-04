import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
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
    TableFooter
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 100,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 300
    },
    tableHeaderCell: {
        margin: '20px 20px',
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark),
    },
    tableRow: {
        "&:hover": {
            backgroundColor: 'lightgrey',
          },
          
    },
    name: {
        overflow: 'hidden',
        fontSize: 13,
        fontWeight: 'bold'

    },
    generic: {
        numberOfLines: 1
    }
  }));

let entries = []

function ThreadTable({threads, setThreadNameClicked}) {
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
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  useEffect(() => {
     const tempArray = [];
        threads.forEach(thread => {
           tempArray.push(new Thread(
                thread.thread,
                thread.sender,
                thread.createdDate
           ));
        })
        setTableThread(tempArray);
  }, [threads]);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Threads</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableThread.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow className={classes.tableRow} key={row.name}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={10} onClick={() => handleThreadClick(row.name)}>
                          <Typography className={classes.name} >{row.name}</Typography>
                          <Typography variant="caption">{row.sender}</Typography>
                          <Typography variant="caption">{formatDate(row.creation_date)}</Typography>
                      </Grid>
                  </Grid>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default ThreadTable;
