import './ParentQuizRecordList.css';
import React from 'react';
import ParentQuizRecordItem from './ParentQuizRecordItem';
import SvgIcon from '../../Shared/components/UIElements/SvgIcon';
import Card from '../../Shared/components/UIElements/Card';

const ParentQuizRecordList = (props) => {
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
        <p className="student-quiz-record-header-title">
          Attempted quiz list with marks
        </p>
      </div>

      <div className="student-quiz-record-scroll-container">
        <table className="student-quiz-record-list-container">
          <thead>
            <tr>
              <th>Quiz list by Id</th>
              <th>Chapter name</th>
              <th>Section name</th>
              <th>Total achieved marks</th>
            </tr>
          </thead>
          <tbody>
            {props.quizRecords.map((quizRecord) => {
              return (
                <ParentQuizRecordItem
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

export default ParentQuizRecordList;
