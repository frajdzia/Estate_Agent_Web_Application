import React, { useState } from 'react';
import PropertySearchForm from './PropertySearchForm';
import propertiesData from './public/properties.json';

function App() {
    const [filteredProperties, setFilteredProperties] = useState(Array.isArray(propertiesData) ? propertiesData : []);

    const handleSearch = (searchCriteria) => {
        const { postcode, propertyType, minPrice, maxPrice, startDate, endDate } = searchCriteria;

        let filtered = propertiesData.filter((property) => {
            const matchesPostcode = postcode ? property.postcode.includes(postcode) : true;
            const matchesType = propertyType !== 'any' ? property.type === propertyType : true;
            const matchesMinPrice = minPrice ? property.price >= minPrice : true;
            const matchesMaxPrice = maxPrice ? property.price <= maxPrice : true;
            return matchesPostcode && matchesType && matchesMinPrice && matchesMaxPrice;
        });
        setFilteredProperties(filtered);
    };

    return (
        <div>
            <h1>Estate Agent Web Application</h1>
            <PropertySearchForm onSearch={handleSearch} />

            <h2>Properties</h2>
            <ul>
                {filteredProperties.map((property) => (
                    <li key={property.id}>
                        {property.name} - {property.type} - {property.price} - {property.postcode}
                    </li>
                ))};
            </ul>
        </div>
    );
};
export default App;
