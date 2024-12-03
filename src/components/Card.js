import React from "react";

const Card = ({property}) => {
    return(
        <div className = "card">
            <img src = {property.url}
            alt = {property.id} className = "property-cover"/>
            <div className="card-body">
                <h3>{property.id}</h3>
                <p>{property.type}</p>
                <p>{property.price}</p>
            </div>
        </div>
    );
};

export default Card;