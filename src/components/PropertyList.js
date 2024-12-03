import React from 'react';
import Card from './Card';

const PropertyList = ({properties, handleAddToFavourites, favourites}) => {
    
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
                        <Card property={property} />
                        </div>
                        <button onClick ={()=> handleAddToFavourites(property)} disabled={isFavourite}>
                        {isFavourite ? "Already in Favs" : "Add to Favs"}
                        </button>
                    </div>
                );
            })}
        </div>
        </>
    );
};

export default PropertyList;