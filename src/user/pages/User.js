import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import Card from '../../Shared/components/UIElements/Card';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import UserList from '../components/UserList';

const User = (props) => {
  const [loadedUsers, setLoadedUsers] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/'
        );

        const modifiedUsers = Promise.all(
          responseData.users.map((u) => {
            return {
              id: u.id,
              name: u.name,
              img: u.image,
              placeCount: u.places.length,
            };
          })
        );

        const finalUsers = await modifiedUsers;

        setLoadedUsers(finalUsers);
      } catch (error) {}
    };
    getUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <Card className="center">Getting users...</Card>}
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && !error && loadedUsers.length !== 0 && (
        <UserList users={loadedUsers} />
      )}
    </React.Fragment>
  );
};

export default User;
