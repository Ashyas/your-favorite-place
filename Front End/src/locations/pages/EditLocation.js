import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { AuthContext } from "../../shared/contex/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UiElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import "./LocationForm.css";



const EditLocation = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [laodedPlasce, setLoadedPlace] = useState();
    const placeId = useParams().placeId;
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    
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

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/places/${placeId}`
                );
                setLoadedPlace(responseData.place);
                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    }
                }, true);     
            } catch (error) { }
        } 
        fetchPlace();
    }, [sendRequest, placeId, setFormData]);


    const submitEditHandler = async (event) => {
      event.preventDefault();
      try {
        await sendRequest(
            `http://localhost:5000/api/places/${placeId}`,
            "PATCH",
            JSON.stringify({
              title: formState.inputs.title.value,
              description: formState.inputs.description.value,
            }),
            {
              "Content-Type": "application/json",
            }
        );
        navigate('/' + auth.userId + '/places');
      } catch (error) {}
    };

    if(!laodedPlasce && !error){
        return (
        <div className="center">
            <Card>
                <h2>Could not find the location </h2>
            </Card>
        </div>);
    }


    return (
        <React.Fragment>
            <ErrorModal error={error} onCleaar={clearError} />
            {isLoading && 
            <div className="center">
                <LoadingSpinner  asOverlay/>
            </div> }
            {!isLoading && laodedPlasce &&
            <form className="place-form" onSubmit={submitEditHandler}>
                <Input 
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Enter a valid title"
                    onInput={inputHandler}
                    initialValue={laodedPlasce.title}
                    initialValid={true} 
                />
                <Input 
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Enter a valid description! min 5 characters"
                    onInput={inputHandler}
                    initialValue={laodedPlasce.description}
                    initialValid={true} 
                />
                <Button type="submit" disabled={!formState.isValid}>Update Location</Button>
                <Button danger to="/users"> Cencel </Button>
            </form>}
        </React.Fragment>
    );
}

export default EditLocation;