//search bar
import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({handleSearchBar}) => {
    return(
        <TextField className='search-bar-text-field' onChange={(e) => handleSearchBar(e.target.value)} placeholder="Search for your dream nest..."/>
    );
};
export default SearchBar;