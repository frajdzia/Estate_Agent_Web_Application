import React, { useState } from 'react';

const Modal = ({ property, handleCloseModal }) => {
    // track the current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to go to next image
    const nextImage = () => {
        if (currentImageIndex < property.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            setCurrentImageIndex(0); // Loop back to the first image
        }
    };

    // Function to go to previous image
    const prevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        } else {
            setCurrentImageIndex(property.images.length - 1); // Loop to the last image
        }
    };

    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={handleCloseModal}>Close</button>
                <h2>{property.id}</h2>
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Description:</strong> {property.description}</p>

                {/* image slider */}
                <div className="image-slider">
                    <button className="arrow prev" onClick={prevImage}>&lt;</button>
                    <img src={property.images[currentImageIndex]} alt={`Property Image ${currentImageIndex + 1}`} className="property-image" />
                    <button className="arrow next" onClick={nextImage}>&gt;</button>
                </div>

                <div className="additional-images">
                    {property.images.map((image, index) => (
                        <img key={index} src={image} alt={`Property Image ${index + 1}`} className="additional-image" />
                    ))}
                </div>

                <p><a href={property.floorplan} target="_blank" rel="noopener noreferrer">Long Description</a></p>
                <p><a href={property.floorplan} target="_blank" rel="noopener noreferrer">Floor Plan</a></p>
                <p><a href={property.floorplan} target="_blank" rel="noopener noreferrer">View On Map</a></p>
            </div>
        </div>
    );
};

export default Modal;
