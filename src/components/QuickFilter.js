import React from "react";

function QuickFilter({quickFilter}) {
    function something(){
        console.log(quickFilter);
    }

    return (
        <div onClick={something}>
            <p className='app__attachments__quick__filters'>{quickFilter.name}</p>
        </div>
    );
}

export default QuickFilter;