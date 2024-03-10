import React, { useContext, useState, useCallback, useEffect } from 'react';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';
import { AuthContext } from '../../../../Shared/context/AuthContext';
import { useHttpClient } from '../../../../Shared/hooks/http-hook';
import ProgressBar from 'react-animated-progress-bar';

const StudentSectionItem = (props) => {
  const auth = useContext(AuthContext);

  const [learningProgress, setLearningProgress] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getQuizRecords = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/quiz-record/${auth.loggedInUser_asynchronous.id}/${props.id}`
      );
      const record = responseData.record;
      const mark = record.marks;
      console.log(mark);
      const progressInPercentage = (mark / 10) * 100; // change here with /10

      setLearningProgress(progressInPercentage);
    } catch (error) {
      setLearningProgress();
    }
  });

  const viewButtonHandler = () => {
    props.onViewSection(props.id);
  };

  useEffect(() => {
    getQuizRecords();
  }, [props.id]);

  return (
    <React.Fragment>
      <tr>
        <td>{props.sectionName}</td>
        <td>{props.totalTopics}</td>
        <td>{props.quizzes}</td>
        <td>
          {learningProgress >= 0 && (
            <ProgressBar
              width="70%"
              height=".8rem"
              rect
              fontColor="#4d4d4d"
              percentage={learningProgress}
              rectPadding="1px"
              rectBorderRadius="20px"
              trackPathColor="transparent"
              bgColor="#33A95B"
              trackBorderColor="grey"
            />
          )}
        </td>
        <td>
          <div
            onClick={viewButtonHandler}
            className="student-chap-list-view-btn"
          >
            <SvgIcon
              icon="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              secondPath="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              color="#313537"
              size="1.6rem"
              fill="none"
              strokeWidth={2}
              className="student-chap-list-view-icon"
            />
            <p>View</p>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default StudentSectionItem;
