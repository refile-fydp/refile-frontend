import React from "react";

function Folder({ setViewName, folder }) {
  function something() {
    console.log(folder);
    setViewName(folder);
  }

  return (
    <div
      className="app__folder__list__title"
      onClick={() => setViewName(folder)}
    >
      <p className="app__folder__list__title">{folder}</p>
    </div>
  );
}

export default Folder;
