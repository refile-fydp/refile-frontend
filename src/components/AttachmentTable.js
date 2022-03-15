import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Attachment } from "../models/Attachment";
import * as FaIcons from "react-icons/fa";

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
  TableFooter,
} from "@material-ui/core";
import { maxHeight } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
  },
  tableContainer: {
    borderRadius: "4px",
    margin: "10px 10px",
    maxHeight: "600px",
    overflow: "auto",
  },
  tableHeaderCell: {
    fontWeight: "regular",
    fontFamily: "Inter",
    backgroundColor: "white",
    color: "#888888",
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
    justify: "center",
    align: "center",
  },
  name: {
    fontWeight: "regular",
    fontFamily: "Inter",
    fontSize: "16px",
    color: "black",
    overflow: "hidden",
  },
  status: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    display: "inline-block",
  },
}));

let entries = [];

function AttachmentTable({ from, filter, attachments }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    if (from == "files") {
      attachments.forEach((attachment) => {
        tempArray.push(
          new Attachment(
            attachment.id,
            attachment.name,
            attachment.thread,
            attachment.sender,
            attachment.createdDate
          )
        );
      });
    } else if (from == "folders") {
      attachments.forEach((attachment) => {
        if (filter == attachment.categories) {
          tempArray.push(
            new Attachment(
              attachment.id,
              attachment.name,
              attachment.thread,
              attachment.sender,
              attachment.createdDate
            )
          );
        }
      });
    }
    setTableAttachment(tempArray);
  }, [attachments, from, filter]);

  return (
    <TableContainer
      component={Paper}
      className={classes.tableContainer}
      elevation={0}
    >
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}></TableCell>
            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Subject</TableCell>
            <TableCell className={classes.tableHeaderCell}>Date</TableCell>
            <TableCell className={classes.tableHeaderCell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableAttachments
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <Avatar alt={row.name} src="." className={classes.avatar} />
                </TableCell>
                <TableCell>
                  <Typography className={classes.name}>{row.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.name}>{row.thread}</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.name}>
                    {row.creation_date}
                  </Typography>
                </TableCell>
                <TableCell>
                  <FaIcons.FaCloudDownloadAlt className="app__folder__list__cloud__icon"></FaIcons.FaCloudDownloadAlt>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TableFooter>
        <TablePagination
          component="div"
          count={tableAttachments.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableFooter>
    </TableContainer>
  );
}

export default AttachmentTable;
