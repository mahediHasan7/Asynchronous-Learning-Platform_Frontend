import React from 'react';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Button from '../../Shared/components/FormElements/Button';
import Input from '../../Shared/components/FormElements/Input';
import Alert from '../../Shared/components/UIElements/Alert';
import Card from '../../Shared/components/UIElements/Card';
import QuillEditor from '../../Shared/components/UIElements/QuillEditor';
import QuillOutput from '../../Shared/components/UIElements/QuillOutput';
import SvgIcon from '../../Shared/components/UIElements/SvgIcon';
import { useForm } from '../../Shared/hooks/form-hook';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../Shared/util/validators';
import './EducatorAddTopicPage.css';

const EducatorAddTopicPage = (props) => {
  const [showAlert, setShowAlert] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [editorState, inputHandler, setData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },

      description: {
        value: '',
        isValid: true,
      },
      lectureNote: {
        value: '',
        isValid: true,
      },
      topicContent: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const displayAlertHandler = () => {
    setShowAlert(true);
  };
  const closeAlertHandler = () => {
    setShowAlert(false);
  };

  const discardNBackHandler = () => {
    closeAlertHandler();
    props.onBack();
  };

  // Add topic content's "SAVE TOPIC" button's submit handler
  const saveTopicHandler = async (event) => {
    event.preventDefault();
    // console.log('EducatorAddTopicPage SaveTopicHandler->: ', editorState);
    console.log(props.topicId);
    if (props.onEditTopic) {
      const topicId = props.topicId;
      const title = editorState.inputs.title.value;
      const description = editorState.inputs.description.value;
      const lectureNote = editorState.inputs.lectureNote.value;
      const content = editorState.inputs.topicContent.value;

      // Creating the content file
      const contentBlob = new Blob([JSON.stringify(content)], {
        type: 'application/json;charset=utf-8',
      });
      let contentFile = new File([contentBlob], 'content.json', {
        type: 'application/json',
      });

      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (lectureNote) {
          formData.append('lectureNote', lectureNote, lectureNote.name);
        }
        formData.append('content', contentFile);

        const responseData = await sendRequest(
          `http://localhost:5000/api/educator/topic/${topicId}`,
          'PATCH',
          formData
        );

        console.log('PATCH data: ', responseData.topic);

        // // console.log(responseData);
        // //! setting content for showing in QuillOutput after saving the topic
        // const lectureNoteFromServer = responseData.topic.lectureNote;
        // const modifiedEditorState = { ...editorState };
        // modifiedEditorState.inputs.lectureNote.value = lectureNoteFromServer;
        props.onEditTopic(responseData.topic);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      props.onSaveTopic(editorState);
    }
  };

  return (
    <React.Fragment>
      <Alert
        header={'Want to go back?'}
        alertContent={
          <React.Fragment>
            {/* <p>Topic name: </p> <p>{props.name}</p>
            <p>Last modified: </p> <p>{props.createdAt}</p> */}
            <p>This new topic's content will be lost.</p>
          </React.Fragment>
        }
        leftButtonText="CANCEL"
        rightButtonText="DISCARD AND BACK"
        showAlert={showAlert}
        closeAlertHandler={closeAlertHandler}
        onConfirm={discardNBackHandler}
      />

      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="EducatorAddTopicPg"
        mountOnEnter
        unmountOnExit
      >
        <Card className="topic-content-card">
          <header className={`topic-content-header`}>
            <div
              className="topic-content-header-back-btn-container"
              onClick={displayAlertHandler}
            >
              <SvgIcon
                icon="M15 19l-7-7 7-7"
                color="#333333"
                size="3rem"
                fill="none"
                strokeWidth={1.8}
                className="topic-content-header-back-icon"
              />
              <p>Back</p>
            </div>
            <p className="topic-content-header-text">Add topic content</p>
          </header>

          <form onSubmit={saveTopicHandler}>
            <div className={`topic-content`}>
              <React.Fragment>
                <Input
                  element="input"
                  id="title"
                  type="text"
                  label="Topic title"
                  onInput={inputHandler}
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid title"
                  placeholder="Topic title"
                  initialValue={props.topicTitle}
                  initialIsValid={
                    typeof props.topicTitle != 'string' ? false : true
                  }
                />

                <Input
                  element="textarea"
                  id="description"
                  type="text"
                  label="Topic description"
                  onInput={inputHandler}
                  validators={[VALIDATOR_MINLENGTH(0)]}
                  // errorText="Please enter a valid title"
                  placeholder="Short description (optional)"
                  initialValue={props.topicDescription}
                  initialIsValid={true}
                />

                <Input
                  element="file"
                  type="file"
                  id="lectureNote"
                  label="Lecture note (.pdf or word file only)"
                  accept="application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  // errorText="Please upload the lecture note again"
                  onInput={inputHandler}
                  // initialIsValid={
                  //   props.lectureNote
                  //     ? typeof props.lectureNote != 'string'
                  //       ? true
                  //       : false
                  //     : true
                  // }
                />

                <Input
                  element="quillEditor"
                  id="topicContent"
                  label="Topic content"
                  onInput={inputHandler}
                  // onChangeEditorValue={quillEditorContentHandler}
                  topicContent={props.topicContent}
                />
              </React.Fragment>
            </div>

            <footer className={`topic-content-footer`}>
              <Button
                danger
                className="topic-content-header-discard-btn"
                onClick={displayAlertHandler}
                // style={!showButtons ? { display: 'none' } : {}}
              >
                DISCARD
              </Button>
              <Button
                className="topic-content-header-save-btn"
                inverse
                submit
                disabled={
                  !editorState.inputs.title.isValid ||
                  !editorState.inputs.topicContent.isValid
                }
                // style={!showButtons ? { display: 'none' } : {}}
              >
                SAVE TOPIC
              </Button>
            </footer>
          </form>
        </Card>
      </CSSTransition>
    </React.Fragment>
  );
};

export default EducatorAddTopicPage;
