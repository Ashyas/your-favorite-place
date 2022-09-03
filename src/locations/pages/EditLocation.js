import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import "./LocationForm.css";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UiElements/Card";

const STATIC_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous buildings in the world',
        imageUrl: 'https://embriture.org/wp-content/uploads/2021/09/Burj-portrait-lagre_tcm25-475749.jpg',
        address: '1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates',
        coordinates: {
            lat: 25.1972018,
            lng: 55.2721824
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous buildings in the world',
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
        title: 'Empire State Building',
        description: 'One of the most famous buildings in the world',
        imageUrl: 'https://embriture.org/wp-content/uploads/2021/09/Burj-portrait-lagre_tcm25-475749.jpg',
        address: '1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates',
        coordinates: {
            lat: 25.1972018,
            lng: 55.2721824
        },
        creator: 'u2'
    },
];

const EditLocation = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;

    
    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    const identifiedLocation = STATIC_PLACES.find(p => p.id === placeId);

    useEffect(() => {
        if(identifiedLocation){
            setFormData({
                title: {
                    value: identifiedLocation.title,
                    isValid: true
                },
                description: {
                    value: identifiedLocation.description,
                    isValid: true
                }
            }, true);
        }
        setIsLoading(false);
    }, [setFormData, identifiedLocation]);

    const submitEditHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if(!identifiedLocation){
        return <Card>Could not find the location </Card>;
    }

    if(isLoading){
        return <h2> Loading... </h2>;

    }

    return (
        <form className="place-form" onSubmit={submitEditHandler}>
            <Input 
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a valid title"
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid} 
            />
            <Input 
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Enter a valid description! min 5 characters"
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid} 
            />
            <Button type="submit" disabled={!formState.isValid}>Update Location</Button>
        </form>
    );
}

export default EditLocation;