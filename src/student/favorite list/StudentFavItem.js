import React, { useState } from 'react';
import SvgIcon from '../../Shared/components/UIElements/SvgIcon';

const StudentFavItem = (props) => {
  const viewButtonHandler = () => {
    props.onViewTopic(props.id);
  };

  const favButtonHandler = () => {
    props.favBtnHandler(props.id);
  };

  return (
    <React.Fragment>
      <tr>
        <td>{props.topicTitle}</td>
        <td>{props.chapter}</td>
        <td>{props.section}</td>

        <td>
          <div onClick={viewButtonHandler} className="student-fav-view-btn">
            <SvgIcon
              icon="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              secondPath="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              color="#313537"
              size="1.6rem"
              fill="none"
              strokeWidth={2}
              className="student-fav-view-icon"
            />
            <p>View</p>
          </div>
        </td>

        <td>
          <div onClick={favButtonHandler} className="student-fav-btn">
            <SvgIcon
              icon="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              color="#33A95B"
              size="1.6rem"
              fill="#33A95B"
              strokeWidth={2}
              className="student-fav-icon"
            />
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default StudentFavItem;
