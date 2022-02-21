import React from "react";

function Folder({setViewName, folder}) {

    function something(){
        console.log(folder);
        setViewName(folder.name);
    }

    return (
        <div className="app__folder__list__item__hover" onClick={() => setViewName(folder.name)}>
            <p>{folder.name}</p>
        </div>
    );
}

export default Folder;