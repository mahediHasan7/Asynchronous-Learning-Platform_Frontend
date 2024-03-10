import React, { useCallback, useContext, useEffect, useState } from 'react';
import ProgressBar from 'react-animated-progress-bar';

const StudentProgressItem = (props) => {
  return (
    <React.Fragment>
      <tr>
        <td>{props.subjectName}</td>
        <td>{props.totalChapters}</td>
        <td>{props.totalSections}</td>
        <td>{props.totalTopics}</td>
        <td>
          <ProgressBar
            width="70%"
            height="1rem"
            rect
            fontColor="#4d4d4d"
            percentage={props.progress}
            rectPadding="1px"
            rectBorderRadius="20px"
            trackPathColor="transparent"
            bgColor="#33A95B"
            trackBorderColor="grey"
          />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default StudentProgressItem;
