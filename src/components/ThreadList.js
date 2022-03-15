import React, { useState } from "react";
import Thread from "./Thread";

function ThreadList({ setThreadSelected, threads }) {
  const [viewName, setViewName] = useState("All attachments");

  return (
    <div onChange={setThreadSelected(viewName)} className="app__thread__list">
      {threads.map((thread) => (
        <Thread setViewName={setViewName} key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

export default ThreadList;
