import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../../../Shared/context/AuthContext';
import { useHttpClient } from '../../../../Shared/hooks/http-hook';
import StudentCommentPg from '../comments/StudentCommentPg';
import StudentQuizQuestions from '../quiz/StudentQuizQuestions';
import StudentQuizResult from '../quiz/StudentQuizResult';
import SingleTopicPg from './SingleTopicPg';
import StudentTopicsList from './StudentTopicsList';

const StudentTopicsPg = (props) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState();
  const [showSingleTopic, setShowSingleTopic] = useState();
  const [attemptedQuizAnswers, setAttemptedQuizAnswers] = useState();
  const [masterAnswerId, setMasterAnswerId] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const displaySingleTopic = () => {
    setShowSingleTopic(true);
  };

  const closeSingleTopic = () => {
    setShowSingleTopic(false);
  };

  const viewTopicHandler = (topicId) => {
    const accessedTopic = topics.find((topic) => {
      return topic.id === topicId;
    });
    setSelectedTopic(accessedTopic);
    displaySingleTopic();
  };

  const getMasterAnswerId = (masterAnswerId) => {
    setMasterAnswerId(masterAnswerId);
  };
  const attemptedAnswersHandler = (answers) => {
    setAttemptedQuizAnswers(answers);
  };

  const getTopics = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/topics/${props.selectedSection.id}`
      );
      setTopics(responseData.topics);
    } catch (error) {
      setTopics([]);
    }
  });

  useEffect(() => {
    getTopics();
  }, []);

  let content;
  if (props.showQuizResult) {
    // console.log(props.showQuizResult);
    content = masterAnswerId && (
      <StudentQuizResult
        onBack={props.onCloseQuizResult}
        quizzes={props.quizzes}
        attemptedQuizAnswers={attemptedQuizAnswers}
        masterAnswerId={masterAnswerId}
        subject={props.selectedSubject}
        chapter={props.selectedChapter}
        section={props.selectedSection}
      />
    );
  } else {
    if (props.showQuiz || props.showComment) {
      if (props.showQuiz) {
        content = (
          <StudentQuizQuestions
            onSubmitAnswers={props.closeQuiz}
            getAttemptedAnswers={attemptedAnswersHandler}
            quizzes={props.quizzes}
            sectionId={props.selectedSection.id}
            onBack={props.closeQuiz}
            onBackFromQuiz={props.onBackFromQuiz}
            onSubmitAnswerId={getMasterAnswerId}
          />
        );
      }

      if (props.showComment) {
        content = (
          <StudentCommentPg
            sectionId={props.selectedSection.id}
            closeComment={props.onCloseComment}
          />
        );
      }
    } else {
      if (showSingleTopic) {
        content = (
          <SingleTopicPg topic={selectedTopic} onBack={closeSingleTopic} />
        );
      } else {
        content = (
          <div className="student-topic-list-page-container">
            <StudentTopicsList
              topicList={topics}
              onViewTopic={viewTopicHandler}
              onBack={props.onBack}
            />
          </div>
        );
      }
    }
  }
  return <React.Fragment>{content}</React.Fragment>;
};

export default StudentTopicsPg;
