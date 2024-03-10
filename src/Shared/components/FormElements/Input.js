import React, { useEffect, useReducer, useRef, useState } from 'react';
import { validate } from '../../util/validators';
import { Dropdown } from 'reactjs-dropdown-component';

import './Input.css';
import QuillEditor from '../UIElements/QuillEditor';
import QuizSingle from '../../../educator/quiz management/QuizSIngle';

const reducerFunc = (currentState, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...currentState,
        val: action.val,
        isValid: validate(action.val, action.validateType),
      };
    case 'EXIT_TOUCH':
      return {
        ...currentState,
        isValid: validate(currentState.val, action.validateType),
      };

    case 'TOUCH':
      return { ...currentState, isTouch: true };
    default:
      return currentState;
  }
};

const Input = (props) => {
  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState();

  const subjectDropdownRef = useRef();
  // const subjectDropdownOnChange = (user, dropdownName) => {
  //   setSelectedSubject(user);
  // };
  // console.log('input initial value-> ', props.initialValue);
  const initialState = {
    val: props.initialValue || '',
    isValid: props.initialIsValid || false,
    isTouch: false,
  };

  const [inputState, dispatch] = useReducer(reducerFunc, initialState);
  // console.log(inputState);

  const { id, onInput } = props;
  const { val, isValid } = inputState;

  // to give the values to the NewPlace components when any change happens
  // Using useEffect(), because I want to keep sending the updated data only when a valid change happens
  useEffect(() => {
    // if (id === 'question1') {
    //   console.log('Input: ', id, '=> ', val, ': ', isValid);
    // }
    // console.log('Input: ', id, '=> ', val, ': ', isValid);

    onInput(id, val, isValid);
  }, [id, val, isValid, onInput]);

  const inputChangeHandler = (e) => {
    // if (props.element === 'radio') {
    //   console.log('inputChangeHandler->', e.target ? e.target.value : e.value);
    // }

    // console.log(e.target ? e.target.value : e.value);

    // Only for input type text for Quiz answer options

    if (props.element === 'input' && props.id.includes('answer')) {
      props.isEditing();
    }

    dispatch({
      type: 'CHANGE',
      val: e.target ? e.target.value : e.value,
      validateType: props.validators ? props.validators : [],
    });
  };

  const lectureNoteHandler = (event) => {
    // console.log(event.target ? event.target.value : event.value);

    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      dispatch({
        type: 'CHANGE',
        val: pickedFile,
        validateType: props.validators ? props.validators : [],
      });
    }
  };

  const quizHandler = (id, quizData, isQuizValid) => {
    // console.log(isQuizValid);
    dispatch({
      type: 'CHANGE',
      val: quizData,
      validateType: props.validators ? props.validators : [],
    });
  };

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' });
    dispatch({ type: 'EXIT_TOUCH', validateType: props.validators });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={inputChangeHandler}
        onBlur={touchHandler}
        value={inputState.val}
      />
    ) : props.element === 'dropdown' ? (
      <Dropdown
        name="subjects"
        title="Select a user"
        list={props.userTypeArr}
        onChange={inputChangeHandler}
        ref={subjectDropdownRef}
        id="overallStyle"
      />
    ) : props.element === 'radio' ? (
      <div className="radio-input">
        <input
          checked={props.checked}
          id={props.id}
          type={props.type}
          name={props.name}
          className={props.className}
          value={props.textValue}
          onChange={inputChangeHandler}
        />
        <label className="radio-label" htmlFor={props.name}>
          {props.inputForLabel}
        </label>
      </div>
    ) : props.element === 'quillEditor' ? (
      <QuillEditor
        onChange={inputChangeHandler}
        className={props.className}
        // onChangeEditorValue={props.onChangeEditorValue}
        topicContent={props.topicContent}
      />
    ) : props.element === 'file' ? (
      <input
        id={props.id}
        type={props.type}
        onChange={lectureNoteHandler}
        multiple={props.multiple}
        accept={props.accept}
      />
    ) : props.element === 'quizQuestion' ? (
      <QuizSingle
        id={props.id}
        question={props.question}
        // onRetrieveQuestion={retrieveQuestionDetails}
        onChange={quizHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        placeholder={props.placeholder}
        onChange={inputChangeHandler}
        onBlur={touchHandler}
        value={inputState.val}
      />
    );

  return (
    <div
      className={`form-control ${
        inputState.isTouch && !inputState.isValid && 'form-control--invalid'
      } ${props.errorTextFormat === 'radio' && 'form-control-for-radio'} ${
        props.className === 'add-quiz-radio' && 'form-control-adjust-margin'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {props.element === 'quillEditor' && !inputState.isValid && (
        <p style={{ color: 'red', marginBottom: '.5rem' }}>{props.errorText}</p>
      )}
      {element}
      {inputState.isTouch && !inputState.isValid && <p>{props.errorText}</p>}
      {props.id === 'lectureNote' && !inputState.isValid && (
        <p style={{ color: 'red' }}>{props.errorText}</p>
      )}

      {/* {props.id === 'topicContent' && !inputState.isValid && (
        <p style={{ color: 'red' }}>{props.errorText}</p>
      )} */}
    </div>
  );
};

export default Input;
