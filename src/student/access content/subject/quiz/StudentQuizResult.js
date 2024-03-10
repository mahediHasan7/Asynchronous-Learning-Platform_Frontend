import React, { useEffect, useState, useCallback, useContext } from 'react';
import Card from '../../../../Shared/components/UIElements/Card';
import './StudentQuizResult.css';
import Button from '../../../../Shared/components/FormElements/Button';
import { useForm } from '../../../../Shared/hooks/form-hook';
import Input from '../../../../Shared/components/FormElements/Input';
import ReactQuill from 'react-quill';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';
import { useHttpClient } from '../../../../Shared/hooks/http-hook';
import { AuthContext } from '../../../../Shared/context/AuthContext';

const StudentQuizResult = (props) => {
  const auth = useContext(AuthContext);

  const [result, setResult] = useState(0);
  const [answers, setAnswers] = useState();
  const [showCorrectAnswer, setShowCorrectAnswer] = useState();
  const [clickedAnswerBtn, setClickedAnswerBtn] = useState();
  const [showSolution, setShowSolution] = useState();
  const [clickedSolutionBtn, setClickedSolutionBtn] = useState();

  const [quizState, inputHandler, setData] = useForm();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const answerBtnHandler = (e) => {
    // console.log(e.currentTarget.id);
    setClickedAnswerBtn(+e.currentTarget.id);

    setShowCorrectAnswer(true);
  };

  const solutionBtnHandler = (e) => {
    setClickedSolutionBtn(+e.currentTarget.id);
    setShowSolution(true);
  };

  const getAnswers = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/answers/${props.masterAnswerId}`
      );

      setAnswers(responseData.answers);
    } catch (error) {
      setAnswers();
    }
  });
  console.log(props.quizzes);

  useEffect(() => {
    getAnswers();
  }, [props.masterAnswerId]);

  useEffect(() => {
    if (answers) {
      for (let i = 0; i < props.quizzes.length; i++) {
        if (i >= answers.length) {
          break;
        }
        if (answers[i].answer === props.quizzes[i].answer) {
          setResult((prevResult) => {
            return prevResult + 1;
          });
        }
      }
    }
  }, [answers]);

  // Saving the result as quiz record
  useEffect(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/quiz-record`,
        'POST',
        JSON.stringify({
          studentId: auth.loggedInUser_asynchronous.id,
          quizId: props.quizzes[0].QuizId,
          subjectId: props.subject.id,
          chapterId: props.chapter.id,
          sectionId: props.section.id,
          marks: result,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }, [result]);

  return (
    <React.Fragment>
      {answers && (
        <Card className="student-quiz-result-card">
          <div className="student-quiz-result-header">
            <div
              className="topic-output-header-back-btn-container"
              onClick={props.onBack}
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
            <p>Quiz Result</p>
            <p>
              <span>Total</span>
              <span>{result}/10</span>
            </p>
          </div>
          <div className="quiz-separator-bottom-line"></div>

          <div className="single-quiz-question">
            {Array.from(Array(10), (j, k) => {
              return (
                <React.Fragment>
                  <p className="quiz-question-num">
                    {`Question ${k + 1} `}
                    {`  ${
                      answers[k].answer === props.quizzes[k].answer
                        ? '\u2705'
                        : '\u274C'
                    }`}
                  </p>
                  <ReactQuill
                    theme={'bubble'}
                    value={props.quizzes[k]}
                    readOnly={true}
                    className="react-quill-for-output readonly"
                  />

                  {Array.from(Array(4), (e, i) => {
                    // console.log(props.question.options[i][`option${i + 1}`]);
                    return (
                      <Input
                        element="radio"
                        type="radio"
                        id={'question' + k + 1}
                        name={k + 1}
                        onInput={inputHandler}
                        className="student-quiz"
                        // textValue={`option${i + 1}:${
                        //   props.quizzes[k].options[i][`option${i + 1}`]
                        // }`}
                        checked={
                          answers[k].answer ===
                          props.quizzes[k][`option${i + 1}`]

                          // attemptedAnswer ===
                          // props.quizzes[k].options[i][`option${i + 1}`]
                        }
                        inputForLabel={
                          // props.quizzes[k].options[i][`option${i + 1}`]
                          props.quizzes[k][`option${i + 1}`]
                        }
                      />
                    );
                  })}

                  <div className="student-quiz-result-check-answer">
                    <Button
                      onClick={answerBtnHandler}
                      className="student-quiz-result-btn"
                      name={k + 1}
                      id={k + 1}
                    >
                      Check answer
                    </Button>
                    {showCorrectAnswer && clickedAnswerBtn === k + 1 && (
                      <p className="quiz-correct-answer">
                        {props.quizzes[k].answer}
                      </p>
                    )}
                  </div>

                  <div className="student-quiz-result-solution">
                    <Button
                      onClick={solutionBtnHandler}
                      className="student-quiz-result-btn"
                      id={k + 1}
                      disabled={!props.quizzes[k].solution}
                    >
                      Step-by-step solution
                    </Button>
                    {showSolution && clickedSolutionBtn === k + 1 && (
                      <img
                        src={`http://localhost:5000/${props.quizzes[k].solution}`}
                        alt="step-by-step"
                        width="350px"
                      />
                    )}
                  </div>
                  <div className="quiz-separator-bottom-line"></div>
                </React.Fragment>
              );
            })}
          </div>
        </Card>
      )}
    </React.Fragment>
  );
};

export default StudentQuizResult;
