import React from 'react';
import Card from '../UIElements/Card';
import SubjectHeader from './SubjectHeader';
import './QuizOutput.css';
import QuillOutput from '../UIElements/QuillOutput';
import ReactQuill from 'react-quill';
import Input from '../FormElements/Input';
import { useState } from 'react';
import { useEffect } from 'react';
import QuizReport from './QuizReport';

const QuizOutput = (props) => {
  const [imageUrls, setImageUrls] = useState([]);

  // console.log(props.quizData);

  const subject = props.quizData.subject;
  const chapter = props.quizData.chapter;
  const section = props.quizData.section;

  Object.entries(props.quizData.quiz).map((question) => {
    // console.log(question[1].value.answer1.value);
  });

  // Getting the image url from the file
  useEffect(() => {
    Object.entries(props.quizData.quiz).map((question) => {
      if (question[1].value.solution.value) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setImageUrls((prevUrls) => {
            return [...prevUrls, fileReader.result];
          });
        };
        fileReader.readAsDataURL(question[1].value.solution.value);
      } else {
        setImageUrls((prevUrls) => {
          return [...prevUrls, ''];
        });
      }
    });
  }, [props.quizData]);

  console.log(
    props.quizData.quiz,
    props.quizData.quiz[0] ? props.quizData.quiz[0].id : 'not found!'
  );

  return (
    <React.Fragment>
      <SubjectHeader
        showCard={true}
        info={{
          subject: subject,
          chapter: chapter,
          section: section,
        }}
      />

      <QuizReport subjectId={subject.id} quizId={props.newQuizId} />

      <Card className="quizOutput-card">
        <header className={`quizOutput-header`}>
          <p className="quizOutput-header-text">
            Quiz questions with selected answer (1-10)
          </p>
        </header>
        <div className="line-bottom" />

        {/* {props.quizData.map((question, index) => {
          // getting the topic content for the Quill output
          // const topicContent = question[1].value.topicContent.value;

          return (
            <React.Fragment>
              <p className="quizOutput-question-no">{`Question ${
                index + 1
              }`}</p>
              <ReactQuill
                theme={'bubble'}
                value={question.question}
                readOnly={true}
                className="react-quill-for-output readonly"
              />
              <p className="step-by-step-solution-title">
                Answers for {`Question ${index + 1}`}:
              </p>
              {Array.from(Array(4), (e, i) => {
                const option = `option${i + 1}`;
                return (
                  <React.Fragment>
                    <label>
                      <input
                        checked={question.answer}
                        disabled
                        id="radio"
                        type="radio"
                        name={`Question ${index + 1}`}
                        className="quizOutput-quiz-answers"
                        value={question.option}
                      />

                      {question.option}
                    </label>
                    <br />
                  </React.Fragment>
                );
              })}
              <div className="quizOutput-step-by-step-solution">
                <p className="step-by-step-solution-title">
                  Step-by-step solution
                </p>

                <img
                  src={`http://localhost:5000/${question.solution}`}
                  alt="solution"
                />
              </div>
              <div className="quiz-question-separator" />
            </React.Fragment>
          );
        })} */}

        {Object.entries(props.quizData.quiz).map((question) => {
          // getting the topic content for the Quill output
          const topicContent = question[1].value.topicContent.value;

          return (
            <React.Fragment>
              <p className="quizOutput-question-no">{question[0]}</p>
              <ReactQuill
                theme={'bubble'}
                value={topicContent}
                readOnly={true}
                className="react-quill-for-output readonly"
              />
              <p className="step-by-step-solution-title">
                Answers for {question[0]}:
              </p>
              {Array.from(Array(4), (e, i) => {
                return (
                  <React.Fragment>
                    <label>
                      <input
                        checked={
                          question[1].value['answer' + (i + 1)].value ===
                          question[1].value.radio.value
                            ? question[1].value.radio.value
                            : undefined
                        }
                        disabled
                        id="radio"
                        type="radio"
                        name={question[0]}
                        className="quizOutput-quiz-answers"
                        value={question[1].value.radio.value}
                        // onChange={inputChangeHandler}
                      />

                      {question[1].value['answer' + (i + 1)].value}
                    </label>
                    <br />
                  </React.Fragment>
                );
              })}
              <div className="quizOutput-step-by-step-solution">
                <p className="step-by-step-solution-title">
                  Step-by-step solution
                </p>

                <img
                  src={imageUrls[question[0].replace(/\D/g, '') - 1]}
                  alt={question[1].value.solution.value.name}
                />
              </div>
              <div className="quiz-question-separator" />
            </React.Fragment>
          );
        })}

        <footer className={`quizOutput-footer`}>
          {/* <Button
                type="button"
                danger
                className="topic-content-header-discard-btn"
                onClick={displayAlertHandler}
              >
                DISCARD
              </Button> */}
          {/* <Button
            className="topic-content-header-save-btn"
            inverse
            submit
            disabled={!quizState.isFormValid}
          >
            SAVE QUIZ
          </Button> */}
        </footer>
      </Card>
    </React.Fragment>
  );
};

export default QuizOutput;
