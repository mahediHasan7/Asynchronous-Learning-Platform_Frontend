import React, { useState } from 'react';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';

const StudentTopicsItem = (props) => {
  const viewButtonHandler = () => {
    props.onViewTopic(props.id);
  };

  return (
    <React.Fragment>
      <tr>
        <td>{props.topicName}</td>
        <td>{props.lastUpdated}</td>
        <td>{props.favorite}</td>
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

export default StudentTopicsItem;
