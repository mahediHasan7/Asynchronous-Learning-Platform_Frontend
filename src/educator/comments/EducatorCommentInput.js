import React, { useState, useEffect, useRef } from 'react';
import Button from '../../Shared/components/FormElements/Button';
import Input from '../../Shared/components/FormElements/Input';
import Card from '../../Shared/components/UIElements/Card';
import { useForm } from '../../Shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import './EducatorCommentInput.css';

const EducatorCommentInput = (props) => {
  const commentInputRef = useRef(null);

  const [commentState, inputHandler, setData] = useForm(
    {
      comment: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const commentHandler = (event) => {
    event.preventDefault();

    const newComment = {
      id: new Date(),
      userImage:
        'http://reappropriate.co/wp-content/uploads/2014/05/Faces-ellenwu-1024x682.jpg',
      userName: 'Melinda Liew',
      userId: 'Educator ID: 101',
      commentText: commentState.inputs.comment.value,
      commentDate: new Date().toDateString(),
      role: 'educator',
    };
    props.onAddComment(newComment);
    props.onCloseCommentInput();
  };

  const scrollToCommentInput = () => {
    commentInputRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  };

  useEffect(() => {
    if (commentInputRef.current) {
      scrollToCommentInput();
    }
  }, [scrollToCommentInput, commentInputRef]);

  return (
    <Card className="comment-input-card">
      <form onSubmit={commentHandler}>
        <div className="" ref={commentInputRef}>
          <Input
            element="textarea"
            id="comment"
            type="text"
            label={props.reply ? 'Replying a comment' : 'Adding a new comment'}
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid comment"
            // initialValue={props.reply ? 'Replying comment' : 'New comment'}
            initialIsValid={false}
          />
        </div>

        <footer className={`topic-content-footer`}>
          <Button
            type="button"
            danger
            className="topic-content-header-discard-btn"
            onClick={props.onCloseCommentInput}
          >
            CANCEL
          </Button>

          <Button
            className="topic-content-header-save-btn"
            inverse
            submit
            disabled={!commentState.isFormValid}
          >
            POST
          </Button>
        </footer>
      </form>
    </Card>
  );
};

export default EducatorCommentInput;
