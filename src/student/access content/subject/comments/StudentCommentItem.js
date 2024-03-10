import React, { useState } from 'react';
import Avatar from '../../../../Shared/components/UIElements/Avatar';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';

const StudentCommentItem = (props) => {
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
            <p>{`${
              props.role === 'educator' ? 'Educator Id: ' : 'Student Id: '
            }${props.userId}`}</p>
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
            onClick={props.onReplyComment}
            className="comment-page-reply-btn"
          >
            <SvgIcon
              icon="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              color="#33A95B"
              size="1.6rem"
              fill="none"
              strokeWidth={2}
              className="comment-page-reply-icon"
            />
            <p>Reply</p>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default StudentCommentItem;
