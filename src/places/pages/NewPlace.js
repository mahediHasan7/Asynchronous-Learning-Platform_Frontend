import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Shared/components/FormElements/Button';
import ImageUpload from '../../Shared/components/FormElements/ImageUpload';
import Input from '../../Shared/components/FormElements/Input';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../Shared/context/AuthContext';
import { useForm } from '../../Shared/hooks/form-hook';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../Shared/util/validators';
import './NewPlace.css';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

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
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    isFormValid: false,
  };

  const [formState, inputHandler] = useForm(
    initialState.inputs,
    initialState.isFormValid
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const newPlaceFormHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', formState.inputs.title.value);
    formData.append('description', formState.inputs.description.value);
    formData.append('address', formState.inputs.address.value);
    formData.append('creator', auth.loggedInUser.user.id);
    formData.append('image', formState.inputs.image.value);
    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/places/',
        'POST',
        formData,
        { Authorization: 'Bearer ' + auth.loggedInUser.token }
      );
    } catch (err) {
      console.log(err.message);
    }

    navigate('/');
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className={`place-form`} onSubmit={newPlaceFormHandler}>
        <Input
          id="title"
          type="text"
          element="input"
          label="Title"
          errorText="Please enter a valid title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />

        <Input
          id="address"
          element="address"
          label="Address"
          row="2"
          errorText="Please enter a valid address"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />

        <Input
          id="description"
          element="description"
          label="Description"
          errorText="Please enter minimum 5 characters"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />

        <ImageUpload id="image" onInput={inputHandler} />
        {/* make the button disabled when isFormValid = false */}
        <Button disabled={!formState.isFormValid}>ADD PLACE</Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
