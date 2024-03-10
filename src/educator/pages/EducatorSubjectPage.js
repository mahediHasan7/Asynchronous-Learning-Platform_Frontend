import React, { useEffect, useState } from 'react';
import EducatorSubjectsPg from '../subject/EducatorSubjectsPg';
import randomWords from 'random-words';
import { useHttpClient } from '../../Shared/hooks/http-hook';

const EducatorSubjectsPage = (props) => {
  const [subjects, setSubjects] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getSubjects = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/subjects/`
      );
      // console.log(responseData);
      setSubjects(responseData.subjects);
    } catch (error) {
      setSubjects([]);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <React.Fragment>
      <div className="educator-subject-page-container">
        <EducatorSubjectsPg
          registeredSubjects={[]}
          availableSubjects={subjects}
        />
      </div>
    </React.Fragment>
  );
};

export default EducatorSubjectsPage;
