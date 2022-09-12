import React, { useState, useEffect} from "react";

import LocationList from "../../locations/components/location-list/LocationList";
import LoadingSpinner from "../components/UiElements/LoadingSpinner";
import ErrorModal from "../components/UiElements/ErrorModal";
import { useHttpClient } from "../hooks/http-hook";
import Card from "../components/UiElements/Card";
import "./Home.css"

// const STATIC_PLACES = [
//     {
//         id: 'p1',
//         title: 'Empire State Building',
//         description: 'One of the most famous buildings in the world',
//         imageUrl: 'https://www.stockvault.net/data/2020/01/22/272769/preview16.jpg',
//         address: 'New York, NY 10001, USA',
//         coordinates: {
//             lat: 40.7485492,
//             lng: -73.9857635
//         },
//         creator: 'u1'
//     },
//     {
//         id: 'p2',
//         title: 'Burj Khalifa',
//         description: 'The tallest building in the world!',
//         imageUrl: 'https://embriture.org/wp-content/uploads/2021/09/Burj-portrait-lagre_tcm25-475749.jpg',
//         address: '1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates',
//         coordinates: {
//             lat: 25.1972018,
//             lng: 55.2721824
//         },
//         creator: 'u2'
//     },
//     {
//         id: 'p3',
//         title: 'Machu Picchu',
//         description: 'A large 15th-century Inca city',
//         imageUrl: 'https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg',
//         address: 'Machu Picchu, Peru',
//         coordinates: {
//             lat: -13.1631412,
//             lng: -72.5471516
//         },
//         creator: 'u2'
//     },
//     {
//         id: 'p4',
//         title: 'The Dead Sea',
//         description: 'Lowest point on Earth, a salt-rich lake surrounded by desert beaches and mineral',
//         imageUrl: 'https://www.onthegotours.com/blog/wp-content/uploads/2019/03/Aerial-view-of-the-Dead-Sea.jpg',
//         address: 'Dead Sea, Israel',
//         coordinates: {
//             lat: 31.1635756,
//             lng: 35.3671583
//         },
//         creator: 'u3'
//     },
// ];

const Home = () => {

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const responseData = await sendRequest('http://localhost:5000/api/places');
            setLoadedPlaces(responseData.places)
          } catch (error) {
          }
        }
        fetchUsers();
      }, [sendRequest]);


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <LoadingSpinner asOverlay />
            )}
            <div className="center" >
                <h2> Pictures Feed </h2>
            </div>
            <div className="news-line"><hr></hr></div>
            <Card>
                <div>
                    <LocationList items={loadedPlaces}/>
                </div>
            </Card>
        </React.Fragment>
    );
} 

export default Home;