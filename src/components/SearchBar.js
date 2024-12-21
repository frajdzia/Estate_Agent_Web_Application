//search bar
import React from 'react';

const SearchBar = ({handleSearchBar}) => {
    return(
        <input type="text" placeholder="Search for your dream nest..."
        onChange={(e) => handleSearchBar(e.target.value)}/>
    );
};
export default SearchBar;