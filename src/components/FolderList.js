import React, {useState} from "react";
import Folder from "./Folder";

function FolderList({setFolderSelected, folders}) {
    const [viewName, setViewName] = useState('All attachments');

    return (
        <div onChange={setFolderSelected(viewName)} className="app__folder__list">
            {folders.map(folder => (
                <Folder  setViewName={setViewName} key={folder.id} folder={folder} />
            ))}
        </div>
    );
}

export default FolderList;