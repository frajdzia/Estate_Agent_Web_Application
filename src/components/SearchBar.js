//search bar
import React from 'react';

const SearchBar = ({handleSearchBar}) => {
    return(
        <input type="text" placeholder="Search properties..."
        onChange={(e) => handleSearchBar(e.target.value)}/>
    );
};
export default SearchBar;