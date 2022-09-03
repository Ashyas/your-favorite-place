import "./LocationForm.css";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const NewLocation = () => {
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

    

    const submitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <form className="place-form" onSubmit={submitHandler}>
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
        </form>
    );
}

export default NewLocation;