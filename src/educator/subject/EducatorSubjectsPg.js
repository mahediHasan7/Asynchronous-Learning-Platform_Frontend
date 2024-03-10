import React, { useState, useContext, useEffect, useCallback } from 'react';
import Button from '../../Shared/components/FormElements/Button';
import Alert from '../../Shared/components/UIElements/Alert';
import Modal from '../../Shared/components/UIElements/Modal';
import { AuthContext } from '../../Shared/context/AuthContext';
import { EducatorContext } from '../../Shared/context/EducatorContext';
import { useForm } from '../../Shared/hooks/form-hook';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import EducatorSubjectsList from './EducatorSubjectsList';
import EnrolledStudents from './EnrolledStudents';

const EducatorSubjectsPg = (props) => {
  const auth = useContext(AuthContext);
  const educatorContext = useContext(EducatorContext);

  const [status, setStatus] = useState();
  const [registeredSubjects, setRegisteredSubjects] = useState([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEnrolledStModal, setShowEnrolledStModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState(null);
  const [warning, setWarning] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [subjectRegState, inputHandler, setData] = useForm(
    {
      registeredSubject: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const showModal = () => {
    setShowRegisterModal(true);
  };

  const closeModal = () => {
    setShowRegisterModal(false);
  };

  const registerSubjectHandler = () => {
    setShowRegisterModal(true);
    getRegisteredSubjects();
  };

  const showEnrolledStudentsPage = () => {
    setShowEnrolledStModal(true);
  };

  const closeEnrolledStudentsPage = () => {
    setShowEnrolledStModal(false);
  };

  const getStatus = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/acc-status/${auth.loggedInUser_asynchronous.id}`
      );
      console.log(responseData);
      setStatus(responseData.status);
    } catch (error) {
      setStatus('pending');
    }
  });

  const getRegisteredSubjects = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/registered-subjects/${auth.loggedInUser_asynchronous.id}`
      );

      // console.log(responseData);
      setRegisteredSubjects(responseData.subjects);
    } catch (error) {
      setRegisteredSubjects([]);
    }
  };

  const enrolledStudentsListHandler = async (subjectId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/view-students/${subjectId}`
      );

      setEnrolledStudents(responseData.students);
    } catch (error) {
      setEnrolledStudents([]);
    }
    const subject = registeredSubjects.find((sub) => sub.id === subjectId);
    // setEnrolledStudents(subject.enrolledStudents);
    setSelectedSubject(subject);
    showEnrolledStudentsPage();
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const newRegisteredSub = JSON.parse(
      subjectRegState.inputs.registeredSubject.value
    );
    const subjectId = newRegisteredSub.id;

    // ! checking if the subject already previously registered or not
    getRegisteredSubjects();
    if (registeredSubjects) {
      registeredSubjects.forEach((alreadyRegSub) => {
        if (alreadyRegSub.id === subjectId) {
          setWarning(
            `This subject already registered by ${auth.loggedInUser_asynchronous.name}`
          );
        }
      });
    }

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/register`,
        'POST',
        JSON.stringify({
          subId: subjectId,
          educatorId: auth.loggedInUser_asynchronous.id,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      const registeredSubjectWithEducator = responseData.EducatorSubject;
      if (!registeredSubjectWithEducator) {
        setWarning(
          'This subject already registered. Please register a different subject.'
        );
      }
    } catch (error) {
      console.log(error.message);
    }

    getRegisteredSubjects();

    closeModal();
  };

  const unregisterSubHandler = async (subId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/unregister/${auth.loggedInUser_asynchronous.id}/${subId}`,

        'DELETE'
      );
    } catch (error) {
      console.log(error.message);
    }

    getRegisteredSubjects();
  };

  const radioButtonHandler = (e) => {
    inputHandler('registeredSubject', e.target.value, true);
  };

  useEffect(() => {
    educatorContext.setRegisteredSubjects(registeredSubjects);
  }, [registeredSubjects]);

  useEffect(() => {
    getRegisteredSubjects();
    getStatus();
  }, []);

  return (
    <React.Fragment>
      <EnrolledStudents
        subject={selectedSubject ? selectedSubject : {}}
        enrolledStudents={enrolledStudents ? enrolledStudents : []}
        onShow={showEnrolledStModal}
        onClose={closeEnrolledStudentsPage}
      />

      <Modal
        show={showRegisterModal}
        className="sub-reg-modal"
        headerClass="sub-reg-modal-header"
        footerClass="sub-reg-modal-footer"
        header="Select a subject for registration"
        onSubmit={formSubmitHandler}
        footer={
          <div className="sub-reg-buttons">
            <Button danger onClick={closeModal} type="button">
              CANCEL
            </Button>
            <Button
              inverse
              disabled={!subjectRegState.isFormValid}
              type="submit"
            >
              REGISTER SUBJECT
            </Button>
          </div>
        }
      >
        <div className="sub-reg-container">
          {props.availableSubjects.map((subject) => {
            return (
              <div className="sub-reg-radio">
                <input
                  type="radio"
                  id={subject.name}
                  name="sub_for_reg"
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
        header={'Already registered!'}
        alertContent={
          <React.Fragment>
            <p>{warning}</p>
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
      <EducatorSubjectsList
        status={status}
        registeredSubjects={registeredSubjects}
        onUnregister={unregisterSubHandler}
        registerSubjectHandler={registerSubjectHandler}
        onShowEnrolledStudents={enrolledStudentsListHandler}
      />
    </React.Fragment>
  );
};

export default EducatorSubjectsPg;
