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
import './Profile.css';

const Profile = (props) => {
  // console.log(props);
  const auth = useContext(AuthContext);

  let grade;
  if (props.user.role) {
    if (props.user.role === 'student') {
      grade = (
        <p>
          <span>Grade: </span>
          {props.user.grade}
        </p>
      );
    }
  }
  return (
    <React.Fragment>
      <div className="profile-pic">
        <img
          src={`http://localhost:5000/${props.user.image}`}
          alt={props.user.name}
        />
      </div>
      <div className="profile-container">
        <p>
          <span>User Type: </span>
          {props.user.role}
        </p>
        <p>
          <span>User ID: </span>
          {props.user.id}
        </p>
        <p>
          <span>Name: </span>
          {props.user.name}
        </p>
        <p>
          <span>Email: </span>
          {props.user.email}
        </p>
        <p>
          <span>Phone: </span>
          {props.user.phone}
        </p>
        {grade}
        <p>
          <span>Password: </span>
          {'******'}
        </p>

        <div className="right">
          <Button
            className="edit-profile-button"
            type="button"
            onClick={props.onEditButton}
          >
            EDIT PROFILE
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
