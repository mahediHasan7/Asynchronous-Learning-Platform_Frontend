import React, { useCallback, useEffect, useState } from 'react';
import { useHttpClient } from '../../../Shared/hooks/http-hook';
import NewestContentList from './NewestContentList';

const NewestContent = (props) => {
  const [newContents, setNewContents] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getTopicsForDashboard = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/topics`
      );
      setNewContents(responseData.topics);
    } catch (error) {
      setNewContents([]);
    }
  });

  useEffect(() => {
    getTopicsForDashboard();
  }, []);

  return (
    <React.Fragment>
      <NewestContentList newContents={newContents} />
    </React.Fragment>
  );
};

export default NewestContent;
