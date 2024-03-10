import React, { useState } from 'react';
import SvgIcon from '../../Shared/components/UIElements/SvgIcon';

const StudentQuizRecordItem = (props) => {
  const viewButtonHandler = () => {
    props.onViewQuiz(props.id);
  };

  return (
    <React.Fragment>
      <tr>
        <td>{props.chapter}</td>
        <td>{props.section}</td>
        <td>
          {props.totalMarks === 10 ? (
            <span style={{ color: '#33A95B', fontWeight: '600' }}>
              {`${props.totalMarks}/10`}
            </span>
          ) : props.totalMarks <= 5 ? (
            <span style={{ color: '#f34343', fontWeight: '600' }}>
              {`${props.totalMarks}/10`}
            </span>
          ) : (
            <span style={{ fontWeight: '600' }}>
              {' '}
              {`${props.totalMarks}/10`}
            </span>
          )}
        </td>
        {/* <td>
          <div
            onClick={viewButtonHandler}
            className="student-quiz-list-view-btn"
          >
            <SvgIcon
              icon="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              secondPath="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              color="#313537"
              size="1.6rem"
              fill="none"
              strokeWidth={2}
              className="student-quiz-list-view-icon"
            />
            <p>View</p>
          </div>
        </td> */}
      </tr>
    </React.Fragment>
  );
};

export default StudentQuizRecordItem;
