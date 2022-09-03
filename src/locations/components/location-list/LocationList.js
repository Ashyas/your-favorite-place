import React from "react";

import "./LocationList.css"
import Card from "../../../shared/components/UiElements/Card"
import LocationItem from "../location-item/LocationItem";
import Button from "../../../shared/components/FormElements/Button";

const LocationList = props => {
    if(props.items.length === 0){
        return (
            <div className="place-list center">
                <Card>
                    <h2>No Location Found maybe create on?</h2>
                    <Button to="/places/new"> Share a Place</Button>
                </Card>
            </div>
        );
    }
    return (
      <ul className="place-list">
        {props.items.map((location) => {
          return (
            <LocationItem
              key={location.id}
              id={location.id}
              image={location.imageUrl}
              title={location.title}
              description={location.description}
              address={location.address}
              creatorId={location.creator}
              coordinates={location.coordinates}
            />
          );
        })}
      </ul>
    );
}

export default LocationList;