import React from 'react';
import Button from '../../../Shared/components/FormElements/Button';
import Card from '../../../Shared/components/UIElements/Card';
import './StudentSubDetails.css';

const StudentSubDetails = (props) => {
  return (
    <React.Fragment>
      <Card className="student-sub-details-container">
        <div
          className={`${
            props.enabledButtons
              ? 'adjust-padding'
              : 'student-sub-details-name-code-grade-desc-container'
          }`}
        >
          <div className="student-sub-desc-top-elements">
            <p>Subject: {props.subject.name}</p>

            {props.chapter ? (
              <p>Chapter: {props.chapter.name}</p>
            ) : (
              <p>Subject code: {props.subject.code}</p>
            )}
            {props.section ? (
              <p>Section: {props.section.name}</p>
            ) : (
              <p>Grade: {props.subject.grade}</p>
            )}
            {props.enabledButtons && (
              <div className="student-sub-details-btn-container">
                <Button
                  button
                  disabled={props.onActiveQuiz}
                  onClick={props.onShowQuiz}
                >
                  QUIZ
                </Button>
                <Button
                  button
                  disabled={props.onActiveComment}
                  onClick={props.onShowComment}
                >
                  COMMENTS
                </Button>
              </div>
            )}
          </div>
          {!props.enabledButtons && (
            <React.Fragment>
              <div className="student-sub-details-line" />
              <p className="student-sub-details-desc">
                {props.subject.description}
              </p>
            </React.Fragment>
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default StudentSubDetails;
