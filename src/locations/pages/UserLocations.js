import React from "react";
import { useParams } from "react-router-dom";

import LocationList from "../components/location-list/LocationList";

const STATIC_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous buildings in the world',
        imageUrl: 'https://www.stockvault.net/data/2020/01/22/272769/preview16.jpg',
        address: 'New York, NY 10001, USA',
        coordinates: {
            lat: 40.7485492,
            lng: -73.9857635
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'The tallest building in the world!',
        imageUrl: 'https://embriture.org/wp-content/uploads/2021/09/Burj-portrait-lagre_tcm25-475749.jpg',
        address: '1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates',
        coordinates: {
            lat: 25.1972018,
            lng: 55.2721824
        },
        creator: 'u2'
    },
    {
        id: 'p3',
        title: 'Machu Picchu',
        description: 'A large 15th-century Inca city',
        imageUrl: 'https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg',
        address: 'Machu Picchu, Peru',
        coordinates: {
            lat: -13.1631412,
            lng: -72.5471516
        },
        creator: 'u2'
    },
    {
        id: 'p4',
        title: 'The Dead Sea',
        description: 'Lowest point on Earth, a salt-rich lake surrounded by desert beaches and mineral',
        imageUrl: 'https://www.onthegotours.com/blog/wp-content/uploads/2019/03/Aerial-view-of-the-Dead-Sea.jpg',
        address: 'Dead Sea, Israel',
        coordinates: {
            lat: 31.1635756,
            lng: 35.3671583
        },
        creator: 'u3'
    },
];
const UserLocations = () => {

    const userId = useParams().userId;
    const loadedUser = STATIC_PLACES.filter(places => places.creator === userId);
    
    return <LocationList items={loadedUser}/>
}
export default UserLocations;