import React from "react";
import { Attachment } from "../models/Attachment";
import './AttachmentsTable.css';

class AttachmentsTable extends React.Component {
    constructor(props) {
       super(props)
      
      //  const attachments = [
      //    new Attachment(1, 'newstyle01', 'boxunli@gmail.com', 'New Design Experiments', '07/21/2021 at 2:54 pm', 'png', 'invoice', ''),
      //    new Attachment(2, 'newstyle02', 'boxunli@gmail.com', 'New Design Experiments', '07/21/2021 at 2:54 pm', 'png', 'contract', ''),
      //    new Attachment(3, 'newstyle03', 'boxunli@gmail.com', 'New Design Experiments', '07/21/2021 at 2:54 pm', 'png', 'misc', '')
      //  ];
      
      const array = []
       this.state = {
          tableAttachments: []
       }
       props.attachments.map(attachment => {
         array.push(new Attachment(
            attachment.id,
            attachment.name,
             attachment.subject,
              attachment.sender,
               attachment.createdDate
               ));
         // if (props.filter != "" || props.filter){
         //    console.log("filter exists" + props.filter);
         //    if (attachment.categories == props.filter) {
         //       console.log("filter was selected");

         //       array.push(new Attachment(
         //          attachment.id,
         //          attachment.name,
         //           attachment.subject,
         //            attachment.sender,
         //             attachment.createdDate
         //             ));
         //    }
         // }
       })
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