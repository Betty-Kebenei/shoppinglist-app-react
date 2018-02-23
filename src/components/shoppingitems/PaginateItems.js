import React from 'react';
import { NavLink } from 'react-router-dom';

const PaginateItems = (props) => {
    const {
        listId, 
        countItems,
        limitItems,
        onPaginateItems
    } = props;

    // Formulating numbers for pages of shopping items.
    let itemPages = [];
    let numOfPages = Math.floor(countItems/limitItems);
    if((countItems % limitItems) > 0 ){
        numOfPages +=1
    }
    for(let itemPage=1; itemPage<=numOfPages; itemPage++){
        itemPages.push(
            <li 
                key={itemPage}
                onClick={() => onPaginateItems(listId, limitItems, itemPage)}
                >
                <NavLink to="#"> {itemPage}</NavLink>
            </li>
        );
    }   

    // Displaying pages
    return(
        <div>
            <ul className="pagination pagination-lg pagination-centered">{itemPages}</ul>
        </div>
    );
}

export default PaginateItems;