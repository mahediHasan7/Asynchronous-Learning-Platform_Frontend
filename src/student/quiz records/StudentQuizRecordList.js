import './StudentQuizRecordList.css';
import React from 'react';
import StudentQuizRecordItem from './StudentQuizRecordItem';
import SvgIcon from '../../Shared/components/UIElements/SvgIcon';
import Card from '../../Shared/components/UIElements/Card';

const StudentQuizRecordList = (props) => {
  // if (props.quizList.length === 0) {
  //   return (
  //     <div className="center">
  //       <Card>
  //         <h2>No section found!</h2>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <Card className="student-quiz-record-card">
      <div className="student-quiz-record-header">
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
        <p className="student-quiz-record-header-title">Attempted quiz list</p>
      </div>

      <div className="student-quiz-record-scroll-container">
        <table className="student-quiz-record-list-container">
          <thead>
            <tr>
              <th>Chapter</th>
              <th>Section</th>
              <th>Total marks</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {props.quizRecords.map((quizRecord) => {
              return (
                <StudentQuizRecordItem
                  key={quizRecord.id}
                  id={quizRecord.id}
                  chapter={quizRecord.chapter}
                  section={quizRecord.section}
                  totalMarks={quizRecord.marks}
                  onViewQuiz={props.onViewQuiz}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StudentQuizRecordList;
