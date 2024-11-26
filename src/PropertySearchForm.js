import React, { useState } from 'react';

function PropertySearchForm({ onSearch }) {
    const [postcode, setPostcode] = useState('');
    const [propertyType, setPropertyType] = useState('any');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ postcode, propertyType, minPrice, maxPrice, startDate, endDate });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Find Property By:</h3>
            
            <fieldset>
                <legend>Postcode:</legend>
                <input 
                    type="text" 
                    placeholder="Enter the postcode" 
                    value={postcode} 
                    onChange={(e) => setPostcode(e.target.value)} 
                />
            </fieldset>

            <fieldset>
                <legend>Type of Property:</legend>
                <label>
                    <input 
                        type="radio" 
                        name="property-type" 
                        value="house" 
                        checked={propertyType === 'house'}
                        onChange={() => setPropertyType('house')} 
                    /> House
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="property-type" 
                        value="flat" 
                        checked={propertyType === 'flat'}
                        onChange={() => setPropertyType('flat')} 
                    /> Flat
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="property-type" 
                        value="any" 
                        checked={propertyType === 'any'}
                        onChange={() => setPropertyType('any')} 
                    /> Any
                </label>
            </fieldset>

            <fieldset>
                <legend>Price Range:</legend>
                <input 
                    type="number" 
                    placeholder="Min Price" 
                    value={minPrice} 
                    onChange={(e) => setMinPrice(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="Max Price" 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(e.target.value)} 
                />
            </fieldset>

            <fieldset>
                <legend>Date Range:</legend>
                <label>After:</label>
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                />
                <br />
                <label>Before:</label>
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                />
            </fieldset>

            <button type="submit">Search</button>
        </form>
    );
};

export default PropertySearchForm;