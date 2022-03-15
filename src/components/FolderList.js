import React, { useEffect, useState } from "react";
import Folder from "./Folder";
import * as FaIcons from "react-icons/fa";

function FolderList({ setFolderSelected, folders }) {
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
      {categories.map((category) => (
        <div className="app__folder__list__items__container">
          <FaIcons.FaFolder className="app__folder__list__icon"></FaIcons.FaFolder>
          <div className="app__folder__list__items__text__container">
            <Folder
              className="app__folder__list__title"
              setViewName={setViewName}
              key={category.id}
              folder={category}
            />
            <p className="app__folder__list__attachment_number">
              6 Attachments
            </p>
          </div>
          <FaIcons.FaCloudDownloadAlt className="app__folder__list__cloud__icon"></FaIcons.FaCloudDownloadAlt>
        </div>
      ))}
    </div>
  );
}

export default FolderList;
