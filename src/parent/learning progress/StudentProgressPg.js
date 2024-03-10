import React, { useEffect, useState, useContext, useCallback } from 'react';
import Avatar from '../../Shared/components/UIElements/Avatar';
import Card from '../../Shared/components/UIElements/Card';
import { AuthContext } from '../../Shared/context/AuthContext';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import StudentProgressList from './StudentProgressList';

const StudentProgressPg = (props) => {
  const auth = useContext(AuthContext);
  const [learningProgress, setLearningProgress] = useState();
  const [student, setStudent] = useState();
  const [status, setStatus] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  const getStudentDetails = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/parent/student-details/${auth.loggedInUser_asynchronous.studentId}`
      );
      setStudent(responseData.student);
    } catch (error) {
      setStudent();
    }
  });

  const getStudentProgress = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/parent/student-progress/${auth.loggedInUser_asynchronous.studentId}`
      );
      console.log(responseData.progress);
      setLearningProgress(responseData.progress);
    } catch (error) {
      setLearningProgress([]);
    }
  });

  useEffect(() => {
    getStatus();
    getStudentDetails();
    getStudentProgress();
  }, []);

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
      {student && (
        <Card className="parent-st-details-card">
          <div className="parent-st-details-avatar-card">
            <Avatar
              image={`http://localhost:5000/${student.image}`}
              alt={`${student.name.split(' ').slice(0, 2).join(' ')}'s image`}
              width={70}
              className="parent-st-details-avatar"
            />
          </div>
          <div className="parent-st-learning-progress-student-info ">
            <div className="parent-st-learning-progress-student-info-parts">
              <div>
                <p>Student Name: {student.name}</p>
                <p>Email: {student.email}</p>
                <p>Phone: {student.phone}</p>
              </div>
            </div>
          </div>
          <div className="parent-st-learning-progress-student-info ">
            <div className="parent-st-learning-progress-student-info-parts">
              <div>
                <p> Student ID: {student.id}</p>
                <p> Grade: {student.grade}</p>
              </div>
            </div>
          </div>
        </Card>
      )}
      {learningProgress && student && status === 'approved' && (
        <StudentProgressList
          student={student}
          progressList={learningProgress}
        />
      )}
    </React.Fragment>
  );
};

export default StudentProgressPg;
