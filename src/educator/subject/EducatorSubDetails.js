import React from 'react';
import Card from '../../../Shared/components/UIElements/Card';
import './SubDetails.css';

const SubDetails = (props) => {
  return (
    <React.Fragment>
      <Card className="sub-details-container">
        <div className="sub-details-name-code-grade-desc-container">
          <div className="sub-desc-top-elements">
            <p>Subject: {props.subject.name}</p>
            <p>Subject code: {props.subject.code}</p>
            <p>Grade: {props.subject.grade}</p>
          </div>
          <div className="sub-details-line" />
          <p className="sub-details-desc">{props.subject.description}</p>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default SubDetails;
