import React, {useState, useContext} from "react";

import './Auth.css';
import Card from "../../../shared/components/UiElements/Card";
import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { AuthContext } from "../../../shared/contex/auth-context";


const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const authSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }

    const onSwitchModeHandler = () => {
        if(!isLoginMode){
            setFormData(
            {
                ...formState.inputs,
                name: undefined
            }, 
            formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else{
            setFormData(
            {
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setLoginMode(prev => !prev);
    }

    return (
        <Card className="authentication">
            <h2> { isLoginMode ? "Login" : "Sign Up" } </h2><hr/>
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode &&
                    <Input 
                        element="input"
                        type="text"
                        id="name"
                        label="Full Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name"
                        onInput={inputHandler}
                    />    
                }
                <Input 
                    element="input"
                    id="email"
                    label="E-Mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email"
                    onInput={inputHandler}
                />
                <Input 
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a valid password. min 6 characters"
                    onInput={inputHandler}
                />
                <Button disabled={!formState.isValid} type="submit">{ !isLoginMode? "Sign Up" : "Login" }</Button>
            </form>
            <Button inverse onClick={onSwitchModeHandler}>Switch to { isLoginMode? "Sign Up" : "Login" }</Button>
        </Card>
    );
}

export default Auth;