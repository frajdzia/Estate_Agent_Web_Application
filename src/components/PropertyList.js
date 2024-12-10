import React from 'react';
import Card from './Card';

const PropertyList = ({properties, handleAddToFavourites, handleRemoveFromFavourites, favourites, handlePropertyClick}) => {
    
    const handleDragStart = (e, property) => {
        e.dataTransfer.setData('property', JSON.stringify(property));
    };
    
    return(
        <>
        <h2>property List</h2>
        <div className='card-container'>
            {properties.map((property)=>{
                const isFavourite = favourites.some((favourite) => favourite.id === property.id);
                return(
                    <div key={property.id} className='property-item'>
                        <div draggable onDragStart={(e) => handleDragStart(e, property)} className = "drag-handle">
                        <Card property={property}
                        handlePropertyClick={handlePropertyClick}  // Pass the function here
                         />
                        </div>
                        <button
                            onClick={() => {
                                if (isFavourite) {
                                handleRemoveFromFavourites(property); // Remove from favorites if it's already there
                                } else {
                                handleAddToFavourites(property); // Add to favorites if it's not there
                                }
                            }}
                            >
                            {isFavourite ? "Remove from favorite" : "Add to favorite"}
                        </button>
                    </div>
                );
            })}
        </div>
        </>
    );
};

export default PropertyList;