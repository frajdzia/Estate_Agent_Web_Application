import React, { useState } from 'react';
import DatePicker from "react-widgets/DatePicker";
import NumberPicker from "react-widgets/NumberPicker";
import DropdownList from "react-widgets/DropdownList";


function PropertySearchForm({ onSearch }) {
    const [postcode, setPostcode] = useState('');
    const [propertyType, setPropertyType] = useState('Any');
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ postcode, propertyType, minPrice, maxPrice, startDate, endDate });
    };

    return (
        <form onSubmit={handleSubmit} >
            <h3>Find Property By:</h3>
            <div className="form-inputs-container">
            <fieldset>
                <div>Postcode:</div>
                <input 
                    type="text" 
                    placeholder="Enter the postcode"
                    value={postcode} 
                    onChange={(e) => setPostcode(e.target.value)} 
                />
            </fieldset>

            <fieldset>
                <div>Type of Property:</div>
                    <DropdownList
                        defaultValue="Any"
                        data={["House", "Flat", "Any"]}
                        value={propertyType}
                        onChange={(e) => setPropertyType(e === "Any" ? '' : e)} 
                    />

            </fieldset>

            <fieldset>
                <div>Price Range:</div>
                <NumberPicker 
                    placeholder="Min Price" 
                    value={minPrice} 
                    format={{style: "currency", currency: "GBP"}}
                    onChange={(e) => setMinPrice(e)} 
                />
                <NumberPicker
                    placeholder="Max Price" 
                    value={maxPrice} 
                    format={{style: "currency", currency: "GBP"}}
                    onChange={(e) => setMaxPrice(e)} 
                />
            </fieldset>

            <fieldset>
                <div>Date Range:</div>
                <DatePicker 
                    placeholder="From"
                    value={startDate} 
                    onChange={(e) => setStartDate(e)} 
                />
                <DatePicker 
                    placeholder="To"
                    value={endDate} 
                    onChange={(e) => setEndDate(e)} 
                />
            </fieldset>
</div>
            <button type="submit">Search</button>
        </form>
    );
};

export default PropertySearchForm;