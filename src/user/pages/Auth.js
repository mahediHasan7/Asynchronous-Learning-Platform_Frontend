import React, { useContext, useState } from 'react';
import Button from '../../Shared/components/FormElements/Button';
import ImageUpload from '../../Shared/components/FormElements/ImageUpload';
import Input from '../../Shared/components/FormElements/Input';
import Card from '../../Shared/components/UIElements/Card';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../Shared/context/AuthContext';
import { useForm } from '../../Shared/hooks/form-hook';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../Shared/util/validators';
import './Auth.css';

const Auth = (props) => {
  const auth = useContext(AuthContext);

  const [isLogin, setLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState();

  const { isLoading1, error, sendRequest, clearError } = useHttpClient();

  const [authState, inputHandler, setData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchLoginSignup = () => {
    if (!isLogin) {
      setData(
        { ...authState.inputs, name: undefined, image: undefined },
        authState.inputs.email.isValid && authState.inputs.password.isValid
      );
    } else {
      setData(
        {
          ...authState.inputs,
          name: { value: '', isValid: false },
          image: { value: null, isValid: false },
        },
        false
      );
    }
    setLogin((prevState) => !prevState);
  };

  const errorHandler = () => {
    setHasError(null);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    // Sending the request to the backend to signup a new user
    if (!isLogin) {
      try {
        const formData = new FormData();
        formData.append('email', authState.inputs.email.value);
        formData.append('name', authState.inputs.name.value);
        formData.append('password', authState.inputs.password.value);
        formData.append('image', authState.inputs.image.value);

        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        );

        // giving the logged in user for using in other components
        auth.updateLoggedInUser(responseData.user, responseData.token);
        auth.login(responseData.token);
      } catch (error) {
        setHasError(error.message);
        console.log(error.message);
      }
    }

    // Sending the request to the backend for login
    // Did not use the custom hook
    if (isLogin) {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: authState.inputs.email.value,
            password: authState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        // If any response with 400-ish or 500-ish, then this will execute and throw a new error
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        // giving the logged in user for using in other components
        auth.updateLoggedInUser(responseData.user, responseData.token);

        auth.login(responseData.token);
      } catch (error) {
        setIsLoading(false);
        setHasError(error.message);
        console.log(error);
      }
    }
  };

  return (
    <React.Fragment>
      {hasError && <ErrorModal error={hasError} onClear={errorHandler} />}

      <Card className="place-form">
        {isLoading && <p className="center">Loading...</p>}

        <form onSubmit={formSubmitHandler}>
          {!isLogin && <ImageUpload id="image" center onInput={inputHandler} />}
          {!isLogin && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name!"
            />
          )}

          <Input
            element="input"
            id="email"
            type="email"
            label="Email"
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please use a valid email!"
          />
          <Input
            element="input"
            id="password"
            type="text"
            label="Password"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Password need to be more than 6 characters!"
          />
          <Button
            type="submit"
            disabled={!authState.isFormValid}
            // onClick={loginSignupButtonHandler}
          >
            {isLogin ? 'Login' : 'Signup'}
          </Button>
          <Button
            type="button"
            inverse
            onClick={switchLoginSignup}
          >{`Switch to ${isLogin ? 'Signup' : 'Login'}`}</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
