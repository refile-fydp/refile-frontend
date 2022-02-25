import React, {useEffect, useState} from "react";
import Folder from "./Folder";

function FolderList({setFolderSelected, folders}) {
    const [viewName, setViewName] = useState();
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        setCategories(folders);
        console.log("inside folderlist " + categories);

    });

    function setSends() {
        setFolderSelected(viewName);
    }

    return (
        <div onChange={setSends()} className="app__folder__list">
            {categories.map(category => (
                <Folder setViewName={setViewName} key={category.id} folder={category} />
            ))}
        </div>
    );
}

export default FolderList;