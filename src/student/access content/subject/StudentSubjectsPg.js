import React, { useState, useContext, useCallback, useEffect } from 'react';
import { AuthContext } from '../../../Shared/context/AuthContext';
import { StudentContext } from '../../../Shared/context/StudentContext';
import { useHttpClient } from '../../../Shared/hooks/http-hook';
import StudentSubjectsList from './StudentSubjectsList';

const StudentSubjectsPg = (props) => {
  const studentContext = useContext(StudentContext);

  const [subjects, setSubjects] = useState(studentContext.enrolledSubjects);

  return (
    <React.Fragment>
      <StudentSubjectsList
        subjectsList={subjects}
        forQuizzes={props.forQuizzes}
        forFavorites={props.forFavorites}
        onViewQuizzes={props.onViewQuizzes}
      />
    </React.Fragment>
  );
};

export default StudentSubjectsPg;
