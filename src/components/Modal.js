import React, { useState } from 'react';

const Modal = ({ property, handleCloseModal }) => {
    // track the current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    //track current tab
    const [activeTab, setActiveTab] = useState('description');

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

    // Handle thumbnail click to change the main image
    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    // Handle tab click to switch between the content
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={handleCloseModal}>Close</button>
                <h2>{property.id}</h2>

                <div>
            {/* Property images slider */}
            <div className="image-slider">
                <button className="arrow prev" onClick={prevImage}>&lt;</button>
                <img 
                    src={property.images[currentImageIndex]} 
                    alt={`Property Image ${currentImageIndex + 1}`} 
                    className="property-image" 
                />
                <button className="arrow next" onClick={nextImage}>&gt;</button>
            </div>

            {/* All property images */}
            <div className="additional-images">
                {property.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Property Image ${index + 1}`}
                        className={`additional-image ${currentImageIndex === index ? 'selected' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
            </div>
        </div>

                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Description:</strong> {property.info}</p>

                {/* Tab navigation */}
                <div className="tabs">
                    <button
                        className={activeTab === 'description' ? 'active' : ''}
                        onClick={() => handleTabClick('description')}
                    >
                        Long Description
                    </button>
                    <button
                        className={activeTab === 'floorplan' ? 'active' : ''}
                        onClick={() => handleTabClick('floorplan')}
                    >
                        Floor Plan
                    </button>
                    <button
                        className={activeTab === 'map' ? 'active' : ''}
                        onClick={() => handleTabClick('map')}
                    >
                        View On Map
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'description' && (
                        <div>
                            <p>{property.description}</p>
                        </div>
                    )}
                    {activeTab === 'floorplan' && (
                        <div>
                            <img 
                    src={property.floorplan} 
                    alt={`Property floor plan`} 
                    className="property-image" 
                />
                        </div>
                    )}
                    {activeTab === 'map' && (
                        <div>
                            <a href={property.map} target="_blank" rel="noopener noreferrer">
                                View on Google Map
                            </a>
                        </div>
                    )}
                </div>
        </div>
        </div>
    );
};

export default Modal;
