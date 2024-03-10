import React, { useRef, useState, useEffect } from 'react';
import Button from './Shared/components/FormElements/Button';
import Card from './Shared/components/UIElements/Card';
import { useHttpClient } from './Shared/hooks/http-hook';

const TestDeleteLater = (props) => {
  const [file, setFile] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fileChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/quiz/${1}`,
        'GET',
        null
      );

      console.log(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Card>
      {/* <input type="file" onChange={fileChangeHandler} /> */}
      <Button onClick={fileUploadHandler}>Upload!</Button>
    </Card>
  );
};

export default TestDeleteLater;
