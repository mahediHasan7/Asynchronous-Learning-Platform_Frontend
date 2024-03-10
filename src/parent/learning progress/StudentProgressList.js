import './StudentProgressList.css';
import React from 'react';
import StudentProgressItem from './StudentProgressItem';
import Card from '../../Shared/components/UIElements/Card';

const StudentProgressList = (props) => {
  return (
    <Card className="parent-st-learning-progress-card">
      <div className="parent-st-learning-progress-header">
        <p className="parent-st-learning-progress-header-title">
          {props.student.name}'s learning progress by subject
        </p>
      </div>

      <div className="parent-st-learning-progress-scroll-container">
        <table className="parent-st-learning-progress-list-container">
          <thead>
            <tr>
              <th>Subject name</th>
              <th>Total chapters</th>
              <th>Total sections</th>
              <th>Total topics</th>
              <th>Learning progress</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.progressList.map((subject) => (
              <StudentProgressItem
                key={subject.subject}
                id={subject.subject}
                subjectName={subject.subject}
                totalChapters={subject.totalChapters}
                totalSections={subject.totalSections}
                totalTopics={subject.totalTopics}
                progress={subject.progress}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StudentProgressList;
