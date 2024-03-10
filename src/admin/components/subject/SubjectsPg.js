import React, { useEffect, useState, useContext } from 'react';
import Button from '../../../Shared/components/FormElements/Button';
import Input from '../../../Shared/components/FormElements/Input';
import Modal from '../../../Shared/components/UIElements/Modal';
import SvgIcon from '../../../Shared/components/UIElements/SvgIcon';
import { useForm } from '../../../Shared/hooks/form-hook';
import { useHttpClient } from '../../../Shared/hooks/http-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../Shared/util/validators';
import EditSubject from './EditSubject';
import SubjectsList from './SubjectsList';

const SubjectsPg = (props) => {
  const [subjects, setSubjects] = useState([]);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [subjectState, inputHandler, setData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      subjectCode: {
        value: '',
        isValid: false,
      },
      grade: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const modalCloseHandler = () => {
    setShowAddSubjectModal(false);
  };

  // Main (+ ADD SUBJECT) button
  const addSubjectHandler = () => {
    setShowAddSubjectModal(true);
  };

  const cancelButtonHandler = () => {
    setShowAddSubjectModal(false);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const tempSub = {
      id: Math.random(),
      name: subjectState.inputs['title'].value,
      grade: subjectState.inputs['grade'].value,
      code: subjectState.inputs['subjectCode'].value,
      enrollments: '',
      educator: '',
      description: subjectState.inputs['description'].value,
      createdAt: new Date().toDateString(),
    };

    let responseData;
    try {
      responseData = await sendRequest(
        `http://localhost:5000/api/admin/subjects`,
        'POST',
        JSON.stringify({
          name: subjectState.inputs['title'].value,
          code: subjectState.inputs['subjectCode'].value,
          grade: subjectState.inputs['grade'].value,
          description: subjectState.inputs['description'].value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (error) {
      console.log(error.message);
    }

    setSubjects((prevSubjects) => {
      const updatedSubjects = [...prevSubjects, responseData.subject];
      return updatedSubjects;
    });
    setShowAddSubjectModal(false);
  };

  const deleteSubHandler = async (subId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/subject/${subId}`,
        'DELETE'
      );
    } catch (error) {
      console.log(error.message);
    }

    const subjectAfterDelete = subjects.filter((sub) => sub.id !== subId);
    setSubjects(subjectAfterDelete);
  };

  const editSubHandler = async (updatedSubject, subjectId) => {
    // console.log(updatedSubject, subjectId);
    const updatedName = updatedSubject.title.value;
    const updatedCode = updatedSubject.subjectCode.value;
    const updatedGrade = updatedSubject.grade.value;
    const updatedDescription = updatedSubject.description.value;

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/subjects`,
        'PATCH',
        JSON.stringify({
          id: subjectId,
          name: updatedName,
          code: updatedCode,
          grade: updatedGrade,
          description: updatedDescription,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (error) {
      console.log(error.message);
    }

    const subjectsBeforeUpdate = [...subjects];
    const findSubjectIndex = subjectsBeforeUpdate.findIndex(
      (sub) => sub.id === subjectId
    );
    subjectsBeforeUpdate[findSubjectIndex].name = updatedSubject.title.value;
    subjectsBeforeUpdate[findSubjectIndex].grade = updatedSubject.grade.value;
    subjectsBeforeUpdate[findSubjectIndex].code =
      updatedSubject.subjectCode.value;
    subjectsBeforeUpdate[findSubjectIndex].description =
      updatedSubject.description.value;
    setSubjects(subjectsBeforeUpdate);
  };

  useEffect(() => {
    // const slicedLoadedUsers = props.subjects.slice(0, 5);
    setSubjects(props.subjects);
  }, [props.subjects]);

  return (
    <React.Fragment>
      <Modal
        show={showAddSubjectModal}
        className="subject-item-modal"
        headerClass="subject-item-modal-header"
        footerClass="subject-item-modal-footer"
        header="New subject details"
        onSubmit={formSubmitHandler}
        footer={
          <div className="add-sub-buttons">
            <Button danger onClick={cancelButtonHandler} type="button">
              CANCEL
            </Button>
            <Button inverse disabled={!subjectState.isFormValid} type="submit">
              ADD SUBJECT
            </Button>
          </div>
        }
      >
        <div className="add-subject-container">
          <Input
            element="input"
            id="title"
            type="text"
            label="Title"
            placeholder={`  Example: Additional Mathematics`}
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a proper subject name"
          />
          <Input
            element="input"
            id="subjectCode"
            type="text"
            label="Subject Code"
            placeholder={`  Example: SPM201`}
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a proper subject code"
          />
          <Input
            element="input"
            id="grade"
            type="text"
            label="Grade"
            placeholder={`  Form 4, Form 5 ...`}
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the grade of the subject"
          />
          <Input
            element="textarea"
            id="description"
            type="text"
            label="Subject Information"
            placeholder={`  Brief description of this subject`}
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the brief description for the subject"
          />
        </div>
      </Modal>

      <SubjectsList
        subjectsList={subjects}
        addSubjectHandler={addSubjectHandler}
        onDelete={deleteSubHandler}
        onEdit={editSubHandler}
        isViewContent={props.isViewContent}
      />
    </React.Fragment>
  );
};

export default SubjectsPg;
