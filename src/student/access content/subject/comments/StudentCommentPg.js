import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { AuthContext } from '../../../../Shared/context/AuthContext';
import { useHttpClient } from '../../../../Shared/hooks/http-hook';
import StudentCommentInput from './StudentCommentInput';
import StudentCommentList from './StudentCommentList';

let commentsArr = [
  {
    id: Math.random(),
    userImage:
      'https://www.mayoclinichealthsystem.org/-/media/national-files/images/hometown-health/2021/college-student-glasses-backpack.jpg',
    userName: 'Abdul Hafiz',
    userId: 'Student ID: 232',
    commentText:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ut rem asperiores cupiditate laudantium placeat libero voluptatem vero minima et necessitatibus ducimus omnis inventore quae similique, ab blanditiis explicabo tempora! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ut rem asperiores cupiditate laudantium placeat libero voluptatem vero minima et necessitatibus ducimus omnis inventore quae similique, ab blanditiis explicabo tempora! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ut rem asperiores cupiditate laudantium placeat libero voluptatem vero minima et necessitatibus ducimus omnis inventore quae similique, ab blanditiis explicabo tempora!',
    commentDate: new Date().toDateString(),
    role: 'student',
  },
  {
    id: Math.random(),
    userImage:
      'https://www.superprof.co.uk/images/teachers/teacher-home-biology-logical-subject-which-more-student-face-problem-during-diagram-basis-and-conceptual-question-can-teach-every.jpg',
    userName: 'John Doe',
    userId: 'Student ID: 234',
    commentText:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ut rem asperiores cupiditate laudantium placeat libero voluptatem vero minima. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ut rem asperiores cupiditate laudantium placeat libero voluptatem vero minima.',
    commentDate: new Date().toDateString(),
    role: 'student',
  },
  {
    id: Math.random(),
    userImage:
      'http://reappropriate.co/wp-content/uploads/2014/05/Faces-ellenwu-1024x682.jpg',
    userName: 'Melinda Liew',
    userId: 'Educator ID: 101',
    commentText:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ut rem asperiores cupiditate laudantium placeat libero voluptatem vero minima et necessitatibus ducimus omnis inventore quae similique, ab blanditiis explicabo tempora! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ut rem asperiores cupiditate laudantium placeat libero voluptatem vero minima et necessitatibus ducimus omnis inventore quae similique, ab blanditiis explicabo tempora! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ut rem asperiores cupiditate laudantium placeat libero voluptatem vero minima et necessitatibus ducimus omnis inventore quae similique, ab blanditiis explicabo tempora!',
    commentDate: new Date().toDateString(),
    role: 'educator',
  },
  {
    id: Math.random(),
    userImage:
      'https://www.mayoclinichealthsystem.org/-/media/national-files/images/hometown-health/2021/college-student-glasses-backpack.jpg',
    userName: 'Abdul Hafiz',
    userId: 'Student ID: 232',
    commentText:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ut rem asperiores cupiditate laudantium placeat libero voluptatem vero minima et necessitatibus ducimus omnis inventore quae similique, ab blanditiis explicabo tempora! Lorem ipsum dolor sit, libero voluptatem vero minima et necessitatibus ducimus omnis inventore quae similique, ab blanditiis explicabo tempora!',
    commentDate: new Date().toDateString(),
    role: 'student',
  },
  {
    id: Math.random(),
    userImage:
      'http://reappropriate.co/wp-content/uploads/2014/05/Faces-ellenwu-1024x682.jpg',
    userName: 'Melinda Liew',
    userId: 'Educator ID: 101',
    commentText: 'Thank you!',
    commentDate: new Date().toDateString(),
    role: 'educator',
  },
];

const StudentCommentPg = (props) => {
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

  const commentDeleteHandler = (deleteCommentId) => {
    const afterDeleteCommentArr = commentsArr.filter(
      (comment) => comment.id !== deleteCommentId
    );
    commentsArr = afterDeleteCommentArr;
    setComments(commentsArr);
  };

  const postCommentHandler = async (newCommentDetails) => {
    const sectionId = props.sectionId;
    const commentText = newCommentDetails.commentText;
    const userName = auth.loggedInUser_asynchronous.name;
    const userId = auth.loggedInUser_asynchronous.id;
    const userRole = auth.loggedInUser_asynchronous.role;

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

      // setComments((prevComments) => {
      //   return [...prevComments, responseData.comment];
      // });
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
        <StudentCommentList
          commentList={comments}
          onDeleteComment={commentDeleteHandler}
          onAddComment={addCommentHandler}
          onReplyComment={replyCommentHandler}
          onBack={props.closeComment}
        />
      </div>
      {showCommentInput && (
        <StudentCommentInput
          onAddComment={postCommentHandler}
          onCloseCommentInput={closeCommentInput}
        />
      )}
    </React.Fragment>
  );
};

export default StudentCommentPg;
