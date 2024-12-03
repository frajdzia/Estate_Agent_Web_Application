import React, { useEffect, useState } from 'react';
import PropertySearchForm from './PropertySearchForm';
import Cart from "./components/Cart.js";
import PropertyList from "./components/PropertyList.js";
import FavouriteList from "./components/FavouriteList.js";
import SearchBar from "./components/SearchBar.js";

const App = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        postcode: '',
        propertyType: 'any',
        minPrice: null,
        maxPrice: null
    });

    useEffect(() => {
        // Fetch data from properties.json
        fetch('./properties.json')
            .then((response) => response.json())
            .then((data) => {
                setProperties(data.properties);
                setFilteredProperties(data.properties);
            })
            .catch((error) => console.error('Error fetching data: ', error));
    }, []);

    const handleSearch = (searchCriteria) => {
        setFilters(searchCriteria);
    };

    const handleSearchBar = (term) => {
        setSearchTerm(term);
    };

    const getFilteredProperties = () => {
        return properties.filter((property) => {
            const matchesSearchTerm = property.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesPostcode = filters.postcode ? property.postcode.includes(filters.postcode) : true;
            const matchesType = filters.propertyType !== 'any' ? property.type === filters.propertyType : true;
            const matchesMinPrice = filters.minPrice ? property.price >= filters.minPrice : true;
            const matchesMaxPrice = filters.maxPrice ? property.price <= filters.maxPrice : true;

            return matchesSearchTerm && matchesPostcode && matchesType && matchesMinPrice && matchesMaxPrice;
        });
    };

    useEffect(() => {
        setFilteredProperties(getFilteredProperties());
    }, [searchTerm, filters, properties]);

    const handleAddToFavourites = (property) => {
        if (!favourites.some((favourite) => favourite.id === property.id)) {
            setFavourites([...favourites, property]);
        }
    };

    useEffect(() => {
        // Save favourites to localStorage
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    const handleClearFavourites = () => {
        setFavourites([]);
        localStorage.removeItem('favourites'); // Clear local storage
    };

    useEffect(() => {
        // Load favourites from localStorage
        const savedFavourites = localStorage.getItem('favourites');
        if (savedFavourites) {
            setFavourites(JSON.parse(savedFavourites));
        }
    }, []);

    return (
        <div className="app">
            <h1>Estate Agent Web Application</h1>
            <div>
                <SearchBar handleSearchBar={handleSearchBar} />
            </div>
            <div>
                <PropertySearchForm onSearch={handleSearch} />
            </div>
            <div className="main-container">
                <div className="left-section">
                    <h2>Properties</h2>
                    <FavouriteList favourites={favourites} handleClearFavourites={handleClearFavourites} />
                    <PropertyList
                        properties={filteredProperties}
                        handleAddToFavourites={handleAddToFavourites}
                        favourites={favourites}
                    />
                {filteredProperties.length === 0 ? (
                    <p>No properties available</p>
                ) : null} 
                </div>
                <div className="right-section">
                    <Cart cartItems={cartItems} setCartItems={setCartItems} />
                </div>
            </div>
        </div>
    );
};

export default App;
