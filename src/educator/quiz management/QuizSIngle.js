import React, { useEffect, useState } from 'react';
import ImageUpload from '../../Shared/components/FormElements/ImageUpload';
import Input from '../../Shared/components/FormElements/Input';
import { useForm } from '../../Shared/hooks/form-hook';
import {
  VALIDATOR_QUILL,
  VALIDATOR_REQUIRE,
} from '../../Shared/util/validators';

const QuizSingle = (props) => {
  const [clearChecked, setClearChecked] = useState();

  const [editorState, inputHandler, setData] = useForm(
    {
      topicContent: {
        value: '',
        isValid: false,
      },
      radio: {
        value: '',
        isValid: false,
      },
      answer1: {
        value: '',
        isValid: false,
      },
      answer2: {
        value: '',
        isValid: false,
      },
      answer3: {
        value: '',
        isValid: false,
      },
      answer4: {
        value: '',
        isValid: false,
      },
      solution: {
        value: '',
        isValid: true,
      },
    },
    false
  );

  const answerEditingHandler = () => {
    setClearChecked(false);
    editorState.inputs.radio.isValid = false;
  };

  useEffect(() => {
    setClearChecked();
  }, [clearChecked]);

  useEffect(() => {
    // props.onRetrieveQuestion(editorState);
    // console.log(editorState);
    props.onChange(props.id, editorState.inputs, editorState.isFormValid);
  }, [editorState]);

  return (
    <div className={`topic-content`}>
      <React.Fragment>
        <Input
          element="quillEditor"
          className="quiz-quill-editor"
          id="topicContent"
          label={`Question ${props.question}`}
          onInput={inputHandler}
          validators={[VALIDATOR_QUILL()]}
          errorText="Please enter the question"
          // onChangeEditorValue={quillEditorContentHandler}
          topicContent={props.topicContent}
        />

        {Array.from(Array(4), (e, i) => {
          const whichAnswer = `answer${i + 1}`;
          return (
            <Input
              element="radio"
              id="radio"
              type="radio"
              checked={clearChecked && clearChecked}
              name={props.id}
              className="add-quiz-radio"
              onInput={inputHandler}
              // initialValue={}
              textValue={editorState.inputs[whichAnswer].value}
              // initialIsValid={true}
              inputForLabel={
                <Input
                  element="input"
                  id={`answer${i + 1}`}
                  type="text"
                  errorTextFormat="radio"
                  isEditing={answerEditingHandler}
                  onInput={inputHandler}
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid answer option"
                  placeholder={`Answer option ${i + 1}`}
                  initialValue={props.topicTitle}
                  initialIsValid={
                    typeof props.topicTitle != 'string' ? false : true
                  }
                />
              }
            />
          );
        })}
        {editorState.inputs.answer1.value.length > 0 &&
          editorState.inputs.answer2.value.length > 0 &&
          editorState.inputs.answer3.value.length > 0 &&
          editorState.inputs.answer4.value.length > 0 && (
            <p
              style={{
                color: '#33A95B',
                fontWeight: '600',
                marginTop: '.5rem',
              }}
            >
              Please select the correct answer
            </p>
          )}

        <ImageUpload
          className="quiz-pic-solution"
          id="solution"
          buttonText="UPLOAD STEP-BY-STEP SOLUTION"
          onInput={inputHandler}
        />
      </React.Fragment>
    </div>
  );
};

export default QuizSingle;
