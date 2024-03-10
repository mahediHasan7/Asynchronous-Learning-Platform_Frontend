import React, { useEffect, useState, useContext } from 'react';
import Card from '../../Shared/components/UIElements/Card';
import { StudentContext } from '../../Shared/context/StudentContext';
import StudentSubjectsPg from '../access content/subject/StudentSubjectsPg';
import StudentFavPg from './StudentFavPg';

const FavListManagementPage = (props) => {
  const studentContext = useContext(StudentContext);
  const [subjects, setSubjects] = useState(studentContext.enrolledSubjects);
  const [showFavList, setShowFavList] = useState();
  const [selectedSub, setSelectedSub] = useState();

  const displayFavList = (subId) => {
    const selectedSubject = subjects.find((sub) => {
      return sub.id === subId;
    });
    setSelectedSub(selectedSubject);
    setShowFavList(true);
  };
  const closeFavList = () => {
    setShowFavList(false);
  };

  let content;
  if (showFavList) {
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
        <StudentFavPg onBack={closeFavList} subject={selectedSub} />;
      </React.Fragment>
    );
  } else {
    content = (
      <StudentSubjectsPg
        subjectsList={subjects}
        forFavorites={true}
        onViewQuizzes={displayFavList}
      />
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export default FavListManagementPage;
