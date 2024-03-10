import './SubjectsList.css';
import Card from '../../../Shared/components/UIElements/Card';
import React from 'react';
import SubjectsItem from './SubjectsItem';
import Button from '../../../Shared/components/FormElements/Button';

const SubjectsList = (props) => {
  return (
    <Card className="card-subjects-list">
      <div className="subjects-list-header">
        <p className="subjects-list-header-title">Added Subjects</p>
        {!props.isViewContent && (
          <Button onClick={props.addSubjectHandler}>
            <span style={{ fontSize: '4rem', paddingBottom: '.2rem' }}>
              &#43;{' '}
            </span>
            &nbsp;&nbsp; ADD SUBJECT
          </Button>
        )}
      </div>

      <div className="subjects-list-scroll-container">
        <table className="subjects-list-container">
          <thead>
            <tr>
              <th>Subject name</th>
              <th>Grade</th>
              <th>Code</th>
              <th>Enrollments</th>
              <th>Educator</th>
              <th>Added</th>
              <th></th>
              {!props.isViewContent && <th></th>}
            </tr>
          </thead>
          <tbody>
            {props.subjectsList.map((subject) => (
              <SubjectsItem
                key={subject.id}
                subId={subject.id}
                name={subject.name}
                grade={subject.grade}
                code={subject.code}
                description={subject.description}
                enrollments={subject.enrollments}
                educator={subject.educator}
                createdAt={subject.createdAt.split('T')[0]}
                editSubjectHandler={props.editSubjectHandler}
                onDelete={props.onDelete}
                onEdit={props.onEdit}
                isViewContent={props.isViewContent}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default SubjectsList;
