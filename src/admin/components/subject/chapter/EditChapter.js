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

const EditChapter = (props) => {
  const initialState = {
    initialInputs: {
      chapter: {
        value: '',
        isValid: false,
      },
    },
    initialFormValidity: false,
  };
  const [isLoading, setIsLoading] = useState(true);

  const [chapterState, inputHandler, setData] = useForm(
    initialState.initialInputs,
    initialState.initialFormValidity
  );

  const editChapterFormSubmitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(chapterState.inputs);
  };

  useEffect(() => {
    setData(
      {
        chapter: {
          value: props.chapter,
          isValid: true,
        },
      },
      true
    );

    setIsLoading(false);
  }, [props.chapterName, setData]);

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
      header="Modify chapter name"
      onSubmit={editChapterFormSubmitHandler}
      footer={
        <div className="add-section-buttons">
          <Button danger onClick={props.onCancel} type="button">
            CANCEL
          </Button>
          <Button inverse disabled={!chapterState.isFormValid} type="submit">
            EDIT CHAPTER
          </Button>
        </div>
      }
    >
      <div className="add-section-container">
        <Input
          element="input"
          id="chapter"
          type="text"
          label="Chapter name"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a proper chapter name"
          initialValue={chapterState.inputs.chapter.value}
          initialIsValid={chapterState.inputs.chapter.isValid}
        />
      </div>
    </Modal>
  );
};

export default EditChapter;
