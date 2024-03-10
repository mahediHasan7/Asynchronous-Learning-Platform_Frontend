import React from 'react';
import Button from '../../../Shared/components/FormElements/Button';
import Card from '../../../Shared/components/UIElements/Card';
import './ViewContentHeader.css';

const ViewContentHeader = (props) => {
  return (
    <React.Fragment>
      <Card className="view-content-header-container">
        <div className="view-content-header-name-chapter-section-buttons-container">
          <div className="view-content-header-name-chapter-section">
            <p>Subject: {props.info.subject.name}</p>
            <p>Chapter: {props.info.chapter.name}</p>
            <p>Section: {props.info.section.name}</p>
          </div>
          <div className="view-content-header-button-container">
            <Button>QUIZ</Button>
            <Button onClick={props.onClickComment}>COMMENTS</Button>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default ViewContentHeader;
