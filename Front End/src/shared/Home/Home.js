import React, { useState, useEffect} from "react";

import LocationList from "../../locations/components/location-list/LocationList";
import LoadingSpinner from "../components/UiElements/LoadingSpinner";
import ErrorModal from "../components/UiElements/ErrorModal";
import { useHttpClient } from "../hooks/http-hook";
import Card from "../components/UiElements/Card";
import "./Home.css"


const Home = () => {

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const responseData = await sendRequest('http://localhost:5000/api/places');
            setLoadedPlaces(responseData.places);
            if(responseData.places.length === 0) {
                setIsEmpty(true);
            }
          } catch (error) {}
        }
        fetchUsers();
      }, [sendRequest]
    );


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {
                isLoading && 
                (<LoadingSpinner asOverlay />)
            }
            <div className="center" >
                <h2> Places Feed </h2>
            </div>
            <div className="news-line"><hr></hr></div>
            {
                isEmpty && (
                <div style={{margin:"100px" }}>
                    <h3 className="center"> No Data Found </h3>
                </div>)
            }
            <Card>
                <div>
                    <LocationList items={loadedPlaces}/>
                </div>
            </Card>
        </React.Fragment>
    );
} 

export default Home;