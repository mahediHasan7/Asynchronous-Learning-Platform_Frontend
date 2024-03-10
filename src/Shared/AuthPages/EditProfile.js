import React, { useContext } from 'react';
import Button from '../components/FormElements/Button';
import ImageUpload from '../components/FormElements/ImageUpload';
import Input from '../components/FormElements/Input';
import Card from '../components/UIElements/Card';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/form-hook';
import { useHttpClient } from '../hooks/http-hook';
import { Navigate } from 'react-router-dom';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PHONE,
  VALIDATOR_REQUIRE,
} from '../util/validators';
import './EditProfile.css';

const EditProfile = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [editProfileState, inputHandler, setData] = useForm(
    {
      image: {
        value: '',
        isValid: true,
      },
      name: {
        value: '',
        isValid: true,
      },
      email: {
        value: '',
        isValid: true,
      },
      phone: {
        value: '',
        isValid: true,
      },
      grade: {
        value: '',
        isValid: true,
      },
      password: {
        value: '',
        isValid: true,
      },
    },
    true
  );

  const editFormSubmitHandler = async () => {
    props.onSaveChanges();

    const id = props.user.id;
    const role = props.user.role;
    const name = editProfileState.inputs.name.value;
    const email = editProfileState.inputs.email.value;
    const phone = editProfileState.inputs.phone.value;
    const password = editProfileState.inputs.password.value;
    const image = editProfileState.inputs.image.value;

    // ! Edit profile for student
    if (role === 'student') {
      const formData = new FormData();
      formData.append('stuId', id);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('image', image);

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/student/edit-profile`,
          'PATCH',
          formData
        );
        console.log(responseData);
        const localStorageData = localStorage.getItem('userData');
        const parsedLocalStorageData = JSON.parse(localStorageData);
        const token = parsedLocalStorageData.token;

        auth.login_asynchronous(token, responseData.updatedUser);
        // <Navigate to="/student/subject_enrollment" />;
      } catch (error) {
        console.log(error.message);
      }
    }

    // ! Edit profile for Educator
    if (role === 'educator') {
      const formData = new FormData();
      formData.append('eduId', id);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('image', image);

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/educator/edit-profile`,
          'PATCH',
          formData
        );
        console.log(responseData);
        const localStorageData = localStorage.getItem('userData');
        const parsedLocalStorageData = JSON.parse(localStorageData);
        const token = parsedLocalStorageData.token;

        auth.login_asynchronous(token, responseData.updatedUser);
        // <Navigate to="/student/subject_enrollment" />;
      } catch (error) {
        console.log(error.message);
      }
    }

    // ! Edit profile for Admin
    if (role === 'admin') {
      const formData = new FormData();
      formData.append('adminId', id);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('image', image);

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/admin/edit-profile`,
          'PATCH',
          formData
        );
        console.log(responseData);
        const localStorageData = localStorage.getItem('userData');
        const parsedLocalStorageData = JSON.parse(localStorageData);
        const token = parsedLocalStorageData.token;

        auth.login_asynchronous(token, responseData.updatedUser);
      } catch (error) {
        console.log(error.message);
      }
    }

    // ! Edit profile for Parent
    if (role === 'parent') {
      const formData = new FormData();
      formData.append('parentId', id);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('image', image);

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/parent/edit-profile`,
          'PATCH',
          formData
        );
        console.log(responseData);
        const localStorageData = localStorage.getItem('userData');
        const parsedLocalStorageData = JSON.parse(localStorageData);
        const token = parsedLocalStorageData.token;

        auth.login_asynchronous(token, responseData.updatedUser);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="edit-profile-card">
        <div className="sign-up-form">
          <ImageUpload
            className="profile-pic-preview"
            id="image"
            center
            onInput={inputHandler}
            image={`http://localhost:5000/${props.user.image}`}
          />
          <div className="sign-up-form-input-container">
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name!"
              initialValue={props.user.name}
            />

            <Input
              element="input"
              id="email"
              type="email"
              label="Email"
              onInput={inputHandler}
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email!"
              initialValue={props.user.email}
            />

            <Input
              element="input"
              id="phone"
              type="tel"
              label="Phone"
              onInput={inputHandler}
              validators={[VALIDATOR_PHONE()]}
              errorText="Please enter a valid phone number!"
              initialValue={props.user.phone}
            />

            <Input
              element="input"
              id="password"
              type="text"
              label="Password"
              onInput={inputHandler}
              validators={[VALIDATOR_MINLENGTH(4)]}
              errorText="Password need to be more than 4 characters!"
              initialValue={props.user.password}
            />

            <Button
              className="save-changes-button"
              button
              onClick={editFormSubmitHandler}
              // disabled={!editProfileState.isFormValid}
            >
              SAVE CHANGES
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditProfile;
