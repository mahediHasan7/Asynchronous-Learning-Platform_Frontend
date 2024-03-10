import React, { useState, useContext, useEffect, useCallback } from 'react';
import Button from '../../Shared/components/FormElements/Button';
import Modal from '../../Shared/components/UIElements/Modal';
import { StudentContext } from '../../Shared/context/StudentContext';
import { useForm } from '../../Shared/hooks/form-hook';
import randomWords from 'random-words';

import StudentSubjectsEnrollmentList from './StudentSubjectsEnrollmentList';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/AuthContext';
import Alert from '../../Shared/components/UIElements/Alert';

const StudentSubjectsEnrollmentPg = (props) => {
  const studentContext = useContext(StudentContext);
  const auth = useContext(AuthContext);

  const [subjects, setSubjects] = useState([]);
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [status, setStatus] = useState();
  const [warning, setWarning] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [subjectEnrollmentState, inputHandler, setData] = useForm(
    {
      enrolledSubject: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const showModal = () => {
    setShowEnrollmentModal(true);
  };

  const closeModal = () => {
    setShowEnrollmentModal(false);
  };

  const enrollSubjectHandler = () => {
    getSubjects();
    setShowEnrollmentModal(true);
  };

  const getEnrolledSubjects = async () => {
    const userId = auth.loggedInUser_asynchronous.id;
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/enrolled-subjects/${userId}`
      );

      setEnrolledSubjects(responseData.subjects);
    } catch (error) {
      setEnrolledSubjects([]);
    }
  };

  const getSubjects = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/subjects/`
      );
      // console.log(responseData);
      setSubjects(responseData.subjects);
    } catch (error) {
      setSubjects([]);
    }
  };

  const getStatus = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/acc-status/${auth.loggedInUser_asynchronous.id}`
      );
      console.log(responseData);
      setStatus(responseData.status);
    } catch (error) {
      setStatus('pending');
    }
  });

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const enrolledSubject = JSON.parse(
      subjectEnrollmentState.inputs.enrolledSubject.value
    );
    const subjectId = enrolledSubject.id;
    const userId = auth.loggedInUser_asynchronous.id;

    // ! checking if the subject already previously enrolled or not
    getEnrolledSubjects();
    if (enrolledSubjects) {
      enrolledSubjects.forEach((alreadyEnrolledSub) => {
        if (alreadyEnrolledSub.id === subjectId) {
          setWarning('Already enrolled');
        }
      });
    }

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/enroll`,
        'POST',
        JSON.stringify({
          subId: subjectId,
          studentId: userId,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (error) {
      console.log(error.message);
    }

    getEnrolledSubjects();

    subjectEnrollmentState.isFormValid = false;
    closeModal();
  };

  const radioButtonHandler = (e) => {
    inputHandler('enrolledSubject', e.target.value, true);
  };

  useEffect(() => {
    studentContext.setEnrolledSubjects(enrolledSubjects);
  }, [enrolledSubjects]);

  useEffect(() => {
    getEnrolledSubjects();
    getStatus();
  }, []);

  console.log(status);

  return (
    <React.Fragment>
      <Modal
        show={showEnrollmentModal}
        className="sub-reg-modal"
        headerClass="sub-reg-modal-header"
        footerClass="sub-reg-modal-footer"
        header="Select a subject for enrollment"
        onSubmit={formSubmitHandler}
        footer={
          <div className="sub-reg-buttons">
            <Button danger onClick={closeModal} type="button">
              CANCEL
            </Button>
            <Button
              inverse
              disabled={!subjectEnrollmentState.isFormValid}
              type="submit"
            >
              ENROLL SUBJECT
            </Button>
          </div>
        }
      >
        <div className="sub-reg-container">
          {subjects.map((subject) => {
            return (
              <div className="sub-reg-radio">
                <input
                  type="radio"
                  id={subject.name}
                  name="sub_for_enrollment"
                  value={JSON.stringify(subject)}
                  onChange={radioButtonHandler}
                />
                <label htmlFor={subject.name}>{subject.name}</label>
              </div>
            );
          })}
        </div>
      </Modal>
      <Alert
        header={'Already enrolled!'}
        alertContent={
          <React.Fragment>
            <p>
              This subject already enrolled by{' '}
              {auth.loggedInUser_asynchronous.name}.
            </p>
          </React.Fragment>
        }
        leftButtonText="OK"
        rightButtonText="NULL"
        showAlert={warning}
        closeAlertHandler={() => {
          setWarning();
        }}
      />
      {status && (
        <div
          className={`acc-req-status-container ${
            status === 'approved'
              ? 'acc-req-approved'
              : status === 'declined'
              ? 'acc-req-declined'
              : 'acc-req-pending'
          }`}
        >
          <p>Account request {status}</p>
        </div>
      )}
      <StudentSubjectsEnrollmentList
        status={status}
        enrolledSubjects={enrolledSubjects}
        enrollSubjectHandler={enrollSubjectHandler}
      />
    </React.Fragment>
  );
};

export default StudentSubjectsEnrollmentPg;
