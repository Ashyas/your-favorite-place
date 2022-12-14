import React, { useState, useContext } from "react";

import LoadingSpinner from "../../../shared/components/UiElements/LoadingSpinner";
import ImageUplaod from "../../../shared/components/FormElements/ImageUplaod";
import ErrorModal from "../../../shared/components/UiElements/ErrorModal";
import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import { AuthContext } from "../../../shared/contex/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Card from "../../../shared/components/UiElements/Card";
import { useForm } from "../../../shared/hooks/form-hook";
import "./Auth.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";


const Auth = () => {
  
  const auth = useContext(AuthContext);
  const [isLoginMode, setLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    const userEmail = formState.inputs.email.value;
    const userPassword = formState.inputs.password.value;
    let responseData;

    if (isLoginMode) {
      try {
        responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: userEmail,
            password: userPassword,
          }),
          {
            "content-Type": "application/json",
          }
        );
      } catch (error) {}
    } else {
      try {
        const userName = formState.inputs.name.value;
        const userImage = formState.inputs.image.value;

        const formData = new FormData();
        formData.append('name', userName);
        formData.append('email', userEmail);
        formData.append('password', userPassword);
        formData.append('image', userImage);

        responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );
      } catch (error) {}
    }
    auth.login(responseData.userId, responseData.token);
  };

  const onSwitchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setLoginMode((prev) => !prev);
  };

  const errorHandler = () => {
    clearError();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2> {isLoginMode ? "Login" : "Sign Up"} </h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              type="text"
              id="name"
              label="Full Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your a name"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUplaod 
              center 
              onInput={inputHandler} 
              id="image"
            />
          )}
          <Input
            element="input"
            type="email"
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
          <Button disabled={!formState.isValid} type="submit">
            {!isLoginMode ? "Sign Up" : "Login"}
          </Button>
        </form>
        <Button inverse onClick={onSwitchModeHandler}>
          Switch to {isLoginMode ? "Sign Up" : "Login"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
