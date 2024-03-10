import React, { useCallback, useEffect, useState } from 'react';
import Card from '../UIElements/Card';
import ProgressBar from 'react-animated-progress-bar';

import './QuizReport.css';
import { useHttpClient } from '../../hooks/http-hook';

const QuizReport = (props) => {
  const [quizStats, setQuizStats] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getQuizStats = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/quiz-stats-students/${props.subjectId}/${props.quizId}`
      );

      setQuizStats(responseData.quizStats);
    } catch (error) {
      setQuizStats();
    }
  });
  useEffect(() => {
    getQuizStats();
  }, [props.subjectId, props.quizId]);

  console.log('quizStats ', quizStats);
  return (
    <React.Fragment>
      {quizStats && (
        <Card className="quizReport-card">
          <header className={`quizReport-header`}>
            <p className="quizReport-header-text">Quiz report</p>
            <div className="quiz-report-line-bottom" />

            <div className="quiz-reports-data-container">
              <div className="quiz-report-bars">
                <div className="bar-and-text">
                  <p>STUDENTS</p>
                  {quizStats.studentPercentage > 0 && (
                    <ProgressBar
                      key={quizStats.studentPercentage}
                      width="80%"
                      height="1.1rem"
                      rect
                      fontColor="#4d4d4d"
                      percentage={quizStats.studentPercentage}
                      rectPadding="1px"
                      rectBorderRadius="20px"
                      trackPathColor="transparent"
                      bgColor="#33A95B"
                      trackBorderColor="grey"
                    />
                  )}
                </div>
                <div className="bar-and-text">
                  <p>ACCURACY</p>
                  {quizStats.accuracyPercentage > 0 && (
                    <ProgressBar
                      key={quizStats.studentPercentage}
                      width="80%"
                      height="1.1rem"
                      rect
                      fontColor="#4d4d4d"
                      percentage={quizStats.accuracyPercentage}
                      rectPadding="1px"
                      rectBorderRadius="20px"
                      trackPathColor="transparent"
                      bgColor="#33A95B"
                      trackBorderColor="grey"
                    />
                  )}
                </div>
              </div>
              <div className="quiz-report-stats">
                <div>
                  <p className="stat-small-text">Assigned</p>
                  <p className="stats-large-text">
                    {quizStats.assigned} Students
                  </p>
                </div>
                <div>
                  <p className="stat-small-text">Completed</p>
                  <p className="stats-large-text">
                    {quizStats.completed} Students
                  </p>
                </div>
                <div>
                  <p className="stat-small-text">Incomplete</p>
                  <p className="stats-large-text">
                    {quizStats.incomplete} Students
                  </p>
                </div>
              </div>
            </div>
          </header>
        </Card>
      )}
    </React.Fragment>
  );
};

export default QuizReport;
