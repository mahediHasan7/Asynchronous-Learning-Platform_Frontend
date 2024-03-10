import React from 'react';

export const StudentContext = React.createContext({
  enrolledSubjects: null,
  setEnrolledSubjects: (subjects) => {},
});
