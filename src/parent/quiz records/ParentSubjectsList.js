import React from 'react';
import Card from '../../Shared/components/UIElements/Card';
import ParentSubjectsItem from './ParentSubjectsItem';

const ParentSubjectsList = (props) => {
  return (
    <Card className="student-access-content-card">
      <div className="student-access-content-header">
        <p className="student-access-content-header-title">
          Quiz records for enrolled subjects
        </p>
      </div>

      <div className="student-access-content-scroll-container">
        <table className="student-access-content-container">
          <thead>
            <tr>
              <th>Subject name</th>
              <th>Grade</th>
              <th>Subject Code</th>
              <th>Educator Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.subjectsList.map((subject) => (
              <ParentSubjectsItem
                key={subject.id}
                subId={subject.id}
                name={subject.name}
                grade={subject.grade}
                code={subject.code}
                description={subject.description}
                educator={subject.educator}
                createdAt={subject.createdAt}
                onViewQuizzes={props.onViewQuizzes}
                forQuizzes={props.forQuizzes}
                forFavorites={props.forFavorites}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ParentSubjectsList;
