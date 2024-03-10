import React, { useEffect, useState, useContext } from 'react';
import Card from '../../Shared/components/UIElements/Card';
import { StudentContext } from '../../Shared/context/StudentContext';
import StudentSubDetails from '../access content/subject/StudentSubDetails';
import StudentSubjectsPg from '../access content/subject/StudentSubjectsPg';
import StudentQuizRecordPg from './StudentQuizRecordPg';

const QuizRecordManagementPage = (props) => {
  const studentContext = useContext(StudentContext);
  const [subjects, setSubjects] = useState(studentContext.enrolledSubjects);
  const [showQuizRecordList, setShowQuizRecordList] = useState();
  const [selectedSub, setSelectedSub] = useState();

  const displayQuizRecordList = (subId) => {
    const selectedSubject = subjects.find((sub) => {
      return sub.id === subId;
    });
    setSelectedSub(selectedSubject);
    setShowQuizRecordList(true);
  };
  const closeQuizRecordList = () => {
    setShowQuizRecordList(false);
  };

  let content;
  if (showQuizRecordList) {
    content = (
      <React.Fragment>
        <Card
          className="student-quiz-record-card"
          style={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
          <p style={{ fontSize: '1.4rem', fontWeight: '600' }}>
            Subject: {selectedSub.name}
          </p>
          <p style={{ fontSize: '1.4rem', fontWeight: '600' }}>
            Grade: {selectedSub.grade}
          </p>
          <p style={{ fontSize: '1.4rem', fontWeight: '600' }}>
            Code: {selectedSub.code}
          </p>
        </Card>
        {selectedSub && (
          <StudentQuizRecordPg
            onBack={closeQuizRecordList}
            subject={selectedSub}
          />
        )}
        ;
      </React.Fragment>
    );
  } else {
    content = (
      <StudentSubjectsPg
        subjectsList={subjects}
        forQuizzes={true}
        onViewQuizzes={displayQuizRecordList}
      />
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export default QuizRecordManagementPage;
