import Modal from './Modal';

import './Alert.css';
import Button from '../FormElements/Button';
import React from 'react';

const Alert = (props) => {
  return (
    <Modal
      className={`alert-modal`}
      contentClass={`alert-modal-content`}
      headerClass={`alert-modal--header`}
      footerClass={`alert-modal--footer`}
      show={props.showAlert}
      onClick={props.closeAlertHandler}
      header={props.header}
      footer={
        <React.Fragment>
          <Button
            className="alert-cancel-btn"
            onClick={props.closeAlertHandler}
          >
            {props.leftButtonText}
          </Button>
          {props.rightButtonText !== 'NULL' && (
            <Button
              className="alert-confirm-btn"
              inverse
              onClick={props.onConfirm}
            >
              {props.rightButtonText}
            </Button>
          )}
        </React.Fragment>
      }
    >
      {props.alertContent}
    </Modal>
  );
};

export default Alert;
