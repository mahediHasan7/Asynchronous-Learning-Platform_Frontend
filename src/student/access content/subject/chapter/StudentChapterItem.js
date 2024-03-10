import React, { useCallback, useContext, useEffect, useState } from 'react';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';

import ProgressBar from 'react-animated-progress-bar';
import { AuthContext } from '../../../../Shared/context/AuthContext';
import { useHttpClient } from '../../../../Shared/hooks/http-hook';

const StudentChapterItem = (props) => {
  const auth = useContext(AuthContext);

  const [learningProgress, setLearningProgress] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getQuizRecordsForChapter = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/quiz-records-for-chapter/${auth.loggedInUser_asynchronous.id}/${props.subjectId}/${props.id}`
      );
      const records = responseData.records;
      const totalSections = responseData.totalSections;
      const totalMarks = totalSections * 10; //change here with * 10

      // console.log(
      //   `${auth.loggedInUser_asynchronous.id}/${props.subjectId}/${props.id}`
      // );

      // console.log('totalMarks ', totalMarks);

      let totalAchievedMarks = 0;
      if (records.length > 1) {
        records.forEach((record) => {
          totalAchievedMarks += record.marks;
        });
      } else {
        totalAchievedMarks = records[0].marks;
      }

      // console.log('totalAchievedMarks ', totalAchievedMarks);
      const progressInPercentage = (totalAchievedMarks / totalMarks) * 100;
      console.log('progressInPercentage ', progressInPercentage);

      setLearningProgress(progressInPercentage);
    } catch (error) {
      setLearningProgress();
    }
  });

  const viewButtonHandler = () => {
    props.onViewChapter(props.id);
  };

  useEffect(() => {
    getQuizRecordsForChapter();
  }, [props.id]);

  return (
    <React.Fragment>
      <tr>
        <td>{props.chapterName}</td>
        <td>{props.totalSections}</td>
        <td>{props.totalTopics}</td>
        <td>{props.totalQuizzes}</td>
        <td>
          {learningProgress >= 0 && (
            <ProgressBar
              key={props.id}
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

export default StudentChapterItem;
