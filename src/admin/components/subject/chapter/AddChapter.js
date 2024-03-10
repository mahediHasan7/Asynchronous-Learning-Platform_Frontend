import { useState } from 'react/cjs/react.development';
import Button from '../../../../Shared/components/FormElements/Button';
import Input from '../../../../Shared/components/FormElements/Input';
import Modal from '../../../../Shared/components/UIElements/Modal';
import { useForm } from '../../../../Shared/hooks/form-hook';
import { useHttpClient } from '../../../../Shared/hooks/http-hook';
import { VALIDATOR_REQUIRE } from '../../../../Shared/util/validators';

const AddChapter = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [chapterState, inputHandler, setData] = useForm(
    {
      chapter: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const chapterName = chapterState.inputs.chapter.value;

    props.onAddChapter(chapterName);
    props.onCancel();
  };

  return (
    <Modal
      show={props.showAddChapterModal}
      className="subject-item-modal"
      headerClass="subject-item-modal-header"
      footerClass="subject-item-modal-footer"
      header="New chapter"
      onSubmit={formSubmitHandler}
      footer={
        <div className="add-sub-buttons">
          <Button danger onClick={props.onCancel} type="button">
            CANCEL
          </Button>
          <Button inverse disabled={!chapterState.isFormValid} type="submit">
            ADD CHAPTER
          </Button>
        </div>
      }
    >
      <div className="add-subject-container">
        <Input
          element="input"
          id="chapter"
          type="text"
          label="Chapter Name"
          placeholder={`  Ex. Chapter 1: Chapter name`}
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a proper chapter name"
        />
      </div>
    </Modal>
  );
};

export default AddChapter;
