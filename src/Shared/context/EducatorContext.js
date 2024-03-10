import React from 'react';

export const EducatorContext = React.createContext({
  registeredSubjects: null,
  setRegisteredSubjects: (subjects) => {},
});
