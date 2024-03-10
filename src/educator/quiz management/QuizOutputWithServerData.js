import React, { useCallback } from 'react';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { useEffect } from 'react';
import QuizReport from '../../Shared/components/ALPComponents/QuizReport';
import Card from '../../Shared/components/UIElements/Card';
import SubjectHeader from '../../Shared/components/ALPComponents/SubjectHeader';
import { useHttpClient } from '../../Shared/hooks/http-hook';

const QuizOutputWithServerData = (props) => {
  const [quizData, setQuizData] = useState();
  const [quizId_quizReport, setQuizId_quizReport] = useState();
  const [subjectId_quizReport, setSubjectId_quizReport] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  console.log(subjectId_quizReport, quizId_quizReport);

  const subject = props.selectedSubject;
  const chapter = props.selectedChapter;
  const section = props.selectedSection;

  const getQuiz = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/quiz/${section.id}`
      );
      if (responseData) {
        const quizDataFromServer = {
          subject: props.selectedSubject.subject,
          chapter: props.selectedChapter.chapter,
          section: props.selectedSection.section,
          quiz: responseData.quiz,
        };
        setQuizData(quizDataFromServer);
      }
    } catch (error) {
      setQuizData();
    }
  });

  useEffect(() => {
    getQuiz();
  }, [section]);

  useEffect(() => {
    if (quizData) {
      if (quizData.quiz[0]) {
        setQuizId_quizReport(quizData.quiz[0].QuizId);
        setSubjectId_quizReport(subject.id);
      }
    }
  }, [quizData, subject]);

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

      {subjectId_quizReport && quizId_quizReport && (
        <QuizReport
          subjectId={subjectId_quizReport}
          quizId={quizId_quizReport}
        />
      )}

      {quizData && (
        <Card className="quizOutput-card">
          <header className={`quizOutput-header`}>
            <p className="quizOutput-header-text">
              Quiz questions with selected answer (1-10)
            </p>
          </header>
          <div className="line-bottom" />

          {quizData.quiz.map((question, index) => {
            // console.log(question);
            // console.log(question[`option${i + 1}`]);
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
                  return (
                    <React.Fragment>
                      <label>
                        <input
                          checked={
                            question.answer === question[`option${i + 1}`]
                              ? question.answer
                              : undefined
                          }
                          disabled
                          id="radio"
                          type="radio"
                          name={`Question ${index + 1}`}
                          className="quizOutput-quiz-answers"
                          value={question[`option${i + 1}`]}
                        />

                        {question[`option${i + 1}`]}
                      </label>
                      <br />
                    </React.Fragment>
                  );
                })}
                <div className="quizOutput-step-by-step-solution">
                  <p className="step-by-step-solution-title">
                    Step-by-step solution
                  </p>

                  {question.solution && (
                    <img
                      src={`http://localhost:5000/${question.solution}`}
                      alt="solution"
                    />
                  )}
                  {!question.solution && (
                    <p style={{ marginBottom: '1rem', color: '#EBEBE4' }}>
                      No solution provided by the educator
                    </p>
                  )}
                </div>
                <div className="quiz-question-separator" />
              </React.Fragment>
            );
          })}
        </Card>
      )}
    </React.Fragment>
  );
};

export default QuizOutputWithServerData;
