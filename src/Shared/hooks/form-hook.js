import { useReducer, useCallback } from 'react';

const reducer = (currState, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE': {
      let formValid = true;

      //check if the isValid from the input is true or false
      // update the formValid based on that
      for (const inputId in currState.inputs) {
        if (!currState.inputs[inputId]) {
          continue;
        }
        if (inputId === action.id) {
          formValid = formValid && action.isValid;
        } else {
          formValid = formValid && currState.inputs[inputId].isValid;
        }
      }

      // Update the value and isValid for the action.id input (eg: title or description)
      return {
        ...currState,
        inputs: {
          ...currState.inputs,
          [action.id]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isFormValid: formValid,
      };
    }

    case 'SET_VALUES':
      return {
        inputs: action.initialInputs,
        isFormValid: action.initialValidity,
      };

    default:
      return currState;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(reducer, {
    inputs: initialInputs,
    isFormValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    // if (id === 'question1') {
    //   console.log('formHook: ', id, '=> ', value, ': ', isValid);
    // }
    // console.log(id, '=> ', value, ': ', isValid);
    dispatch({ type: 'INPUT_CHANGE', id: id, value: value, isValid: isValid });
  }, []);

  const setData = useCallback((initialInputs, initialValidity) => {
    dispatch({
      type: 'SET_VALUES',
      initialInputs: initialInputs,
      initialValidity: initialValidity,
    });
  }, []);

  return [formState, inputHandler, setData];
};
