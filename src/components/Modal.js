import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Modal = ({ property, handleCloseModal }) => {
  // track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  //track current tab
  const [activeTab, setActiveTab] = useState("description");

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
        <button className="close-btn" onClick={handleCloseModal}>
          Close
        </button>
        <h2 id="modal-header">{property.id}</h2>

        <div>
          {/* Property images slider */}
          <div className="image-slider">
            <button className="arrow prev" onClick={prevImage}>
              &lt;
            </button>
            <img
              src={property.images[currentImageIndex]}
              alt={`Property Image ${currentImageIndex + 1}`}
              className="property-image"
            />
            <button className="arrow next" onClick={nextImage}>
              &gt;
            </button>
          </div>

          {/* All property images */}
          <div className="additional-images">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property Image ${index + 1}`}
                className={`additional-image ${
                  currentImageIndex === index ? "selected" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>

        <p>
          <strong>Type:</strong> {property.type}
        </p>
        <p>
          <strong>Bedrooms:</strong> {property.bedrooms}
        </p>
        <p>
          <strong>Price:</strong> £{property.price.toLocaleString()}
        </p>
        <p>
          <strong>Location:</strong> {property.location}
        </p>
        <p>
          <strong>About:</strong> {property.info}
        </p>

        {/* Tab Content */}
        <Tabs>
          <TabList>
            <Tab>Description</Tab>
            <Tab>Floor plan</Tab>
            <Tab>View on map</Tab>
          </TabList>

          <TabPanel>
            <p>{property.description}</p>
          </TabPanel>
          <TabPanel>
            <img
              src={property.floorplan}
              alt={`Property floor plan`}
              className="property-image"
            />
          </TabPanel>
          <TabPanel>
            <iframe
              src={property.map}
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Modal;
