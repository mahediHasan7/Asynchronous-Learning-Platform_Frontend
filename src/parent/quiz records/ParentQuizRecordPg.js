import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../Shared/context/AuthContext';
import { useHttpClient } from '../../Shared/hooks/http-hook';

import ParentQuizRecordList from './ParentQuizRecordList';

const ParentQuizRecordPg = (props) => {
  const auth = useContext(AuthContext);
  const [quizRecords, setQuizRecords] = useState([]);
  const [showSingleQuiz, setShowSingleQuiz] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getQuizRecords = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/quiz-records/${auth.loggedInUser_asynchronous.studentId}/${props.subject.id}`
      );
      setQuizRecords(responseData.records);
    } catch (error) {
      setQuizRecords([]);
    }
  });

  const displaySingleQuiz = () => {
    setShowSingleQuiz(true);
  };
  const closeSingleQuiz = () => {
    setShowSingleQuiz(false);
  };

  const viewQuizHandler = (quizId) => {
    displaySingleQuiz();
  };

  useEffect(() => {
    getQuizRecords();
  }, [props.subject]);

  return (
    <React.Fragment>
      {!showSingleQuiz && quizRecords && (
        <ParentQuizRecordList
          quizRecords={quizRecords}
          onViewQuiz={viewQuizHandler}
          onBack={props.onBack}
        />
      )}
    </React.Fragment>
  );
};

export default ParentQuizRecordPg;
