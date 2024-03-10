import React, { useState, useContext, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Button from '../../Shared/components/FormElements/Button';
import Alert from '../../Shared/components/UIElements/Alert';
import { AuthContext } from '../../Shared/context/AuthContext';
import EnrolledStudents from './EnrolledStudents';

const EducatorSubjectsItem = (props) => {
  const auth = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);

  const showAlertHandler = () => {
    setShowAlert(true);
  };
  const closeAlertHandler = () => {
    setShowAlert(false);
  };

  const viewStudentsButtonHandler = () => {
    props.onShowEnrolledStudents(props.id);
  };

  const unregisterButtonHandler = () => {
    showAlertHandler();
  };

  return (
    <React.Fragment>
      <Alert
        header={'Want to unregister?'}
        alertContent={
          <React.Fragment>
            <p>Subject name: </p> <p>{props.name}</p>
            <p>Grade: </p> <p>{props.grade}</p>
            <p>Subject code: </p> <p>{props.code}</p>
            <p>Total enrollments: </p> <p>{props.enrollments}</p>
            <p>Are you sure to unregister this subject?</p>
          </React.Fragment>
        }
        leftButtonText="CANCEL"
        rightButtonText="UNREGISTER"
        showAlert={showAlert}
        closeAlertHandler={closeAlertHandler}
        onConfirm={props.onUnregister.bind(null, props.id)}
      />

      <tr>
        <td>{props.name}</td>
        <td>{props.grade}</td>
        <td>{props.code}</td>
        <td>{props.enrollments}</td>
        <td>
          <Button
            className="subject-view-students-btn"
            inverse
            onClick={viewStudentsButtonHandler}
          >
            View students
          </Button>
        </td>

        <td>
          <Button
            className="subject-unregister-btn"
            inverse
            onClick={unregisterButtonHandler}
          >
            Unregister
          </Button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default EducatorSubjectsItem;
