import React, { useState, useContext, useEffect } from 'react';
import Button from '../../Shared/components/FormElements/Button';
import Alert from '../../Shared/components/UIElements/Alert';
import SvgIcon from '../../Shared/components/UIElements/SvgIcon';
import { AuthContext } from '../../Shared/context/AuthContext';

const EducatorTopicItem = (props) => {
  const auth = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);

  const showAlertHandler = () => {
    setShowAlert(true);
  };
  const closeAlertHandler = () => {
    setShowAlert(false);
  };

  const accessTopicHandler = () => {
    props.onAccessTopic(props.id);
  };

  const deleteTopicHandler = () => {
    showAlertHandler();
  };

  return (
    <React.Fragment>
      <Alert
        header={'Want to delete?'}
        alertContent={
          <React.Fragment>
            <p>Topic name: </p> <p>{props.name}</p>
            <p>Last modified: </p> <p>{props.createdAt}</p>
            <p>Are you sure to delete this topic?</p>
          </React.Fragment>
        }
        leftButtonText="CANCEL"
        rightButtonText="CONFIRM DELETE"
        showAlert={showAlert}
        closeAlertHandler={closeAlertHandler}
        onConfirm={props.onDeleteTopic.bind(null, props.id)}
      />

      <tr>
        <td>{props.name}</td>
        <td>{props.createdAt}</td>
        <td>
          <Button
            className="educator-topic-list-access-btn"
            inverse
            onClick={accessTopicHandler}
          >
            Access Topic
          </Button>
        </td>

        <td>
          <div onClick={deleteTopicHandler}>
            <SvgIcon
              icon="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              color="#f34343"
              size="2.2rem"
              fill="none"
              strokeWidth={1.8}
              className="educator-topic-list-delete-icon"
            />
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default EducatorTopicItem;
