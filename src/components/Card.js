import React from "react";

const Card = ({property, handlePropertyClick}) => {

    // Format the date into a readable format
    const addedDate = new Date(property.added); // Convert the ISO date string into a Date object
    const formattedDate = addedDate.toLocaleDateString('en-GB', { // You can change 'en-GB' to any locale you prefer
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return(
        <div className="card" onClick={() => handlePropertyClick(property)}>
            <img src={property.images[0]} alt={property.id} className="property-cover"/>
            <div className="card-body">
                <h3>{property.id}</h3>
                <div className="card-larger">
                    <p><strong>Type:</strong> {property.type}</p>
                    <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                    <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
                    <p><strong>Location:</strong> {property.location}</p>
                    <p><strong>Added On:</strong> {formattedDate}</p>
                </div>
                <div className="card-favorite">
                    <p>{property.type} • {property.bedrooms} bedrooms • £{property.price.toLocaleString()} • {property.location}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;