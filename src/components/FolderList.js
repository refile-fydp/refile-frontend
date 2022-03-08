import React, {useEffect, useState} from "react";
import Folder from "./Folder";
import * as FaIcons from "react-icons/fa"

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
                <div className="app__folder__list__items__container" >
                    <Folder className="flex_one" setViewName={setViewName} key={category.id} folder={category} />
                    <FaIcons.FaTrash className="flex_one"></FaIcons.FaTrash>
                </div>
            ))}
        </div>
    );
}

export default FolderList;