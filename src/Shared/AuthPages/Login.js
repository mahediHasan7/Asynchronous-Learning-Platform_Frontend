import React, { useContext, useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import Button from '../components/FormElements/Button';
import ImageUpload from '../components/FormElements/ImageUpload';
import Input from '../components/FormElements/Input';
import Card from '../components/UIElements/Card';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PHONE,
  VALIDATOR_REQUIRE,
} from '../util/validators';
import SignUp from './Signup';
import logo from '../../Shared/components/Navigation/components/logo/AsynchronousLogo.png';

import './Signup.css';
import { useHttpClient } from '../hooks/http-hook';

const Login = (props) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [errorText, setErrorText] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(AuthContext);
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

  const emailValid = authState.inputs.email.isValid;
  const passwordValid = authState.inputs.password.isValid;

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const email = authState.inputs.email.value;
    const password = authState.inputs.password.value;

    // ! Student login
    try {
      const responseDataStudent = await sendRequest(
        `http://localhost:5000/api/student/login`,
        'POST',
        JSON.stringify({
          email,
          password,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      auth.login_asynchronous(
        responseDataStudent.token,
        responseDataStudent.user
      );
    } catch (error) {
      setErrorMessage((prevState) => {
        const tempErrors = [...prevState];
        tempErrors.push(error.message);
        return tempErrors;
      });

      console.log(error.message);
    }

    // ! Educator login
    try {
      const responseDataEducator = await sendRequest(
        `http://localhost:5000/api/educator/login`,
        'POST',
        JSON.stringify({
          email,
          password,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      auth.login_asynchronous(
        responseDataEducator.token,
        responseDataEducator.user
      );
    } catch (error) {
      setErrorMessage((prevState) => {
        const tempErrors = [...prevState];
        tempErrors.push(error.message);
        return tempErrors;
      });
      console.log(error.message);
    }

    // ! Admin login
    try {
      const responseDataAdmin = await sendRequest(
        `http://localhost:5000/api/admin/login`,
        'POST',
        JSON.stringify({
          email,
          password,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      auth.login_asynchronous(responseDataAdmin.token, responseDataAdmin.user);
    } catch (error) {
      setErrorMessage((prevState) => {
        const tempErrors = [...prevState];
        tempErrors.push(error.message);
        return tempErrors;
      });
      console.log(error.message);
    }

    // ! Parent login
    try {
      const responseDataParent = await sendRequest(
        `http://localhost:5000/api/parent/login`,
        'POST',
        JSON.stringify({
          email,
          password,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      auth.login_asynchronous(
        responseDataParent.token,
        responseDataParent.user
      );
    } catch (error) {
      setErrorMessage((prevState) => {
        const tempErrors = [...prevState];
        tempErrors.push(error.message);
        return tempErrors;
      });
      console.log(error.message);
    }

    setTimeout(() => {
      setErrorMessage([]);
    }, 3000);
  };

  const createNewUserHandler = () => {
    setShowSignUp(true);
  };

  return (
    <React.Fragment>
      {!showSignUp && (
        <Card className="sign-up-card">
          <div className="sign-up-card__logo-container">
            <img
              className="sign-up-card_asynchronous-logo"
              src={logo}
              alt="ASYNCHRONOUS LEARNING PLATFORM LOGO"
            />

            <p className="sign-up-card__title">
              <span>ASYNCHRONOUS</span>
              <span>LEARNING</span>
              <span>PLATFORM</span>
            </p>
          </div>
          <form onSubmit={formSubmitHandler} className="sign-up-form">
            <div
              className="sign-up-form-input-container"
              style={{ marginTop: '2rem' }}
            >
              <Input
                element="input"
                id="email"
                type="email"
                label="Email"
                onInput={inputHandler}
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email!"
                placeholder="abc@xyz.com"
              />
              <Input
                element="input"
                id="password"
                type="text"
                label="Password"
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(4)]}
                errorText="Password need to be more than 4 characters!"
                placeholder="minimum 4 characters"
              />

              {errorMessage.length > 0 && emailValid && passwordValid && (
                <p style={{ color: '#f34343', margin: '0' }}>
                  {errorMessage.includes('Invalid password!')
                    ? 'Invalid password!'
                    : errorMessage.includes('User is not registered!')
                    ? 'User is not registered!'
                    : ''}
                </p>
              )}

              <Button
                className="sign-up-button"
                type="submit"
                disabled={!authState.isFormValid}
                inverse
              >
                LOGIN
              </Button>

              <Button
                className="sign-up-button create-new-user-btn"
                type="button"
                disabled={authState.isFormValid}
                onClick={createNewUserHandler}
              >
                SIGNUP
              </Button>
            </div>
          </form>
        </Card>
      )}

      {showSignUp && <SignUp />}
    </React.Fragment>
  );
};

export default Login;
