import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import SubjectsPg from '../components/subject/SubjectsPg';
import './SubjectsPage.css';

const SubjectsPage = (props) => {
  const [subjects, setSubjects] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/subjects`
      );
      setSubjects(responseData.subjects);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="subject-page-container">
        <SubjectsPg subjects={subjects} />
      </div>
    </React.Fragment>
  );
};

export default SubjectsPage;
