import React from "react";

function Thread({setViewName, thread}) {

    function something(){
        console.log(thread);
        setViewName(thread.name);
    }

    return (
        <div className="app__thread__list__item__hover" onClick={() => setViewName(thread.name)}>
            <div className="app__thread__list__item">
                <p className="app__thread__list__item__name">{thread.name}</p>
                <p className="app__thread__list__item__date">{thread.date}</p>
                <p className="app__thread__list__item__sender">{thread.sender}</p>
            </div>
        </div>
    );
}

export default Thread;