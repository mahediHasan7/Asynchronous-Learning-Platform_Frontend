import './StudentSubjectsList.css';
import Card from '../../../Shared/components/UIElements/Card';
import React from 'react';
import StudentSubjectsItem from './StudentSubjectsItem';
import Button from '../../../Shared/components/FormElements/Button';

const StudentSubjectsList = (props) => {
  // if (props.subjectsList.length === 0) {
  //   return (
  //     <div className="center">
  //       <Card>
  //         <h2>No subject found!</h2>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <Card className="student-access-content-card">
      <div className="student-access-content-header">
        {props.forQuizzes ? (
          <p className="student-access-content-header-title">
            View attempted quizzes from enrolled subjects
          </p>
        ) : props.forFavorites ? (
          <p className="student-access-content-header-title">
            View favorite topics from enrolled subjects
          </p>
        ) : (
          <p className="student-access-content-header-title">
            Enrolled Subjects
          </p>
        )}
      </div>

      <div className="student-access-content-scroll-container">
        <table className="student-access-content-container">
          <thead>
            <tr>
              <th>Subject name</th>
              <th>Grade</th>
              <th>Code</th>
              <th>Educator</th>
              <th>{props.forFavorites ? 'Total Favorites' : 'Enrollments'}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.subjectsList.map((subject) => (
              <StudentSubjectsItem
                key={subject.id}
                subId={subject.id}
                name={subject.name}
                grade={subject.grade}
                code={subject.code}
                description={subject.description}
                enrollments={subject.enrollment}
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

export default StudentSubjectsList;
