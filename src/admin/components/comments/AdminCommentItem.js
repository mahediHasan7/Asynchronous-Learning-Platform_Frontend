import React, { useState } from 'react';
import Avatar from '../../../Shared/components/UIElements/Avatar';
import SvgIcon from '../../../Shared/components/UIElements/SvgIcon';

const AdminCommentItem = (props) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const deleteButtonHandler = () => {
    props.onDeleteComment(props.id);
  };

  return (
    <React.Fragment>
      <tr>
        <td>
          <div className="comment-page-user-info">
            <Avatar
              image={`http://localhost:5000/${props.userImage}`}
              alt={props.userName}
              width={40}
              className="comment-avatar"
            />
            <p>{props.userName}</p>
            <p>{props.userId}</p>
          </div>
        </td>

        <td>
          <p className="comment-text"> {props.comment}</p>
        </td>

        <td>
          <p> {props.commentDate}</p>
        </td>

        <td>
          <div
            onClick={deleteButtonHandler}
            className="comment-page-delete-btn"
          >
            <SvgIcon
              icon="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              color="#313537"
              size="1.6rem"
              fill="none"
              strokeWidth={2}
              className="comment-page-delete-icon"
            />
            <p>Delete</p>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default AdminCommentItem;
