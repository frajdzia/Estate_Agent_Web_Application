import React, { useState } from "react";
import DatePicker from "react-widgets/DatePicker";
import NumberPicker from "react-widgets/NumberPicker";
import DropdownList from "react-widgets/DropdownList";

function PropertySearchForm({ onSearch }) {
  const [postcode, setPostcode] = useState("");
  const [propertyType, setPropertyType] = useState("Any");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [minBed, setMinBed] = useState();
  const [maxBed, setMaxBed] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      postcode,
      propertyType,
      minBed,
      maxBed,
      minPrice,
      maxPrice,
      startDate,
      endDate,
    });
  };

  return (
    <div className="form-wrapper">
    <h3>Find Property By:</h3>
    <form onSubmit={handleSubmit} className="form-inputs-container">
        <div>
        <div>
          <div>Postcode:</div>
          <fieldset>
            <input
              type="text"
              placeholder="Enter the postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </fieldset>
        </div>
        <div>
          <div>Type of Property:</div>
          <fieldset>
            <DropdownList
              className="type-of-property"
              defaultValue="Any"
              data={["House", "Flat", "Any"]}
              value={propertyType}
              onChange={(e) => setPropertyType(e === "Any" ? "" : e)}
            />
          </fieldset>
        </div>
        </div>
        <div>
          <div>Bedrooms:</div>
          <fieldset className="double-form-field-container">
            <NumberPicker
              placeholder="Min bedrooms"
              value={minBed}
              onChange={(e) => setMinBed(e)}
            />
            <NumberPicker
              placeholder="Max bedrooms"
              value={maxBed}
              onChange={(e) => setMaxBed(e)}
            />
          </fieldset>
        </div>
        <div>
          <div>Price Range:</div>
          <fieldset className="double-form-field-container">
            <NumberPicker
              placeholder="Min Price"
              value={minPrice}
              format={{ style: "currency", currency: "GBP" }}
              onChange={(e) => setMinPrice(e)}
            />
            <NumberPicker
              placeholder="Max Price"
              value={maxPrice}
              format={{ style: "currency", currency: "GBP" }}
              onChange={(e) => setMaxPrice(e)}
            />
          </fieldset>
        </div>

        <div>
          <div>Date Range:</div>
          <fieldset className="double-form-field-container">
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
    </form>
    <button type="submit">Search</button></div>
  );
}

export default PropertySearchForm;
