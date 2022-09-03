import React from "react";
import UsersList from "../components/users-list/UsersList";

const Users = () => {
    const USERS = [
      {
        id: "u1",
        name: "Bob Mike",
        image: "https://wallpaperaccess.com/full/4184338.jpg",
        places: 1,
      },
      {
        id: "u2",
        name: "Ash Yas",
        image: "https://media.istockphoto.com/photos/remote-working-and-enjoying-bleisure-time-at-lake-faak-in-austria-picture-id1267146924?b=1&k=20&m=1267146924&s=170667a&w=0&h=uHET16y6ZLoarF95NXKWbLessjvVlum3gdrC5WwDRhw=",
        places: 2,
      },
      {
        id: "u3",
        name: "Joe Thomas",
        image: "https://st2.depositphotos.com/2115371/5465/i/600/depositphotos_54656253-stock-photo-the-river-trip.jpg",
        places: 1,
      },

    ];

    return (
        <UsersList items={USERS} />
    );
};

export default Users;