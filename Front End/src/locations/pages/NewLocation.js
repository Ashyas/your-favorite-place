import React, { useContext } from "react";
import { useNavigate  } from "react-router-dom";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import ImageUplaod from "../../shared/components/FormElements/ImageUplaod";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { AuthContext } from "../../shared/contex/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import "./LocationForm.css";


const NewLocation = () => {
    
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }
    }, false);

    const navigate = useNavigate();

    const submitHandler = async event => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('image', formState.inputs.image.value);
            
            await sendRequest("http://localhost:5000/api/places", 
                "POST",
                formData,
                {
                    Authorization: "Bearer " + auth.token
                }
            );
            navigate('/');
        } catch (error) {}
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
        <br></br>
        <form className="place-form" onSubmit={submitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <Input 
                id="title"
                element="input" 
                type="text" 
                label="Title" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Enter a valid title!" 
                onInput= {inputHandler}
            />
            <Input 
                id="description"
                element="textarea" 
                label="Description" 
                validators={[VALIDATOR_MINLENGTH(5)]} 
                errorText="Enter a valid description! at least 5 characters" 
                onInput= {inputHandler}
            />
            <ImageUplaod 
                id="image" 
                onInput={inputHandler} 
                // errorText="Upload an Image" 
            />
            <Input 
                id="address"
                element="input" 
                label="Address" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Enter a valid address!" 
                onInput= {inputHandler}
            />
            
            <Button type="submit" disabled={!formState.isValid}>Add Place</Button>
            <Button danger to={`../${auth.userId}/places`} >Cancel</Button>
        </form>
        </React.Fragment>
    );
}

export default NewLocation;