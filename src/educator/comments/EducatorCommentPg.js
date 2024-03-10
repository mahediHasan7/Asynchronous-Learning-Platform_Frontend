import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { AuthContext } from '../../Shared/context/AuthContext';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import EducatorCommentInput from './EducatorCommentInput';
import EducatorCommentList from './EducatorCommentList';

const EducatorCommentPg = (props) => {
  const auth = useContext(AuthContext);

  const [comments, setComments] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const displayCommentInput = () => {
    setShowCommentInput(true);
  };

  const closeCommentInput = () => {
    setShowCommentInput(false);
  };

  const addCommentHandler = () => {
    displayCommentInput();
  };

  const replyCommentHandler = () => {
    displayCommentInput();
  };

  const commentRef = useRef(null);

  const scrollToBottom = () => {
    commentRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  };

  const commentDeleteHandler = async (deleteCommentId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/comment/${deleteCommentId}`,
        'DELETE',
        null
      );
    } catch (error) {
      console.log(error.message);
    }
    const afterDeleteCommentArr = comments.filter(
      (comment) => comment.id !== deleteCommentId
    );
    // commentsArr = afterDeleteCommentArr;
    setComments(afterDeleteCommentArr);
  };

  const postCommentHandler = async (newCommentDetails) => {
    const sectionId = props.sectionId;
    const commentText = newCommentDetails.commentText;
    const userName = auth.loggedInUser_asynchronous.name;
    const userId = auth.loggedInUser_asynchronous.id;
    const userRole = auth.loggedInUser_asynchronous.role;
    console.log(newCommentDetails);

    try {
      const formData = new FormData();
      formData.append('sectionId', sectionId);
      formData.append('commentText', commentText);
      formData.append('userName', userName);
      formData.append('userId', userId);
      formData.append('userRole', userRole);

      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/comment/`,
        'POST',
        formData
      );

      getComments();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getComments = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/comments/${props.sectionId}`
      );
      setComments(responseData.comments);
    } catch (error) {
      setComments();
      console.log(error.message);
    }
  });

  useEffect(() => {
    getComments();
  }, [props.sectionId]);

  return (
    <React.Fragment>
      <div className="comment-page-main-container" ref={commentRef}>
        <EducatorCommentList
          commentList={comments}
          onDeleteComment={commentDeleteHandler}
          onAddComment={addCommentHandler}
          onReplyComment={replyCommentHandler}
        />
      </div>
      {showCommentInput && (
        <EducatorCommentInput
          onAddComment={postCommentHandler}
          onCloseCommentInput={closeCommentInput}
        />
      )}
    </React.Fragment>
  );
};

export default EducatorCommentPg;
