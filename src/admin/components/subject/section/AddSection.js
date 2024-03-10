import { useState } from 'react/cjs/react.development';
import Button from '../../../../Shared/components/FormElements/Button';
import Input from '../../../../Shared/components/FormElements/Input';
import Modal from '../../../../Shared/components/UIElements/Modal';
import { useForm } from '../../../../Shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../../../Shared/util/validators';

const AddSection = (props) => {
  const [sectionState, inputHandler, setData] = useForm(
    {
      section: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const sectionName = sectionState.inputs.section.value;
    props.onAddSection(sectionName);
    props.onCancel();
  };

  return (
    <Modal
      show={props.showAddSectionModal}
      className="subject-item-modal"
      headerClass="subject-item-modal-header"
      footerClass="subject-item-modal-footer"
      header="New section"
      onSubmit={formSubmitHandler}
      footer={
        <div className="add-sub-buttons">
          <Button danger onClick={props.onCancel} type="button">
            CANCEL
          </Button>
          <Button inverse disabled={!sectionState.isFormValid} type="submit">
            ADD SECTION
          </Button>
        </div>
      }
    >
      <div className="add-subject-container">
        <Input
          element="input"
          id="section"
          type="text"
          label="Section Name"
          placeholder={`  Ex. Section 1: Section name`}
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a proper section name"
        />
      </div>
    </Modal>
  );
};

export default AddSection;
