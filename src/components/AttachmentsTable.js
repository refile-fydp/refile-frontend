import React from "react";
import { Attachment } from "../models/Attachment";
import './AttachmentsTable.css';

class AttachmentsTable extends React.Component {
    constructor(props) {
       super(props)
      
      const array = []
       this.state = {
          tableAttachments: []
       }

      if (props.from == 'files') {
         props.attachments.map(attachment => {
            array.push(new Attachment(
               attachment.id,
               attachment.name,
               attachment.subject,
               attachment.sender,
                  attachment.createdDate
                  ));
         })
      } else if (props.from == 'folders') {
         props.attachments.map(attachment => {
            if (props.filter == attachment.categories) {
               array.push(new Attachment(
                  attachment.id,
                  attachment.name,
                  attachment.subject,
                  attachment.sender,
                     attachment.createdDate
                     ));
            }
         })
      }

       this.state.tableAttachments = array;
       
    }

    renderTableHeader() {
       return (
         <tr>
           <th>Name</th>
           <th>Subject</th>
           <th>Sender</th>
           <th>Date</th>
         </tr>
          
       )
    }
 
    renderTableData() {
       return this.state.tableAttachments.map((tableAttachment, index) => {
          const {name, subject, sender, creation_date, extension } = tableAttachment //destructuring
          console.log(this.state.tableAttachments.length);

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
 
    openDialog(){
      console.log("tableclicked");
    }

    render() {
       return (
          <div>
             <table  id='students'>
                <tbody>
                   {this.renderTableHeader()}
                   {this.renderTableData()}
                </tbody>
             </table>
          </div>
       )
    }
 }
 export default AttachmentsTable;