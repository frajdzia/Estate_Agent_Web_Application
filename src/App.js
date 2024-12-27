import React, { useEffect, useState } from 'react';
import PropertySearchForm from './components/PropertySearchForm.js';
import PropertyList from "./components/PropertyList.js";
import FavoriteList from "./components/FavoriteList.js";
import SearchBar from "./components/SearchBar.js";
import Modal from './components/Modal';

const App = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProperty, setSelectedProperty] = useState(null); 
    const [filters, setFilters] = useState({
        postcode: '',
        propertyType: 'Any',
        minBed: null,
        maxBed: null,
        minPrice: null,
        maxPrice: null,
        startDate: null,
        endDate: null
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

            
        // Load favorites from local storage
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }

        setFilteredProperties(getFilteredProperties());
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

            const matchesType = filters.propertyType !== 'Any' ? property.type === filters.propertyType : true;
            const matchesMinBed = filters.minBed ? property.bedrooms >=filters.minBed : true;
            const matchesMaxBed = filters.maxBed ? property.bedrooms <=filters.maxBed : true;
            const matchesMinPrice = filters.minPrice ? property.price >= filters.minPrice : true;
            const matchesMaxPrice = filters.maxPrice ? property.price <= filters.maxPrice : true;

            const addedDate = new Date(property.added); 
            const matchesStartDate = filters.startDate ? addedDate >= new Date(filters.startDate) : true;
            const matchesEndDate = filters.endDate ? addedDate <= new Date(filters.endDate) : true;

            return matchesSearchTerm && matchesPostcode && matchesType && matchesMinBed && matchesMaxBed && matchesMinPrice && matchesMaxPrice && matchesStartDate && matchesEndDate;
        });
    };

    useEffect(() => {
        setFilteredProperties(getFilteredProperties());
    }, [searchTerm, filters, properties]);

    const handleAddToFavorites = (property) => {
        if (!favorites.some((favorite) => favorite.id === property.id)) {
            setFavorites([...favorites, property]);
        }
    };

    const handleRemoveFromFavorites = (property) => {
        setFavorites(favorites.filter((favorite) => favorite.id !== property.id));
    };    

    useEffect(() => {
        // Save favorites to local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleClearFavorites = () => {
        setFavorites([]);
        localStorage.removeItem('favorites'); // Clear local storage
    };

    // open the modal with a selected property
    const handlePropertyClick = (property) => {
        setSelectedProperty(property);
    };

    // close the modal
    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    const handleFavoriteDrop = (e) => {
        const favorite = JSON.parse(e.dataTransfer.getData('favorite')); 
        setFavorites(favorites.filter(f => f.id !== favorite.id));
    };
    
    const handleFavoriteDragOver = (e) => {
        e.preventDefault();
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
                <div className="left-section" onDrop={handleFavoriteDrop} onDragOver={handleFavoriteDragOver}>
                    <h2>Properties</h2>
                    <PropertyList
                        properties={filteredProperties}
                        handleAddToFavorites={handleAddToFavorites}
                        handleRemoveFromFavorites={handleRemoveFromFavorites}
                        favorites={favorites}
                        handlePropertyClick={handlePropertyClick}  // property click handler
                    />
                    {filteredProperties.length === 0 ? (
                        <p>No properties available</p>
                    ) : null}
                </div>
                <div className="right-section">
                    <FavoriteList 
                        favorites={favorites} 
                        handleClearFavorites={handleClearFavorites} 
                        handleRemoveFromFavorites={handleRemoveFromFavorites}
                        setFavorites={setFavorites}
                        handlePropertyClick={handlePropertyClick}  // property click handler
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
