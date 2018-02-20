import React from 'react';
import { NavLink } from 'react-router-dom';

const PaginateLists = (props) => {
    const {
        count,
        limit,
        onPaginateLists
    } = props;

    // Formulating numbers for pages of shopping lists
    let pages = [];
    let numOfPages = Math.floor(count/limit);
    if((count % limit) > 0 ){
        numOfPages +=1
    }
    for(let page=1; page<=numOfPages; page++){
        pages.push(
            <li 
                key={page}
                onClick={() => onPaginateLists(limit, page)}
                >
                <NavLink to="#"> {page}</NavLink>
            </li>
        );
    }

    // Displaying pages
    return(
        <div>
            <ul className="pagination pagination-lg pagination-centered">{pages}</ul>
        </div>
    );
}

export default PaginateLists;