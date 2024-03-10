import './EducatorSubjectsList.css';
import React from 'react';
import EducatorSubjectsItem from './EducatorSubjectsItem';
import Button from '../../Shared/components/FormElements/Button';
import Card from '../../Shared/components/UIElements/Card';

const EducatorSubjectsList = (props) => {
  return (
    <Card className="card-educator-subjects-list">
      <div className="educator-subjects-list-header">
        <p className="educator-subjects-list-header-title">
          Registered Subjects
        </p>
        {!props.isViewContent && (
          <Button
            onClick={props.registerSubjectHandler}
            disabled={props.status !== 'approved'}
          >
            <span style={{ fontSize: '4rem', paddingBottom: '.2rem' }}>
              &#43;{' '}
            </span>
            &nbsp;&nbsp; REGISTER NEW SUBJECT
          </Button>
        )}
      </div>

      <div className="educator-subjects-list-scroll-container">
        <table className="educator-subjects-list-container">
          <thead>
            <tr>
              <th>Subject name</th>
              <th>Grade</th>
              <th>Code</th>
              <th>Enrollments</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.registeredSubjects.map((subject) => (
              <EducatorSubjectsItem
                key={subject.id}
                id={subject.id}
                name={subject.name}
                grade={subject.grade}
                code={subject.code}
                description={subject.description}
                enrollments={subject.enrollment}
                educator={subject.educator}
                createdAt={subject.createdAt}
                onUnregister={props.onUnregister}
                onShowEnrolledStudents={props.onShowEnrolledStudents}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default EducatorSubjectsList;
