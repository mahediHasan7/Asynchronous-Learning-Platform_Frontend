import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Button from '../../Shared/components/FormElements/Button';
import Alert from '../../Shared/components/UIElements/Alert';
import Card from '../../Shared/components/UIElements/Card';
import SvgIcon from '../../Shared/components/UIElements/SvgIcon';
import { useForm } from '../../Shared/hooks/form-hook';
import QuizSingle from './QuizSIngle';

import './EducatorAddQuizPage.css';
import Input from '../../Shared/components/FormElements/Input';
import { VALIDATOR_QUIZ } from '../../Shared/util/validators';
import SubjectHeader from '../../Shared/components/ALPComponents/SubjectHeader';
import { useHttpClient } from '../../Shared/hooks/http-hook';

const EducatorAddQuizPage = (props) => {
  const [showAddQuizzes, setShowAddQuizzes] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [quizId, setQuizId] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [quizState, inputHandler, setData] = useForm(
    {
      question1: {
        value: '',
        isValid: false,
      },
      question2: {
        value: '',
        isValid: false,
      },
      question3: {
        value: '',
        isValid: false,
      },
      question4: {
        value: '',
        isValid: false,
      },
      question5: {
        value: '',
        isValid: false,
      },
      question6: {
        value: '',
        isValid: false,
      },
      question7: {
        value: '',
        isValid: false,
      },
      question8: {
        value: '',
        isValid: false,
      },
      question9: {
        value: '',
        isValid: false,
      },
      question10: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  console.log('quizState ', quizState);

  const displayAlertHandler = () => {
    setShowAlert(true);
  };
  const closeAlertHandler = () => {
    setShowAlert(false);
  };

  const discardNBackHandler = () => {
    closeAlertHandler();
    props.onBack();
  };

  // Add topic content's "SAVE TOPIC" button's submit handler
  const saveQuizHandler = async (event) => {
    event.preventDefault();

    const quizArr = [];
    Object.keys(quizState.inputs).map(function (key, index) {
      const questionItem = quizState.inputs[key];

      // Converting the quiz question to a json file
      const questionContent = questionItem.value.topicContent.value;
      const questionBlob = new Blob([JSON.stringify(questionContent)], {
        type: 'application/json;charset=utf-8',
      });
      let questionFile = new File([questionBlob], 'question.json', {
        type: 'application/json',
      });

      const singleQuestion = {
        question: questionFile,
        solution: questionItem.value.solution.value,
        option1: questionItem.value.answer1.value,
        option2: questionItem.value.answer2.value,
        option3: questionItem.value.answer3.value,
        option4: questionItem.value.answer4.value,
        answer: questionItem.value.radio.value,
      };
      quizArr.push(singleQuestion);
    });

    console.log('quizArr ', quizArr);

    // ! Adding a quiz before adding the questions
    try {
      const sectionId = props.selectedSection.id;

      const responseData = await sendRequest(
        'http://localhost:5000/api/educator/quiz',
        'POST',
        JSON.stringify({
          sectionId: sectionId,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      const newQuizId = responseData.quiz.id;
      setQuizId(newQuizId);

      Object.keys(quizState.inputs).map(async function (key, index) {
        const questionItem = quizState.inputs[key];

        // Converting the quiz question to a json file
        const questionContent = questionItem.value.topicContent.value;
        const questionBlob = new Blob([JSON.stringify(questionContent)], {
          type: 'application/json;charset=utf-8',
        });
        let questionFile = new File([questionBlob], 'question.json', {
          type: 'application/json',
        });

        const singleQuestion = {
          question: questionFile,
          solution: questionItem.value.solution.value,
          option1: questionItem.value.answer1.value,
          option2: questionItem.value.answer2.value,
          option3: questionItem.value.answer3.value,
          option4: questionItem.value.answer4.value,
          answer: questionItem.value.radio.value,
        };

        try {
          const formData = new FormData();
          formData.append('quizId', newQuizId);
          formData.append('question', singleQuestion.question);
          if (singleQuestion.solution) {
            formData.append('solution', singleQuestion.solution);
          }
          formData.append('option1', singleQuestion.option1);
          formData.append('option2', singleQuestion.option2);
          formData.append('option3', singleQuestion.option3);
          formData.append('option4', singleQuestion.option4);
          formData.append('answer', singleQuestion.answer);

          const responseData = await sendRequest(
            'http://localhost:5000/api/educator/question',
            'POST',
            formData
          );
        } catch (error) {
          console.log(error.message);
        }
      });

      // quizArr.forEach(async (questionItem) => {
      //   try {
      //     const formData = new FormData();
      //     formData.append('quizId', newQuizId);
      //     formData.append('question', questionItem.question);
      //     if (questionItem.solution) {
      //       formData.append('solution', questionItem.solution);
      //     }
      //     formData.append('option1', questionItem.option1);
      //     formData.append('option2', questionItem.option2);
      //     formData.append('option3', questionItem.option3);
      //     formData.append('option4', questionItem.option4);
      //     formData.append('answer', questionItem.answer);

      //     const responseData = await sendRequest(
      //       'http://localhost:5000/api/educator/question',
      //       'POST',
      //       formData
      //     );
      //   } catch (error) {
      //     console.log(error.message);
      //   }
      // });
    } catch (error) {
      console.log(error.message);
    }

    const newQuizDetails = {
      subject: props.selectedSubject,
      chapter: props.selectedChapter,
      section: props.selectedSection,
      quiz: quizState.inputs,
    };
    // console.log(newQuizDetails.quiz);
    props.onAddingQuizzes(newQuizDetails, quizId);
    setShowAddQuizzes(false);
    props.displayQuiz();
  };

  // let myObject;
  // useEffect(() => {
  //   myObject = {
  //     question1: {
  //       value: {
  //         topicContent: {
  //           value: {
  //             ops: [
  //               {
  //                 insert: 'dff\n',
  //               },
  //             ],
  //           },
  //           isValid: true,
  //         },
  //         radio: {
  //           value: 'dfd',
  //           isValid: true,
  //         },
  //         answer1: {
  //           value: 'df',
  //           isValid: true,
  //         },
  //         answer2: {
  //           value: 'df',
  //           isValid: true,
  //         },
  //         answer3: {
  //           value: 'df',
  //           isValid: true,
  //         },
  //         answer4: {
  //           value: 'dfd',
  //           isValid: true,
  //         },
  //         solution: {
  //           value: '',
  //           isValid: true,
  //         },
  //       },
  //       isValid: true,
  //     },
  //     question2: {
  //       value: {
  //         topicContent: {
  //           value: {
  //             ops: [
  //               {
  //                 insert: 'fdf\n',
  //               },
  //             ],
  //           },
  //           isValid: true,
  //         },
  //         radio: {
  //           value: 'df',
  //           isValid: true,
  //         },
  //         answer1: {
  //           value: 'df',
  //           isValid: true,
  //         },
  //         answer2: {
  //           value: 'df',
  //           isValid: true,
  //         },
  //         answer3: {
  //           value: 'df',
  //           isValid: true,
  //         },
  //         answer4: {
  //           value: 'df',
  //           isValid: true,
  //         },
  //         solution: {
  //           value: '',
  //           isValid: true,
  //         },
  //       },
  //       isValid: true,
  //     },
  //   };

  //   const quizArr = [];
  //   Object.keys(myObject).map(function (key, index) {
  //     const questionItem = myObject[key];

  //     // Converting the quiz question to a json file
  //     const questionContent = questionItem.value.topicContent.value;
  //     const questionBlob = new Blob([JSON.stringify(questionContent)], {
  //       type: 'application/json;charset=utf-8',
  //     });
  //     let questionFile = new File([questionBlob], 'question.json', {
  //       type: 'application/json',
  //     });

  //     const singleQuestion = {
  //       question: questionFile,
  //       solution: questionItem.value.solution.value,
  //       option1: questionItem.value.answer1.value,
  //       option2: questionItem.value.answer2.value,
  //       option3: questionItem.value.answer3.value,
  //       option4: questionItem.value.answer4.value,
  //       answer: questionItem.value.radio.value,
  //     };
  //     quizArr.push(singleQuestion);
  //   });
  //   console.log(quizArr);
  // }, [myObject]);

  return (
    <React.Fragment>
      <Alert
        header={'Want to go back?'}
        alertContent={
          <React.Fragment>
            <p>This quiz data will be lost permanently.</p>
          </React.Fragment>
        }
        leftButtonText="CANCEL"
        rightButtonText="DISCARD AND BACK"
        showAlert={showAlert}
        closeAlertHandler={closeAlertHandler}
        onConfirm={discardNBackHandler}
      />

      <CSSTransition
        // in={props.show}
        in={showAddQuizzes}
        timeout={200}
        classNames="EducatorAddTopicPg"
        mountOnEnter
        unmountOnExit
      >
        <Card className="topic-content-card">
          <header className={`topic-content-header`}>
            {/* <div
              className="topic-content-header-back-btn-container"
              onClick={displayAlertHandler}
            >
              <SvgIcon
                icon="M15 19l-7-7 7-7"
                color="#333333"
                size="3rem"
                fill="none"
                strokeWidth={1.8}
                className="topic-content-header-back-icon"
              />
              <p>Back</p>
            </div> */}

            <p className="topic-content-header-text">
              Add quiz questions with answers (1-10)
            </p>
          </header>

          <SubjectHeader
            // showQuizCommentBtn={showQuizCommentBtn}
            info={{
              subject: props.selectedSubject,
              chapter: props.selectedChapter,
              section: props.selectedSection,
            }}
          />
          <div className="line-bottom" />
          <form onSubmit={saveQuizHandler}>
            {Array.from(Array(10), (e, i) => {
              return (
                <Input
                  element="quizQuestion"
                  id={`question${i + 1}`}
                  question={i + 1}
                  onInput={inputHandler}
                  validators={[VALIDATOR_QUIZ()]}

                  // className="quiz-quill-editor"
                  // label={`Question ${props.question}`}
                  // errorText="Please enter the question"
                />
              );
            })}

            <footer className={`topic-content-footer`}>
              {/* <Button
                type="button"
                danger
                className="topic-content-header-discard-btn"
                onClick={displayAlertHandler}
              >
                DISCARD
              </Button> */}
              <Button
                className="topic-content-header-save-btn"
                inverse
                submit
                disabled={!quizState.isFormValid}
              >
                SAVE QUIZ
              </Button>
            </footer>
          </form>
        </Card>
      </CSSTransition>
    </React.Fragment>
  );
};

export default EducatorAddQuizPage;
