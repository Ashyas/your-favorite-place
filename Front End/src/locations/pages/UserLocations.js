import React, {useEffect, useState, useContext} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";


import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import LocationList from "../components/location-list/LocationList";
import { AiOutlineArrowLeft, AiOutlinePlus } from 'react-icons/ai';
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/contex/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UiElements/Card";


const UserLocations = () => {
    
    const [isHomePage, setHomePage] = useState(false);
    const [loadedPlaces, setLoadedPlaces] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    
    const auth = useContext(AuthContext);
    const userId = useParams().userId;
    const navigate = useNavigate();
    const currPath = useLocation();

    
        useEffect( () => {
            currPath.pathname === "/" ? setHomePage(true) : setHomePage(false);
            const fetchPlaces = async () => {
                try {
                    const responseData = await sendRequest(
                        `http://localhost:5000/api/places/user/${userId}`
                    );
                    setLoadedPlaces(responseData.places);
                } catch (error) {}
            }
            fetchPlaces();
        }, [sendRequest, currPath]);
  

    const placeDeleteHandler = deletedPlaceId => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
    }

    const backHandler = () =>{
        navigate('/users');
    }
  
    
    return (
      <React.Fragment>

        <div style={{margin: "20px"}}>
            {!isHomePage && (
            <span style= {{cursor: "pointer"}} onClick={backHandler}>
                <AiOutlineArrowLeft /> Back
            </span>
            )}
        </div>

        {!isHomePage && loadedPlaces && (
          <div className="center">
            <Button inverse to="../places/new">
              <AiOutlinePlus /> Add New
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedPlaces && (
          <LocationList
            items={loadedPlaces}
            onDeletePlace={placeDeleteHandler}
          />
        )}

        {(auth.userId === userId && !isLoading && !loadedPlaces && (
          <div className="place-list center">
            <Card>
              <h2>No Location Found maybe create on?</h2>
              <Button to="/places/new"> Share a Place</Button>
            </Card>
          </div>
        )) ||
          (!isLoading && !loadedPlaces && (
            <div className="center">
              <Card>
                <h2>No Places Found For This User!</h2>
              </Card>
            </div>
          ))}
      </React.Fragment>
    ); 
}
export default UserLocations;