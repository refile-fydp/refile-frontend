import React from "react";
import "./LandingPage.css";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import FolderForm from './components/FolderForm';
import * as FaIcons from "react-icons/fa"

function AddNewCategory({addCategory}) {
    const [open, setOpen] = React.useState(false);

    const handleClickToOpen = () => {
        setOpen(true);
      };
      
      const handleToClose = () => {
        setOpen(false);
      };
    
    return (
        <div>
           
            <button type="button" className="refresh_button" onClick={handleClickToOpen}>
                <FaIcons.FaPlusCircle className="refresh_icon"></FaIcons.FaPlusCircle>
                <p className="refresh_text">Create New Category</p>
            </button>

            <Dialog open={open} onClose={handleToClose}>
            <DialogTitle>{"Enter name of new folder"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <FolderForm setOpen={handleToClose} addCategory={addCategory}/>
                </DialogContentText>
            </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewCategory;
