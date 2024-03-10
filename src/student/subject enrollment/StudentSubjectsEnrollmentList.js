import './StudentSubjectsEnrollmentList.css';
import React from 'react';
import StudentSubjectsItem from './StudentSubjectsEnrollmentItem';
import Button from '../../Shared/components/FormElements/Button';
import Card from '../../Shared/components/UIElements/Card';

const StudentSubjectsEnrollmentList = (props) => {
  return (
    <Card className="student-card-subjects-list">
      <div className="student-subjects-list-header">
        <p className="student-subjects-list-header-title">Enrolled Subjects</p>
        {!props.isViewContent && (
          <Button
            onClick={props.enrollSubjectHandler}
            disabled={props.status !== 'approved'}
          >
            <span style={{ fontSize: '4rem', paddingBottom: '.2rem' }}>
              &#43;{' '}
            </span>
            &nbsp;&nbsp; ENROLL NEW SUBJECT
          </Button>
        )}
      </div>

      <div className="student-subjects-list-scroll-container">
        <table className="student-subjects-list-container">
          <thead>
            <tr>
              <th>Subject name</th>
              <th>Grade</th>
              <th>Code</th>
              <th>Total enrollments</th>
              <th>Teach by</th>
            </tr>
          </thead>
          <tbody>
            {props.enrolledSubjects.map((subject) => (
              <StudentSubjectsItem
                key={subject.id}
                id={subject.id}
                name={subject.name}
                grade={subject.grade}
                code={subject.code}
                description={subject.description}
                enrollments={subject.enrollment}
                enrolledStudents={subject.enrolledStudents}
                educator={subject.educator}
                createdAt={subject.createdAt}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StudentSubjectsEnrollmentList;
