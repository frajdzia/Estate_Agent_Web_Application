import React from "react";
import Card from './Card';

const FavoriteList = ({ favorites, handleClearFavorites, handlePropertyClick, setFavorites }) => {
    // Handle drop event to add or remove properties from favorites when dropped to fav block
    const handleDrop = (e) => {
        e.preventDefault();
        const property = JSON.parse(e.dataTransfer.getData('property')); 
        const updatedFavorites = [...favorites];
        const isAlreadyFavorite = !!updatedFavorites.find(item => item.id === property.id);
        
        if (isAlreadyFavorite) {
            return;
        } 
            
        updatedFavorites.push(property);
        setFavorites(updatedFavorites);
    
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };
    
    const handleDragStart = (e, favorite) => {
        e.dataTransfer.setData('favorite', JSON.stringify(favorite));
    };

    return (
        <div className="favorite-list" onDrop={handleDrop} onDragOver={handleDragOver}>
            <h2>Favorite Properties
                <button onClick={() => handleClearFavorites([])}>Erase Favorite List</button>
            </h2>
            <div className = "card-container-right">
                {favorites.length > 0 ? (
                    favorites.map((favorite) => (<div key={favorite.id} className = "drag-handle" draggable onDragStart={(e) => handleDragStart(e, favorite)}>
                        <Card property={favorite} 
                            handlePropertyClick={handlePropertyClick}  // Pass the function here
                        />
                        </div>
                    ))
                ) : (
                    <p>No favorite properties added yet.</p>
                )}
            </div>
        </div>
    );
};

export default FavoriteList;
