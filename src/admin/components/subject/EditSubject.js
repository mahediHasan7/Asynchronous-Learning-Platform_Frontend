import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import Button from '../../../Shared/components/FormElements/Button';
import Input from '../../../Shared/components/FormElements/Input';
import Card from '../../../Shared/components/UIElements/Card';
import Modal from '../../../Shared/components/UIElements/Modal';
import { useForm } from '../../../Shared/hooks/form-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../Shared/util/validators';

const EditSubject = (props) => {
  const initialState = {
    initialInputs: {
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
    initialFormValidity: false,
  };
  const [isLoading, setIsLoading] = useState(true);

  const [subjectState, inputHandler, setData] = useForm(
    initialState.initialInputs,
    initialState.initialFormValidity
  );

  const editSubFormSubmitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(subjectState.inputs);
  };

  useEffect(() => {
    setData(
      {
        title: {
          value: props.subject.name,
          isValid: true,
        },
        subjectCode: {
          value: props.subject.code,
          isValid: true,
        },
        grade: {
          value: props.subject.grade,
          isValid: true,
        },
        description: {
          value: props.subject.description,
          isValid: true,
        },
      },
      true
    );
    // if (!subjectState.inputs.title.value) {
    //   setIsLoading(false);
    // }
    setIsLoading(false);
  }, [props.subject, setData]);

  if (isLoading) {
    return (
      <div className="center">
        <Card>
          <p>Loading...</p>
        </Card>
      </div>
    );
  }

  return (
    <Modal
      show={props.show}
      className="subject-item-modal"
      headerClass="subject-item-modal-header"
      footerClass="subject-item-modal-footer"
      header="Modify subject"
      onSubmit={editSubFormSubmitHandler}
      footer={
        <div className="add-sub-buttons">
          <Button danger onClick={props.onCancel} type="button">
            CANCEL
          </Button>
          <Button inverse disabled={!subjectState.isFormValid} type="submit">
            EDIT SUBJECT
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
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a proper subject name"
          initialValue={subjectState.inputs.title.value}
          initialIsValid={subjectState.inputs.title.isValid}
        />
        <Input
          element="input"
          id="subjectCode"
          type="text"
          label="Subject Code"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a proper subject code"
          initialValue={subjectState.inputs.subjectCode.value}
          initialIsValid={subjectState.inputs.subjectCode.isValid}
        />
        <Input
          element="input"
          id="grade"
          type="text"
          label="Grade"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter the grade of the subject"
          initialValue={subjectState.inputs.grade.value}
          initialIsValid={subjectState.inputs.grade.isValid}
        />
        <Input
          element="textarea"
          id="description"
          type="text"
          label="Subject Information"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter the brief description for the subject"
          initialValue={subjectState.inputs.description.value}
          initialIsValid={subjectState.inputs.description.isValid}
        />
      </div>
    </Modal>
  );
};

export default EditSubject;
