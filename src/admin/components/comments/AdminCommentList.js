import React from 'react';
import Card from '../../../Shared/components/UIElements/Card';
import AdminCommentItem from './AdminCommentItem';

import './AdminCommentList.css';

const AdminCommentList = (props) => {
  return (
    <Card className="comment-page-card">
      <div className="comment-page-header">
        <p className="comment-page-title">{`${
          props.commentList.length === 0
            ? 'No comments found for this section'
            : 'Comments'
        }`}</p>
      </div>

      <div className="comment-page-scroll-container">
        <table className="comment-list-table">
          <tbody>
            {props.commentList.map((comment) => (
              <AdminCommentItem
                key={comment.id}
                id={comment.id}
                userImage={comment.userImage}
                userName={comment.userName}
                userId={comment.userId}
                comment={comment.commentText}
                commentDate={comment.commentDate}
                onDeleteComment={props.onDeleteComment}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AdminCommentList;
