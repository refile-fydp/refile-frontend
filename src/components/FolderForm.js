import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import Button from "@material-ui/core/Button";

function FolderForm({addCategory, setOpen}) {
    const [category, setCategory] = useState("");

    function handleFolderInputChange(e) {
        setCategory({...category, name: e.target.value });
    }

    function handleAddNewFolder(e) {
        e.preventDefault(); // prevents browser refresh
        // trim() gets rid of string whitespace
        if (category.name.trim()) {
          addCategory({ ...category, id: uuidv4() });
        }
    }
    return (
        <form onSubmit={handleAddNewFolder}>
            <input
                label="Name"
                type="text"
                name="name"
                value={category.name}
                onChange={handleFolderInputChange}
            />
            <Button color="primary" type="submit" onClick={() => setOpen(false)}>Add category</Button>
            
      </form>
    )
}

export default FolderForm;