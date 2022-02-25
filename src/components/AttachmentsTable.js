import React, { useState, useEffect } from "react";
import { Attachment } from "../models/Attachment";
import './AttachmentsTable.css';

function AttachmentsTable({ from, filter, attachments }) {

   const [tableAttachments, setTableAttachment] = useState([]);

   useEffect(() => {
      const tempArray = [];
      if (from == 'files') {
         attachments.forEach(attachment => {
            tempArray.push(new Attachment(
               attachment.id,
               attachment.name,
               attachment.subject,
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
                  attachment.subject,
                  attachment.sender,
                  attachment.createdDate
               ));
            }
         })
      }
      setTableAttachment(tempArray);
   }, [attachments, from, filter]);


   const renderTableHeader = () => {
      return (
         <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Sender</th>
            <th>Date</th>
         </tr>

      )
   }

   const renderTableData = () => {
      return tableAttachments.map((tableAttachment, index) => {
         const { name, subject, sender, creation_date, extension } = tableAttachment //destructuring
         console.log(tableAttachments.length);

         return (
            <tr>
               <td>{name}</td>
               <td>{subject}</td>
               <td>{sender}</td>
               <td>{creation_date}</td>
            </tr>
         )
      })
   }

   const openDialog = () => {
      console.log("tableclicked");
   }


   return (
      <div>
         <table id='students'>
            <tbody>
               {renderTableHeader()}
               {renderTableData()}
            </tbody>
         </table>
      </div>
   )
}
export default AttachmentsTable;