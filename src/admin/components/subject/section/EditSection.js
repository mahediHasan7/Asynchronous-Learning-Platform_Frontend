import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import Button from '../../../../Shared/components/FormElements/Button';
import Input from '../../../../Shared/components/FormElements/Input';
import Card from '../../../../Shared/components/UIElements/Card';
import Modal from '../../../../Shared/components/UIElements/Modal';
import { useForm } from '../../../../Shared/hooks/form-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../../Shared/util/validators';

const EditSection = (props) => {
  const initialState = {
    initialInputs: {
      section: {
        value: '',
        isValid: false,
      },
    },
    initialFormValidity: false,
  };
  const [isLoading, setIsLoading] = useState(true);

  const [sectionState, inputHandler, setData] = useForm(
    initialState.initialInputs,
    initialState.initialFormValidity
  );

  const editSectionFormSubmitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(sectionState.inputs);
  };

  useEffect(() => {
    setData(
      {
        section: {
          value: props.section,
          isValid: true,
        },
      },
      true
    );

    setIsLoading(false);
  }, [props.sectionName, setData]);

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
      className="section-item-modal"
      headerClass="section-item-modal-header"
      footerClass="section-item-modal-footer"
      header="Modify section name"
      onSubmit={editSectionFormSubmitHandler}
      footer={
        <div className="add-section-buttons">
          <Button danger onClick={props.onCancel} type="button">
            CANCEL
          </Button>
          <Button inverse disabled={!sectionState.isFormValid} type="submit">
            EDIT SECTION
          </Button>
        </div>
      }
    >
      <div className="add-section-container">
        <Input
          element="input"
          id="section"
          type="text"
          label="Section name"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a proper section name"
          initialValue={sectionState.inputs.section.value}
          initialIsValid={sectionState.inputs.section.isValid}
        />
      </div>
    </Modal>
  );
};

export default EditSection;
