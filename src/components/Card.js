import React from "react";

const Card = ({property, handlePropertyClick}) => {
    return(
        <div className="card" onClick={() => handlePropertyClick(property)}>
            <img src={property.images[0]} alt={property.id} className="property-cover"/>
            <div className="card-body">
                <h3>{property.id}</h3>
                <p>{property.type}</p>
                <p>{property.location}</p>
                <p>{property.price}</p>
            </div>
        </div>
    );
};

export default Card;
