import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { useHttpClient } from '../../../Shared/hooks/http-hook';
import AdminCommentList from './AdminCommentList';

const AdminCommentPg = (props) => {
  const [comments, setComments] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getComments = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/comments/${props.sectionId}`
      );
      setComments(responseData.comments);
    } catch (error) {
      console.log(error.message);
    }
  });

  const commentDeleteHandler = async (deleteCommentId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/comment/${deleteCommentId}`,
        'DELETE',
        null
      );
    } catch (error) {
      console.log(error);
    }
    getComments();
  };

  useEffect(() => {
    getComments();
  }, [props.sectionId]);

  return (
    <React.Fragment>
      <div className="comment-page-main-container">
        <AdminCommentList
          commentList={comments}
          onDeleteComment={commentDeleteHandler}
        />
      </div>
    </React.Fragment>
  );
};

export default AdminCommentPg;
