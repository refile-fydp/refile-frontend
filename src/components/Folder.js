import React from "react";

function Folder({setViewName, folder}) {

    function something(){
        console.log(folder);
        setViewName(folder);
    }

    return (
        <div className="app__folder__list__item__hover" onClick={() => setViewName(folder)}>
            <p>{folder}</p>
        </div>
    );
}

export default Folder;