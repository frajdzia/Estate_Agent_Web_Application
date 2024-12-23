import React from 'react';
import Card from './Card';

const PropertyList = ({properties, handleAddToFavorites, handleRemoveFromFavorites, favorites, handlePropertyClick}) => {
    
    const handleDragStart = (e, property) => {
        e.dataTransfer.setData('property', JSON.stringify(property));
    };
    
    return(
        <>
        <div className='card-container'>
            {properties.map((property)=>{
                const isFavorite = favorites.some((favorite) => favorite.id === property.id);
                return(
                    <div key={property.id} className='property-item'>
                        <div draggable onDragStart={(e) => handleDragStart(e, property)} className = "drag-handle">
                        <Card property={property}
                        handlePropertyClick={handlePropertyClick}  // Pass the function here
                         />
                        </div>
                        <button
                            onClick={() => {
                                if (isFavorite) {
                                handleRemoveFromFavorites(property); // Remove from favorites if it's already there
                                } else {
                                handleAddToFavorites(property); // Add to favorites if it's not there
                                }
                            }}
                            >
                            {isFavorite ? "Remove from favorite" : "Add to favorite"}
                        </button>
                    </div>
                );
            })}
        </div>
        </>
    );
};

export default PropertyList;