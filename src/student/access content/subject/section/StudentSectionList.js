import './StudentSectionList.css';
import React from 'react';
import Button from '../../../../Shared/components/FormElements/Button';
import Card from '../../../../Shared/components/UIElements/Card';
import StudentSectionItem from './StudentSectionItem';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';

const StudentSectionList = (props) => {
  return (
    <Card className="student-card-section-list">
      <div className="student-section-list-header">
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
        <p className="student-section-header-title">List of Sections</p>
        <p className="student-section-header-chapter">
          Chapter: {props.selectedChapter}
        </p>
      </div>

      <div className="student-section-list-scroll-container">
        <table className="student-section-list-container">
          <thead>
            <tr>
              <th>Section name</th>
              <th>Total topics</th>
              <th>Quiz</th>
              <th>Learning progress</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.sectionList.map((section) => (
              <StudentSectionItem
                key={section.id}
                id={section.id}
                sectionName={section.name}
                totalSections={section.totalSections}
                totalTopics={section.totalTopics}
                quizzes={section.quiz}
                learningProgress={section.learningProgress}
                lastUpdated={section.lastUpdated}
                onViewSection={props.onViewSection}
                onBack={props.onBack}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StudentSectionList;
