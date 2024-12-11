import React from "react";
import Card from './Card';

const FavouriteList = ({ favourites, handleClearFavourites, setFavourites }) => {
    // Handle drop event to add or remove properties from favourites when dropped to fav block
    const handleDrop = (e) => {
        e.preventDefault();
        const property = JSON.parse(e.dataTransfer.getData('property')); 
        const updatedFavourites = [...favourites];
        const index = updatedFavourites.findIndex(item => item.id === property.id);
        
        if (index !== -1) {
            updatedFavourites.splice(index, 1);
        } else {
            updatedFavourites.push(property);
        }
        
        setFavourites(updatedFavourites);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className="favourite-list" onDrop={handleDrop} onDragOver={handleDragOver}>
            <h2>Favourite Properties
                <button onClick={() => handleClearFavourites([])}>Erase Favourite List</button>
            </h2>
            <div className="card-container">
                {favourites.length > 0 ? (
                    favourites.map((property) => (
                        <Card key={property.id} property={property} />
                    ))
                ) : (
                    <p>No favorite properties added yet.</p>
                )}
            </div>
            <hr />
        </div>
    );
};

export default FavouriteList;
