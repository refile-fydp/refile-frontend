import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Attachment } from "../models/Attachment";

import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 1100
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark,
        overflow: 'hidden'
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));

let entries = []

function MTable({ from, filter, attachments }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [tableAttachments, setTableAttachment] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
     const tempArray = [];
     if (from == 'files') {
        attachments.forEach(attachment => {
           tempArray.push(new Attachment(
              attachment.id,
              attachment.name,
              attachment.thread,
              attachment.sender,
              attachment.createdDate
           ));
        })
     } else if (from == 'folders') {
        attachments.forEach(attachment => {
           if (filter == attachment.categories) {
              tempArray.push(new Attachment(
                 attachment.id,
                 attachment.name,
                 attachment.thread,
                 attachment.sender,
                 attachment.createdDate
              ));
           }
        })
     }
     setTableAttachment(tempArray);
  }, [attachments, from, filter]);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Subject</TableCell>
            <TableCell className={classes.tableHeaderCell}>Sender</TableCell>
            <TableCell className={classes.tableHeaderCell}>Date</TableCell>
          </TableRow>
        </TableHead>

          <TableBody>
            {tableAttachments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                    <Grid container>
                        <Grid item lg={2}>
                            <Avatar alt={row.name} src='.' className={classes.avatar}/>
                        </Grid>
                        <Grid item lg={10}>
                            <Typography className={classes.name}>{row.name}</Typography>
                        </Grid>
                    </Grid>
                  </TableCell>
              <TableCell>{row.thread}</TableCell>

                <TableCell>{row.sender}</TableCell>
                <TableCell>
                    <Typography>{row.creation_date}</Typography>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={tableAttachments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default MTable;
