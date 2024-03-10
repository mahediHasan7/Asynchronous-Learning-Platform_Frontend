import React, { useEffect, useState, useContext, useCallback } from 'react';
import Alert from '../../Shared/components/UIElements/Alert';
import { AuthContext } from '../../Shared/context/AuthContext';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import StudentQuizResult from '../access content/subject/quiz/StudentQuizResult';
import SingleTopicPg from '../access content/subject/topics/SingleTopicPg';
import StudentFavList from './StudentFavList';

let favTopicListsArr = [
  {
    id: 323,
    topicName: 'Topic 2',
    chapter: 'Chapter 1: Algebra of Real Functions',
    section: 'Section 1: Domain',
  },

  {
    id: 325,
    topicName: 'Topic 5',
    chapter: 'Chapter 3: Cartesian Product of Set',
    section: 'Section 3: Complexity',
  },
  {
    id: 326,
    topicName: 'Topic 8',
    chapter: 'Chapter 2: Integration',
    section: 'Section 1: Basic',
  },
  {
    id: 327,
    topicName: 'Topic 11',
    chapter: 'Chapter 1 : Binary Operations',
    section: 'Section 3: Advance',
  },
  {
    id: 328,
    topicName: 'Topic 3',
    chapter: 'Chapter 4: Composition of Functions and Invertible Function',
    section: 'Section 1: Basic',
  },
];

const StudentFavPg = (props) => {
  const auth = useContext(AuthContext);
  const [favTopicList, setFavTopicList] = useState([]);
  const [showSingleTopic, setShowSingleTopic] = useState();
  const [selectedTopic, setSelectedTopic] = useState();
  const [topicId, setTopicId] = useState();
  const [showRemoveFavAlert, setShowRemoveFavAlert] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getFavorites = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/favorites/${props.subject.id}/${auth.loggedInUser_asynchronous.id}`
      );
      setFavTopicList(responseData.favorites);
    } catch (error) {
      setFavTopicList([]);
    }
  });

  const displaySingleTopic = () => {
    setShowSingleTopic(true);
  };
  const closeSingleTopic = () => {
    setShowSingleTopic(false);
  };

  const displayRemoveFavAlert = () => {
    setShowRemoveFavAlert(true);
  };
  const closeRemoveFavAlert = () => {
    setShowRemoveFavAlert(false);
  };

  const viewTopicHandler = (topicId) => {
    const accessedTopic = favTopicList.find((topic) => {
      return topic.topicId === topicId;
    });
    setSelectedTopic(accessedTopic);
    displaySingleTopic();
  };

  const favButtonHandler = (topicId) => {
    displayRemoveFavAlert();
    setTopicId(topicId);
  };

  const removeFavHandler = async () => {
    console.log(topicId);
    // const topicId = selectedTopic.id;

    // Remvoe from the favorite list
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/favorite/${auth.loggedInUser_asynchronous.id}/${topicId}`,
        'DELETE'
      );
      getFavorites();
    } catch (error) {
      console.log(error.message);
    }
    // setFavTopicList((prevTopicArr) => {
    //   const filteredFavTopicArr = prevTopicArr.filter((topic) => {
    //     return topic.id !== topicId;
    //   });
    //   return filteredFavTopicArr;
    // });
    closeRemoveFavAlert();
  };

  useEffect(() => {
    getFavorites();
  }, [props.subject]);

  let content;
  if (showSingleTopic) {
    content = (
      <SingleTopicPg
        topic={{ id: selectedTopic.topicId }}
        onBack={closeSingleTopic}
      />
    );
  } else {
    content = (
      <React.Fragment>
        {topicId && (
          <Alert
            header={'Removing from favorite'}
            alertContent={
              <React.Fragment>
                <p>
                  Are you sure to remove this topic from your favorite list?
                </p>
              </React.Fragment>
            }
            leftButtonText="CANCEL"
            rightButtonText="CONFIRM REMOVE"
            showAlert={showRemoveFavAlert}
            closeAlertHandler={closeRemoveFavAlert}
            onConfirm={removeFavHandler}
          />
        )}

        <StudentFavList
          favTopicList={favTopicList}
          onViewTopic={viewTopicHandler}
          onBack={props.onBack}
          onRemoveFav={removeFavHandler}
          favBtnHandler={favButtonHandler}
        />
      </React.Fragment>
    );
  }

  return <React.Fragment>{content};</React.Fragment>;
};

export default StudentFavPg;
