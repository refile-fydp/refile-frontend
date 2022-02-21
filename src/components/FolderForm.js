import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';

function FolderForm({addFolder}) {
    const [folder, setFolder] = useState({
        id: "",
        name: ""

    });

    function handleFolderInputChange(e) {
        setFolder({...folder, name: e.target.value });
    }

    function handleAddNewFolder(e) {
        e.preventDefault(); // prevents browser refresh
        // trim() gets rid of string whitespace
        if (folder.name.trim()) {
          addFolder({ ...folder, id: uuidv4() });
        }
    }
    return (
        <form onSubmit={handleAddNewFolder}>
            <input
                label="Name"
                type="text"
                name="name"
                value={folder.name}
                onChange={handleFolderInputChange}
            />
            <button type="submit">Add folder</button>
            
      </form>
    )
}

export default FolderForm;