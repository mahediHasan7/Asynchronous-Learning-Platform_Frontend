import React, { useState } from 'react';
import SvgIcon from '../../Shared/components/UIElements/SvgIcon';

const ParentQuizRecordItem = (props) => {
  const viewButtonHandler = () => {
    props.onViewQuiz(props.id);
  };

  return (
    <React.Fragment>
      <tr>
        <td>Quiz {props.id}</td>
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
      </tr>
    </React.Fragment>
  );
};

export default ParentQuizRecordItem;
