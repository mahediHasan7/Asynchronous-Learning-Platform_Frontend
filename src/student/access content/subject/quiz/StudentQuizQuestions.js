import React, { useCallback, useContext, useEffect, useState } from 'react';
import Card from '../../../../Shared/components/UIElements/Card';
import StudentQuizSingle from './StudentQuizSingle';
import './StudentQuizQuestions.css';
import Button from '../../../../Shared/components/FormElements/Button';
import { useForm } from '../../../../Shared/hooks/form-hook';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';
import { useHttpClient } from '../../../../Shared/hooks/http-hook';
import { AuthContext } from '../../../../Shared/context/AuthContext';

const StudentQuizQuestions = (props) => {
  const auth = useContext(AuthContext);
  const [quiz, setQuiz] = useState();
  const [masterAnswerId, setMasterAnswerId] = useState();

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

  console.log(quiz);

  const getQuiz = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/quiz/${props.sectionId}`
      );
      setQuiz(responseData.quiz);
    } catch (error) {
      setQuiz();
    }
  });

  const submitQuizHandler = async (e) => {
    e.preventDefault();

    // !first check if the Master Answer already created
    let existMasterAnswer;
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/answer/${quiz[0].QuizId}`
      );

      if (responseData.answer) {
        existMasterAnswer = responseData.answer;
        setMasterAnswerId(existMasterAnswer.id);
      } else {
        existMasterAnswer = undefined;
      }
    } catch (error) {
      console.log(error.message);
    }

    // Creating the master answer first
    try {
      let answerId;
      if (!existMasterAnswer) {
        const responseData = await sendRequest(
          `http://localhost:5000/api/student/answer/`,
          'POST',
          JSON.stringify({
            studentId: auth.loggedInUser_asynchronous.id,
            quizId: quiz[0].QuizId,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        setMasterAnswerId(responseData.answer.id);
        answerId = responseData.answer.id;
      } else {
        answerId = existMasterAnswer.id;
      }

      //  after creating the master Answer, then create all the SingleAnswers
      let counter = 0;
      for (const item in quizState.inputs) {
        // console.log(quizState.inputs[item].value);
        const answer = quizState.inputs[item].value;

        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/student/single-answer/`,
            'POST',
            JSON.stringify({
              answer: answer,
              answerId: answerId,
              counter: existMasterAnswer ? counter : 99,
            }),
            {
              'Content-Type': 'application/json',
            }
          );
        } catch (error) {
          console.log(error.message);
        }
        counter++;
      }
    } catch (error) {
      console.log(error.message);
    }

    props.onSubmitAnswers();
    props.getAttemptedAnswers(quizState.inputs);
  };

  useEffect(() => {
    getQuiz();
  }, [props.sectionId]);

  useEffect(() => {
    props.onSubmitAnswerId(masterAnswerId);
  }, [masterAnswerId]);

  return (
    <Card className="student-quiz-questions-card">
      <div className="student-quiz-result-header">
        <div
          className="topic-output-header-back-btn-container"
          onClick={props.onBackFromQuiz}
        >
          <SvgIcon
            icon="M15 19l-7-7 7-7"
            color="#333333"
            size="3rem"
            fill="none"
            strokeWidth={1.8}
            className="topic-output-header-back-icon"
          />
          <p>Back</p>
        </div>
      </div>
      <div className="quiz-separator-bottom-line"></div>
      {quiz && (
        <form onSubmit={submitQuizHandler}>
          {Array.from(Array(10), (e, i) => {
            return (
              <React.Fragment>
                <StudentQuizSingle
                  id={i + 1}
                  quiz={quiz[i]}
                  inputHandler={inputHandler}
                />
                <div className="quiz-separator-bottom-line"></div>
              </React.Fragment>
            );
          })}
          <footer className="student-quiz-questions-footer">
            <Button
              className="submit-answers-btn"
              submit
              disabled={!quizState.isFormValid}
            >
              SUBMIT ANSWERS
            </Button>
          </footer>
        </form>
      )}
    </Card>
  );
};

export default StudentQuizQuestions;
