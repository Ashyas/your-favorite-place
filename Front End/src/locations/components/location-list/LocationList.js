import React from "react";

import LocationItem from "../location-item/LocationItem";
import "./LocationList.css";


const LocationList = props => {
  
  return (
    <React.Fragment>
      <div>       
        <ul className="place-list">
          {props.items?.length > 0 &&
            props.items.map((location) => {
            return (
              <LocationItem
                key={location.id}
                id={location.id}
                image={location.image}
                title={location.title}
                description={location.description}
                address={location.address}
                creatorId={location.creator}
                coordinates={location.coordinates}
                onDelete={props.onDeletePlace}
              />
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default LocationList;