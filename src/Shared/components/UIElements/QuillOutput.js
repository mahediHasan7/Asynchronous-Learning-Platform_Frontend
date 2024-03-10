import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import Delta from 'quill-delta';
import 'react-quill/dist/quill.bubble.css';

import SvgIcon from './SvgIcon';
import Card from './Card';
import './QuillOutput.css';
import Button from '../FormElements/Button';
import EducatorAddTopicPage from '../../../educator/content management/EducatorAddTopicPage';
import { useHttpClient } from '../../hooks/http-hook';

const QuillOutput = (props) => {
  // console.log('QuillOutput: ', props);
  const [topic, setTopic] = useState();
  const [outputValue, setOutputValue] = useState();
  const [showEditTopicCard, setShowEditTopicCard] = useState(false);
  const quillOutputRef = useRef();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getTopic = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/topic/${props.topicId}`
      );
      console.log(responseData.topic);
      setTopic(responseData.topic);
    } catch (error) {
      setTopic();
    }
  });

  const displayEditTopicCard = () => {
    setShowEditTopicCard(true);
  };
  const closeEditTopicCard = () => {
    setShowEditTopicCard(false);
  };

  const editTopicHandler = () => {
    displayEditTopicCard();
  };

  const saveChangesHandler = async (topic) => {
    // console.log('Editor Content=> ', editorContent);
    setOutputValue(topic);
    setTopic(topic);
    closeEditTopicCard();
    getTopic();
  };

  useEffect(() => {
    getTopic();
  }, []);

  return (
    <React.Fragment>
      {topic && (
        <div>
          {!showEditTopicCard && (
            <Card className="topic-output-card-container">
              <div className="topic-output-header">
                <div
                  className="topic-output-header-back-btn-container"
                  onClick={props.onBack}
                >
                  <SvgIcon
                    icon="M15 19l-7-7 7-7"
                    color="#333333"
                    size="3rem"
                    fill="none"
                    strokeWidth={1.8}
                    className="topic-output-header-back-icon"
                  />
                  <p>Back</p>
                </div>

                <p className="topic-output-topic-title">{topic.title}</p>
                <Button inverse onClick={editTopicHandler}>
                  EDIT TOPIC
                </Button>
              </div>
              {topic.description && (
                <p className="topic-output-topic-description">
                  {topic.description}
                </p>
              )}
              <div className="topic-output-top-line"></div>

              <ReactQuill
                ref={quillOutputRef}
                theme={'bubble'}
                value={topic.content.ops}
                readOnly={true}
                // onChange={(content, delta, source, editor) => {
                //   setQuillContentForEdit(editor.getContents());
                // }}
                className="react-quill-for-output readonly"
              />

              <div className="topic-page-bottom">
                <div className="topic-output-bottom-line"></div>

                <React.Fragment>
                  {topic.lectureNote && (
                    <a
                      href={`http://localhost:5000/${topic.lectureNote}`}
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

                        <p>{`${topic.title}.${
                          `http://localhost:5000/${topic.lectureNote}`.split(
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

          <EducatorAddTopicPage
            show={showEditTopicCard}
            topicTitle={topic.title}
            topicDescription={topic.description}
            lectureNote={`http://localhost:5000/${topic.lectureNote}`}
            topicContent={topic.content.ops}
            onBack={closeEditTopicCard}
            onEditTopic={saveChangesHandler}
            topicId={props.topicId}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default QuillOutput;
