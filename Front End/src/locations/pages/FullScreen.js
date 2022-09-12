import React, {useState} from "react";

import LocationItem from "../components/location-item/LocationItem";
import "./FullScreen.css"


const FullScreen = props =>{

    const [fullImage, setOff] = useState(true);

    const exitImage = () => {
        setOff(false);
    }

    if(!fullImage){
        return (
            <LocationItem  
                key={props.value.id}
                id={props.value.id}
                image={props.value.image}
                title={props.value.title}
                description={props.value.description}
                address={props.value.address}
                creatorId={props.value.creator}
                coordinates={props.value.coordinates}   
            />
        );
    }
    
    return (
      <React.Fragment>
        <main onClick={exitImage}>
          <div className="full-size">
            <label>{props.value.title}</label><br></br>
            <img
              src={props.value.image}
              alt={props.value.title + " Picture"}
              className="img-style"
            />
          </div>
        </main>
      </React.Fragment>
    );
}

export default FullScreen;