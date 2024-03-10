import React, { useEffect, useState, useContext, useCallback } from 'react';
import Card from '../../Shared/components/UIElements/Card';
import { AuthContext } from '../../Shared/context/AuthContext';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import ParentQuizRecordPg from './ParentQuizRecordPg';
import ParentSubjectsPg from './ParentSubjectsPg';

const ParentQuizRecordManagementPage = (props) => {
  const auth = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const [showQuizRecordList, setShowQuizRecordList] = useState();
  const [selectedSub, setSelectedSub] = useState();
  const [status, setStatus] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const displayQuizRecordList = (subId) => {
    const selectedSubject = subjects.find((sub) => {
      return sub.id === subId;
    });
    setSelectedSub(selectedSubject);
    setShowQuizRecordList(true);
  };

  const closeQuizRecordList = () => {
    setShowQuizRecordList(false);
  };

  const getStatus = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/parent/acc-status/${auth.loggedInUser_asynchronous.id}`
      );
      console.log(responseData);
      setStatus(responseData.status);
    } catch (error) {
      setStatus('pending');
    }
  });

  const getSubjects = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/parent/quiz-records/subjects/${auth.loggedInUser_asynchronous.studentId}`
      );

      setSubjects(responseData.subjects);
    } catch (error) {
      setSubjects([]);
    }
  });

  useEffect(() => {
    getStatus();
    getSubjects();
  }, []);

  let content;
  if (showQuizRecordList && status && status === 'approved') {
    content = (
      <React.Fragment>
        <Card
          className="student-quiz-record-card"
          style={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
          <p style={{ fontSize: '1.4rem', fontWeight: '600' }}>
            Subject: {selectedSub.name}
          </p>
          <p style={{ fontSize: '1.4rem', fontWeight: '600' }}>
            Grade: {selectedSub.grade}
          </p>
          <p style={{ fontSize: '1.4rem', fontWeight: '600' }}>
            Code: {selectedSub.code}
          </p>
        </Card>
        {selectedSub && (
          <ParentQuizRecordPg
            onBack={closeQuizRecordList}
            subject={selectedSub}
          />
        )}
        ;
      </React.Fragment>
    );
  } else if (!showQuizRecordList && status && status === 'approved') {
    content = (
      <ParentSubjectsPg
        subjectsList={subjects}
        onViewQuizzes={displayQuizRecordList}
      />
    );
  }

  return (
    <React.Fragment>
      {status && status !== 'approved' && (
        <div
          className={`acc-req-status-container ${
            status === 'approved'
              ? 'acc-req-approved'
              : status === 'declined'
              ? 'acc-req-declined'
              : 'acc-req-pending'
          }`}
        >
          <p>Account request {status}</p>
        </div>
      )}
      {content}
    </React.Fragment>
  );
};

export default ParentQuizRecordManagementPage;
