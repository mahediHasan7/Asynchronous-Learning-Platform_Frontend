import React, { useState, useContext, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import Button from '../../Shared/components/FormElements/Button';
import Modal from '../../Shared/components/UIElements/Modal';
import QuillOutput from '../../Shared/components/UIElements/QuillOutput';
import { EducatorContext } from '../../Shared/context/EducatorContext';
import { useForm } from '../../Shared/hooks/form-hook';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import EducatorTopicList from './EducatorTopicList';

const EducatorTopicPg = (props) => {
  const educatorContext = useContext(EducatorContext);

  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState();
  const [showTopic, setShowTopic] = useState(false);
  const [topicContent, setTopicContent] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getTopics = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/topics/${props.sectionId}`
      );
      setTopics(responseData.topics);
    } catch (error) {
      setTopics([]);
    }
  });

  const deleteTopicHandler = async (topicId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/topic/${topicId}`,
        'DELETE',
        null
      );
    } catch (error) {
      console.log(error.message);
    }

    setTopics((prevTopics) => {
      const tempTopics = [...prevTopics];
      const filteredTopics = tempTopics.filter((topic) => {
        return topic.id !== topicId;
      });
      return filteredTopics;
    });
  };

  const accessSingleTopic = async (topicId) => {
    setShowTopic(true);
    setTopicId(topicId); // for edit topic in quill output file
  };

  const closeTopicCard = () => {
    setShowTopic(false);
    getTopics();
  };

  useEffect(() => {
    setTopics([]);
    getTopics();
  }, [props.sectionId, props.updatedFromBack]);

  return (
    <React.Fragment>
      <CSSTransition
        in={props.onShow && !showTopic}
        timeout={200}
        classNames="EducatorTopicPg"
        mountOnEnter
        unmountOnExit
      >
        <React.Fragment>
          {topics && (
            <EducatorTopicList
              topicLists={topics}
              onAddTopic={props.onAddTopic}
              onAccessTopic={accessSingleTopic}
              onDeleteTopic={deleteTopicHandler}
            />
          )}
        </React.Fragment>
      </CSSTransition>
      {showTopic && topicId && (
        <QuillOutput onBack={closeTopicCard} topicId={topicId} />
      )}
    </React.Fragment>
  );
};

export default EducatorTopicPg;
