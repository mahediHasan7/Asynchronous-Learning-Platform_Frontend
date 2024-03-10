import React from 'react';
import Button from '../../../../Shared/components/FormElements/Button';
import Card from '../../../../Shared/components/UIElements/Card';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';
import StudentCommentItem from './StudentCommentItem';

import './StudentCommentList.css';

const StudentCommentList = (props) => {
  console.log(props.commentList);

  return (
    <Card className="comment-page-card">
      <div className="educator-subjects-list-header">
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
              <StudentCommentItem
                key={comment.id}
                id={comment.id}
                userImage={comment.userImage}
                userName={comment.userName}
                userId={comment.userId}
                role={comment.userRole}
                comment={comment.commentText}
                commentDate={comment.commentDate}
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

export default StudentCommentList;
