import React, { useContext } from "react";
import { useNavigate  } from "react-router-dom";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
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
        }
    }, false);

    const navigate = useNavigate();

    const submitHandler = async event => {
        event.preventDefault();
        try {
            
            await sendRequest("http://localhost:5000/api/places", "POST",
                JSON.stringify({
                    title:formState.inputs.title.value,
                    description:formState.inputs.description.value,
                    address:formState.inputs.address.value,
                    creator: auth.userId
                }),
                {
                    "Content-type": "application/json"
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