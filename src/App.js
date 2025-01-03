import React, { useEffect, useState } from "react";
import PropertySearchForm from "./components/PropertySearchForm.js";
import PropertyList from "./components/PropertyList.js";
import FavoriteList from "./components/FavoriteList.js";
import SearchBar from "./components/SearchBar.js";
import Modal from "./components/Modal";

const App = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    postcode: "",
    propertyType: "Any",
    minBed: null,
    maxBed: null,
    minPrice: null,
    maxPrice: null,
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    // Fetch data from properties.json
    fetch("./properties.json")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data.properties);
        setFilteredProperties(data.properties);
      })
      .catch((error) => console.error("Error fetching data: ", error));

    // Load favorites from local storage
    const savedFavorites = localStorage.getItem("favorites");
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
      const matchesSearchTerm = property.id
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const postcodeFromAddress = property.location.slice(-3).toLowerCase(); // get last 3 characters of location in lowercase
      const matchesPostcode = filters.postcode
        ? postcodeFromAddress.includes(filters.postcode.toLowerCase())
        : true;

      const matchesType =
        filters.propertyType !== "Any"
          ? property.type === filters.propertyType
          : true;
      const matchesMinBed = filters.minBed
        ? property.bedrooms >= filters.minBed
        : true;
      const matchesMaxBed = filters.maxBed
        ? property.bedrooms <= filters.maxBed
        : true;
      const matchesMinPrice = filters.minPrice
        ? property.price >= filters.minPrice
        : true;
      const matchesMaxPrice = filters.maxPrice
        ? property.price <= filters.maxPrice
        : true;

      const addedDate = new Date(property.added);
      const matchesStartDate = filters.startDate
        ? addedDate >= new Date(filters.startDate)
        : true;
      const matchesEndDate = filters.endDate
        ? addedDate <= new Date(filters.endDate)
        : true;

      return (
        matchesSearchTerm &&
        matchesPostcode &&
        matchesType &&
        matchesMinBed &&
        matchesMaxBed &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesStartDate &&
        matchesEndDate
      );
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
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleClearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites"); // Clear local storage
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
    const favorite = JSON.parse(e.dataTransfer.getData("favorite"));
    setFavorites(favorites.filter((f) => f.id !== favorite.id));
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
      <PropertySearchForm onSearch={handleSearch} />
      <div className="main-container">
        <div
          className="left-section"
          onDrop={handleFavoriteDrop}
          onDragOver={handleFavoriteDragOver}
        >
          <h2>Properties</h2>
          <PropertyList
            properties={filteredProperties}
            handleAddToFavorites={handleAddToFavorites}
            handleRemoveFromFavorites={handleRemoveFromFavorites}
            favorites={favorites}
            handlePropertyClick={handlePropertyClick} // property click handler
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
            handlePropertyClick={handlePropertyClick} // property click handler
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
      <footer>
        <svg
          height="32"
          aria-hidden="true"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          data-view-component="true"
          class="octicon octicon-mark-github v-align-middle color-fg-default"
        >
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
        <a target="_blank" href="https://github.com/frajdzia">
          frajdzia
        </a>
      </footer>
    </div>
  );
};

export default App;
