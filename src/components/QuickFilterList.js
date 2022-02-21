import React from "react";
import QuickFilter from "./QuickFilter";

function QuickFilterList({quickFilters}) {

    return (
        <div className="app__attachments__quick__filters__list">
            {quickFilters.map(quickFilter => (
                <QuickFilter key={quickFilter.id} quickFilter={quickFilter} />
            ))}
        </div>
    );

}

export default QuickFilterList;