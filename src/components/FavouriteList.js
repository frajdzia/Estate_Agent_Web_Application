import React from "react";
import Card from './Card';

const FavouriteList = ({favourites, handleClearFavourites}) => {
    return(
        <div>
            <h2>Favourite properties
                <button onClick = {handleClearFavourites}>Erase Favourite List</button>
                
            </h2>
            <div className = "card-container">
                {favourites.map((property)=> (
                    <Card key={property.id} property = {property}/>
                ))}
            </div>
            <hr />
        </div>
    )
}
export default FavouriteList;