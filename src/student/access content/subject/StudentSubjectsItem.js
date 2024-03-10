import React, { useState, useContext, useCallback } from 'react';
import { useEffect } from 'react/cjs/react.development';
import Button from '../../../Shared/components/FormElements/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Shared/context/AuthContext';
import { useHttpClient } from '../../../Shared/hooks/http-hook';

const StudentSubjectsItem = (props) => {
  const [totalFavs, setTotalFavs] = useState(0);

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getFavorites = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/favorites/${props.subId}/${auth.loggedInUser_asynchronous.id}`
      );
      setTotalFavs(responseData.favorites.length);
    } catch (error) {
      setTotalFavs(0);
    }
  });

  useEffect(() => {
    getFavorites();
  }, [props.subId]);
  return (
    <React.Fragment>
      <tr>
        <td>{props.name}</td>
        <td>{props.grade}</td>
        <td>{props.code}</td>
        <td>{props.educator}</td>
        <td>{props.forFavorites ? totalFavs : props.enrollments}</td>
        <td>
          {props.forQuizzes ? (
            <Button
              className="student-access-content-btn"
              inverse
              onClick={props.onViewQuizzes.bind(null, props.subId)}
            >
              View quiz records
            </Button>
          ) : props.forFavorites ? (
            <Button
              className="student-access-content-btn"
              inverse
              onClick={props.onViewQuizzes.bind(null, props.subId)}
            >
              View favorite topics
            </Button>
          ) : (
            <Link to={`/student/subjects/${props.name}/${props.subId}/`}>
              <Button className="student-access-content-btn" inverse>
                Access content
              </Button>
            </Link>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default StudentSubjectsItem;
