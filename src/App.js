import React, { useEffect, useState } from 'react';
import PropertySearchForm from './PropertySearchForm';
import PropertyList from "./components/PropertyList.js";
import FavouriteList from "./components/FavouriteList.js";
import SearchBar from "./components/SearchBar.js";
import Modal from './components/Modal';

const App = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProperty, setSelectedProperty] = useState(null); 
    const [filters, setFilters] = useState({
        postcode: '',
        propertyType: 'any',
        minPrice: null,
        maxPrice: null,
        startDate: '',
        endDate: ''
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

    // Filter the properties based on search
    const getFilteredProperties = () => {
        return properties.filter((property) => {
            const matchesSearchTerm = property.id.toLowerCase().includes(searchTerm.toLowerCase());

            // const matchesPostcode = filters.postcode ? property.location.includes(filters.postcode) : true;

            const postcodeFromAddress = property.location.slice(-3).toLowerCase(); // get last 3 characters of location in lowercase
            const matchesPostcode = filters.postcode ? postcodeFromAddress.includes(filters.postcode.toLowerCase()) : true;

            const matchesType = filters.propertyType !== 'any' ? property.type === filters.propertyType : true;
            const matchesMinPrice = filters.minPrice ? property.price >= filters.minPrice : true;
            const matchesMaxPrice = filters.maxPrice ? property.price <= filters.maxPrice : true;
            const matchesStartDate = filters.startDate ? new Date(property.added.year, property.added.month - 1, property.added.day) >= new Date(filters.startDate) : true;
            const matchesEndDate = filters.endDate ? new Date(property.added.year, property.added.month - 1, property.added.day) <= new Date(filters.endDate) : true;

            return matchesSearchTerm && matchesPostcode && matchesType && matchesMinPrice && matchesMaxPrice && matchesStartDate && matchesEndDate;
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

    const handleRemoveFromFavourites = (property) => {
        setFavourites(favourites.filter((favourite) => favourite.id !== property.id));
    };    

    useEffect(() => {
        // Save favourites to local storage
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    const handleClearFavourites = () => {
        setFavourites([]);
        localStorage.removeItem('favourites'); // Clear local storage
    };

    useEffect(() => {
        // Load favourites from local storage
        const savedFavourites = localStorage.getItem('favourites');
        if (savedFavourites) {
            setFavourites(JSON.parse(savedFavourites));
        }
    }, []);

    // open the modal with a selected property
    const handlePropertyClick = (property) => {
        setSelectedProperty(property);
    };

    // close the modal
    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    return (
        <div className="app">
            <div className="nav">
                <div className="navbar">
                    <h1>NestHub</h1>
                </div>
                <div className="searchbar">
                    <SearchBar handleSearchBar={handleSearchBar} />
                </div>
            </div>
            <div>
                <PropertySearchForm onSearch={handleSearch} />
            </div>
            <div className="main-container">
                <div className="left-section">
                    <h2>Properties</h2>
                    <PropertyList
                        properties={filteredProperties}
                        handleAddToFavourites={handleAddToFavourites}
                        handleRemoveFromFavourites={handleRemoveFromFavourites}
                        favourites={favourites}
                        handlePropertyClick={handlePropertyClick}  // property click handler
                    />
                    {filteredProperties.length === 0 ? (
                        <p>No properties available</p>
                    ) : null}
                </div>
                <div className="right-section">
                    <FavouriteList 
                        favourites={favourites} 
                        handleClearFavourites={handleClearFavourites} 
                        setFavourites={setFavourites}
                    />
                </div>
            </div>
            
            {/* details of property */}
            {selectedProperty && (
                <Modal 
                    property={selectedProperty} 
                    handleCloseModal={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default App;
