import React from "react";

const Card = ({property, handlePropertyClick}) => {
    return(
        <div className="card" onClick={() => handlePropertyClick(property)}>
            <img src={property.images[0]} alt={property.id} className="property-cover"/>
            <div className="card-body">
                <h3>{property.id}</h3>
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
                <p><strong>Location:</strong> {property.location}</p>
            </div>
        </div>
    );
};

export default Card;