import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import Card from '../../Shared/components/UIElements/Card';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';

const UserPlace = (props) => {
  const [userPlaces, setUserPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  const getUsers = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/places/user/${userId}`
      );
      setUserPlaces(responseData);
    } catch (error) {
      setUserPlaces([]);
    }
  };

  useEffect(() => {
    getUsers();
  }, [sendRequest, userId]);

  const onDeleteHandler = () => {
    getUsers();
  };

  return (
    <React.Fragment>
      {isLoading && <Card>Getting Places for this user...</Card>}
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && userPlaces.length !== 0 && (
        <PlaceList places={userPlaces} updateOnDelete={onDeleteHandler} />
      )}

      {!isLoading && userPlaces.length === 0 && (
        <p className="center">No Place Found for this user!</p>
      )}
    </React.Fragment>
  );
};

export default UserPlace;
