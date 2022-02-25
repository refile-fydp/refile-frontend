import React from "react";
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
            <FaIcons.FaFolderPlus className="app__folder__add" onClick={handleClickToOpen}>
            </FaIcons.FaFolderPlus>

            <Dialog open={open} onClose={handleToClose}>
            <DialogTitle>{"Enter name of new folder"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                <FolderForm addCategory={addCategory}/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleToClose} 
                        color="primary" autoFocus>
                Close
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddNewCategory;
