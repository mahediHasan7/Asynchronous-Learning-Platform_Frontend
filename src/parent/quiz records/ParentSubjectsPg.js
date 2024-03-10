import React, { useState, useContext, useCallback, useEffect } from 'react';
import { StudentContext } from '../../Shared/context/StudentContext';
import ParentSubjectsList from './ParentSubjectsList';

const ParentSubjectsPg = (props) => {
  const studentContext = useContext(StudentContext);

  return (
    <React.Fragment>
      <ParentSubjectsList
        subjectsList={props.subjectsList}
        onViewQuizzes={props.onViewQuizzes}
      />
    </React.Fragment>
  );
};

export default ParentSubjectsPg;
