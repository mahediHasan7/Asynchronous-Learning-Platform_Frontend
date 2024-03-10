import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import Button from '../../Shared/components/FormElements/Button';
import Input from '../../Shared/components/FormElements/Input';
import Card from '../../Shared/components/UIElements/Card';
import { useForm } from '../../Shared/hooks/form-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../Shared/util/validators';
import './NewPlace.css';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../Shared/context/AuthContext';

const EditPlace = (props) => {
  const [place, setPlace] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoading1, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const placeId = useParams().placeId;

  const initialState = {
    inputs: {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    isFormValid: false,
  };

  const [formState, inputHandler, setValuesAfterFound] = useForm(
    initialState.inputs,
    initialState.isFormValid
  );

  // ! Calling directly is bad as whenever this components renders, this function triggers
  // ! whenever this function triggers -> it dispatch the action from useForm custom hook
  // ! That triggers the form reducer function -> It produce a new state
  // !  even the data is same in the new state, the component that use the reducer also re-render -> this makes a loop
  /*
   * to prevent this loop, useEffect can be used.In only runs first time.and the dependencies are not going to change.stateAfterFoundThePlace is always be the same
   * setValuesAfterFound() function is inside the useCallback (in useForm)
   */

  // Get the place to be updated from the database
  useEffect(() => {
    let stateAfterFoundThePlace;
    const getPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );

        setPlace(responseData);

        stateAfterFoundThePlace = {
          inputs: {
            title: {
              value: responseData.title,
              isValid: true,
            },
            description: {
              value: responseData.description,
              isValid: true,
            },
          },
          isFormValid: true,
        };

        setValuesAfterFound(
          stateAfterFoundThePlace.inputs,
          stateAfterFoundThePlace.isFormValid
        );

        setIsLoading(false);
      } catch (error) {}
    };
    getPlace();
  }, [sendRequest, placeId]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    // Update the place in the database
    const updatePlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`,
          'PATCH',
          JSON.stringify({
            name: formState.inputs.title.value,
            description: formState.inputs.description.value,
          }),
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.loggedInUser.token,
          }
        );

        navigate(`/${responseData.place.creator}/places`);
      } catch (error) {
        console.log(error.message);
      }
    };
    updatePlace();
  };

  if (isLoading) {
    return (
      <div className="center">
        <Card>
          <p>Loading...</p>
        </Card>
      </div>
    );
  }

  if (!place && !error) {
    return (
      <div className="center">
        <Card>
          <p>No Place found!</p>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <form className="place-form" onSubmit={formSubmitHandler}>
        <Input
          id={'title'}
          type="text"
          element="input"
          label="Title"
          errorText="Please enter a valid title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialIsValid={formState.inputs.title.isValid}
        />

        <Input
          id="description"
          element="description"
          label="Description"
          errorText="Please enter minimum 5 characters"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialIsValid={formState.inputs.description.isValid}
        />

        <Button type="submit" disabled={!formState.isFormValid}>
          Update place
        </Button>
      </form>
    </React.Fragment>
  );
};

export default EditPlace;
