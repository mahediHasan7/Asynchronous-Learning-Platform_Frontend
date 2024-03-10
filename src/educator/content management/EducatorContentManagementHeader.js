import React from 'react';
import Button from '../../Shared/components/FormElements/Button';
import Card from '../../Shared/components/UIElements/Card';

import './EducatorContentManagementHeader.css';

const EducatorContentManagementHeader = (props) => {
  const subName = props.info.subject.label.split(':')[0];
  const chapName = props.info.chapter.label.split(':')[0];
  const secName = props.info.section.label.split(':')[0];
  const description = props.info.subject.description;
  return (
    <React.Fragment>
      {/* <Card className="educator-content-header-container"> */}
      <div className="educator-content-main-container">
        <div className="educator-content-header-name-chapter-section">
          <p>Subject: {subName}</p>
          <p>Chapter: {chapName}</p>
          <p>Section: {secName}</p>
        </div>
        {/* {props.showQuizCommentBtn && (
          <div className="educator-content-header-button-container">
            <Button inverse>QUIZ</Button>
            <Button inverse onClick={props.onClickComment}>
              COMMENTS
            </Button>
          </div>
        )} */}
        <div className="educator-content-description">{description}</div>
      </div>
      {/* </Card> */}
    </React.Fragment>
  );
};

export default EducatorContentManagementHeader;
