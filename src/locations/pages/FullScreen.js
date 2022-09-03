import React, {useState} from "react";

import LocationItem from "../components/location-item/LocationItem";


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
                <div style={{justifyContent:"center" }}>
                    <button >X
                        <img src={props.value.image}  alt={props.value.title} width="850px" height="750px"/>
                    </button>
                </div>
            </main> 
        </React.Fragment>
    );
}

export default FullScreen;