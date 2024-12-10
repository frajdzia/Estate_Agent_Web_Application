import React from 'react';

const Modal = ({ property, handleCloseModal }) => {
    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={handleCloseModal}>Close</button>
                <h2>{property.id}</h2>
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Description:</strong> {property.description}</p>
                <img src={property.images[0]} className="property-image" />
                <p><a href={property.floorplan} target="_blank" rel="noopener noreferrer">View Floor Plan</a></p>
                <div className="additional-images">
                    {Object.values(property.images).map((image, index) => (
                        <img key={index} src={image} alt={`Property Image ${index + 1}`} className="additional-image" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
