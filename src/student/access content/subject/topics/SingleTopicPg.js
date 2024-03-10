import React, { useEffect, useState, useContext, useCallback } from 'react';
import ReactQuill from 'react-quill';
import Card from '../../../../Shared/components/UIElements/Card';
import Modal from '../../../../Shared/components/UIElements/Modal';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';
import { AuthContext } from '../../../../Shared/context/AuthContext';
import { useHttpClient } from '../../../../Shared/hooks/http-hook';
import './SingleTopicPg.css';

const SingleTopicPg = (props) => {
  const auth = useContext(AuthContext);
  const [favorite, setFavorite] = useState();
  const [favWarningText, setFavWarningText] = useState();
  const [topicContent, setTopicContent] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const addFav = () => {
    setFavorite(true);
  };

  const removeFav = () => {
    setFavorite(false);
  };

  const getTopic = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/topic/${props.topic.id}`
      );
      setTopicContent(responseData.topic);
    } catch (error) {
      setTopicContent([]);
    }
  });

  const getSingleFavorite = useCallback(async () => {
    // Cheking if already added to the favorite in db
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/favorite/${auth.loggedInUser_asynchronous.id}/${props.topic.id}`
      );
      // setFavWarningText('Aleady added as favorite.');
      addFav();
    } catch (error) {
      // setFavWarningText();
      removeFav();
      console.log(error.message);
    }
  });

  const favButtonHandler = async () => {
    if (!favorite) {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/student/favorite`,
          'POST',
          JSON.stringify({
            studentId: auth.loggedInUser_asynchronous.id,
            topicId: props.topic.id,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        if (responseData.favorite) {
          addFav();
          setFavWarningText('Added');
        }
      } catch (error) {
        removeFav();
        setFavWarningText('Failed!');
        console.log(error.message);
      }
    } else {
      // Remvoe from the favorite list
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/student/favorite/${auth.loggedInUser_asynchronous.id}/${props.topic.id}`,
          'DELETE'
        );
        removeFav();
        setFavWarningText('undone');
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    getTopic();
    getSingleFavorite();
  }, [props.topic.id]);

  useEffect(() => {
    setTimeout(() => {
      setFavWarningText();
    }, 2000);
  }, [favWarningText]);

  return (
    <React.Fragment>
      {topicContent && (
        <Card className="single-topic-output-card">
          <div className="single-topic-header">
            <div
              className="single-topic-back-btn-container"
              onClick={props.onBack}
            >
              <SvgIcon
                icon="M15 19l-7-7 7-7"
                color="#333333"
                size="3rem"
                fill="none"
                strokeWidth={1.8}
                className="single-topic-back-icon"
              />
              <p>Back</p>
            </div>
            <p className="single-topic-header-title">{topicContent.title}</p>
            <div onClick={favButtonHandler}>
              <p className="fav-message-text">{favWarningText}</p>
              <SvgIcon
                icon="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                color="#33a95b"
                size="2.7rem"
                fill="none"
                strokeWidth={1.8}
                className={`single-topic-fav-icon ${
                  favorite && 'selected-as-fav'
                }`}
              />
            </div>
          </div>

          <p className="topic-output-topic-description">
            {topicContent.description}
          </p>

          <div className="topic-output-top-line"></div>
          <ReactQuill
            theme={'bubble'}
            value={topicContent.content}
            readOnly={true}
            className="react-quill-for-output readonly"
          />

          <div className="topic-page-bottom">
            <div className="topic-output-bottom-line"></div>

            <React.Fragment>
              {topicContent.lectureNote && (
                <a
                  href={`http://localhost:5000/${topicContent.lectureNote}`}
                  target="_blank"
                  download
                >
                  <div className="topic-page-pdf">
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 98.63 122.88"
                    >
                      <title>file</title>
                      <path d="M98.63,35.57A3.58,3.58,0,0,0,96,32.12L64.39,1.32A3.53,3.53,0,0,0,61.63,0H6.43A6.42,6.42,0,0,0,0,6.43v110a6.42,6.42,0,0,0,6.43,6.43H92.21a6.42,6.42,0,0,0,6.4-6.43q0-40.45,0-80.88Zm-33.43-23L86.68,32.69H65.2V12.57ZM7.18,115.7V7.15H58V36.26a3.61,3.61,0,0,0,3.61,3.61H91.45q0,37.92,0,75.83Zm13.6-56.62a2.59,2.59,0,0,1,1.91-.88H64.84a2.55,2.55,0,0,1,1.91.87,3.1,3.1,0,0,1,0,4.08,2.55,2.55,0,0,1-1.9.88H22.69a2.57,2.57,0,0,1-1.92-.87,3.1,3.1,0,0,1,0-4.08Zm0,34.7a2.59,2.59,0,0,1,1.91-.88H76.59a2.59,2.59,0,0,1,1.91.88,3.12,3.12,0,0,1,0,4.09,2.6,2.6,0,0,1-1.92.87H22.72a2.6,2.6,0,0,1-1.92-.87,3.12,3.12,0,0,1,0-4.09ZM76.59,75.55a2.59,2.59,0,0,1,1.91.88,3.1,3.1,0,0,1,0,4.08,2.57,2.57,0,0,1-1.92.87H22.72a2.57,2.57,0,0,1-1.92-.87,3.1,3.1,0,0,1,0-4.08,2.59,2.59,0,0,1,1.91-.88ZM20.78,41.72a2.59,2.59,0,0,1,1.91-.88H47.62a2.58,2.58,0,0,1,1.92.87,3.12,3.12,0,0,1,.75,2,3,3,0,0,1-.77,2,2.52,2.52,0,0,1-1.9.88H22.69a2.59,2.59,0,0,1-1.92-.86,3.12,3.12,0,0,1,0-4.09Zm0-17.35a2.59,2.59,0,0,1,1.91-.88H36.41a2.55,2.55,0,0,1,1.91.87,3.1,3.1,0,0,1,0,4.08,2.52,2.52,0,0,1-1.9.88H22.72a2.57,2.57,0,0,1-1.92-.87,3.1,3.1,0,0,1,0-4.08Z" />
                    </svg>

                    <p>{`${topicContent.title}.${
                      `http://localhost:5000/${topicContent.lectureNote}`.split(
                        '.'
                      )[1]
                    }`}</p>
                  </div>
                </a>
              )}
            </React.Fragment>
          </div>
        </Card>
      )}
    </React.Fragment>
  );
};

export default SingleTopicPg;
