import React from 'react';

import Button from '../../Shared/components/FormElements/Button';
import Card from '../../Shared/components/UIElements/Card';
import EducatorCommentItem from './EducatorCommentItem';

import './EducatorCommentList.css';

const EducatorCommentList = (props) => {
  return (
    <Card className="comment-page-card">
      <div className="educator-subjects-list-header">
        <p className="educator-subjects-list-header-title">Comments</p>
        <Button onClick={props.onAddComment}>
          <span style={{ fontSize: '4rem', paddingBottom: '.2rem' }}>
            &#43;
          </span>
          &nbsp;&nbsp; ADD COMMENT
        </Button>
      </div>
      <div className="comment-page-header-bottom-line" />

      <div className="comment-page-scroll-container">
        <table className="comment-list-table">
          <tbody>
            {props.commentList.map((comment) => (
              <EducatorCommentItem
                key={comment.id}
                id={comment.id}
                userName={comment.userName}
                userId={comment.userId}
                role={comment.userRole}
                userImage={comment.userImage}
                comment={comment.commentText}
                commentDate={comment.createdAt.split('T')[0]}
                onDeleteComment={props.onDeleteComment}
                onReplyComment={props.onReplyComment}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default EducatorCommentList;
