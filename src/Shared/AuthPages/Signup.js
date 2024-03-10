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
import './Signup.css';

const SignUp = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [authState, inputHandler, setData] = useForm(
    {
      image: {
        value: '',
        isValid: true,
      },
      name: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      phone: {
        value: '',
        isValid: false,
      },
      grade: {
        value: '',
        isValid: true,
      },
      studentId: {
        value: '',
        isValid: true,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(authState.inputs);

    const name = authState.inputs.name.value;
    const email = authState.inputs.email.value;
    const phone = authState.inputs.phone.value;
    const password = authState.inputs.password.value;
    const role = authState.inputs.role.value;
    const grade = authState.inputs.grade.value;
    const image = authState.inputs.image.value;
    const studentId = authState.inputs.studentId.value;

    // ! Sign up as student
    if (role === 'student') {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('grade', grade);
      formData.append('role', role);
      formData.append('image', image);

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/student/signup`,
          'POST',
          formData
        );
        console.log('Signup page: ', responseData.token, responseData.user);
        auth.login_asynchronous(responseData.token, responseData.user);
        // navigate('/student/subject_enrollment');
        <Navigate to="/student/subject_enrollment" />;
      } catch (error) {
        console.log(error.message);
      }
    }

    // ! Sign up as educator
    if (role === 'educator') {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('grade', grade);
      formData.append('role', role);
      formData.append('image', image);

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/educator/signup`,
          'POST',
          formData
        );
        console.log('Signup page: ', responseData.token, responseData.user);
        auth.login_asynchronous(responseData.token, responseData.user);
        // <Navigate to="/student/subject_enrollment" />;
      } catch (error) {
        console.log(error.message);
      }
    }

    // ! Sign up as admin
    if (role === 'admin') {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('grade', grade);
      formData.append('role', role);
      formData.append('image', image);

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/admin/signup`,
          'POST',
          formData
        );
        console.log('Signup page: ', responseData.token, responseData.user);
        auth.login_asynchronous(responseData.token, responseData.user);
        // navigate('/student/subject_enrollment');
        // <Navigate to="/student/subject_enrollment" />;
      } catch (error) {
        console.log(error.message);
      }
    }

    // ! Sign up as parent
    if (role === 'parent') {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('studentId', studentId);
      formData.append('role', role);
      formData.append('image', image);

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/parent/signup`,
          'POST',
          formData
        );
        console.log('Signup page: ', responseData.token, responseData.user);
        auth.login_asynchronous(responseData.token, responseData.user);
        // navigate('/student/subject_enrollment');
        // <Navigate to="/student/subject_enrollment" />;
      } catch (error) {
        console.log(error.message);
      }
    }

    // const newUser = {
    //   name: authState.inputs.name.value,
    //   email: authState.inputs.email.value,
    //   phone: authState.inputs.phone.value,
    //   password: authState.inputs.password.value,
    //   role: authState.inputs.role.value,
    //   grade: authState.inputs.grade.value,
    //   image: authState.inputs.image.value,
    // };
    // auth.login_asynchronous('dummy_token', newUser);
  };

  const optionsState = (v) => {
    console.log(v.event.value);
  };

  let gradeInput;
  if (authState.inputs.role) {
    if (authState.inputs.role.value === 'student') {
      gradeInput = (
        <Input
          element="input"
          id="grade"
          type="text"
          label="Grade"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid grade!"
          placeholder="Form 4 or Form 5 etc."
        />
      );
    } else if (authState.inputs.role.value === 'parent') {
      gradeInput = (
        <Input
          element="input"
          id="studentId"
          type="text"
          label="Your child's student ID"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid student ID!"
          placeholder="300, 301 etc."
        />
      );
    }
  }
  return (
    <React.Fragment>
      <Card className="sign-up-card">
        <form onSubmit={formSubmitHandler} className="sign-up-form">
          <ImageUpload
            className="profile-pic-preview"
            id="image"
            center
            onInput={inputHandler}
          />
          <div className="sign-up-form-input-container">
            <Input
              element="dropdown"
              id="role"
              label="User type"
              onInput={inputHandler}
              userTypeArr={[
                {
                  label: 'Admin',
                  value: 'admin',
                },
                {
                  label: 'Educator',
                  value: 'educator',
                },
                {
                  label: 'Student',
                  value: 'student',
                },
                {
                  label: 'Parent',
                  value: 'parent',
                },
              ]}
            />

            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name!"
              placeholder="John Doe"
            />

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
              id="phone"
              type="tel"
              label="Phone"
              onInput={inputHandler}
              validators={[VALIDATOR_PHONE()]}
              errorText="Please enter a valid phone number!"
              placeholder="minimum 8-digit phone number"
            />

            {gradeInput}

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

            {/* <Link to={`/student/subject_enrollment`}> */}
            <Button
              className="sign-up-button"
              type="submit"
              disabled={!authState.isFormValid}
              inverse
            >
              SIGNUP AS
              {authState.inputs.role &&
                ' ' + authState.inputs.role.value.toUpperCase()}
            </Button>
            {/* </Link> */}
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default SignUp;
