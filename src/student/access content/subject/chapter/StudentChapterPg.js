import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../Shared/context/AuthContext';
import { StudentContext } from '../../../../Shared/context/StudentContext';
import { useHttpClient } from '../../../../Shared/hooks/http-hook';
import StudentSectionPg from '../section/StudentSectionPg';
import StudentSubDetails from '../StudentSubDetails';
import StudentChapterList from './StudentChapterList';

const StudentChapterPg = (props) => {
  const auth = useContext(AuthContext);

  const [chapters, setChapters] = useState([]);
  const [showSections, setShowSections] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedChapter, setSelectedChapter] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const studentContext = useContext(StudentContext);

  const { subId } = useParams();

  const displaySections = () => {
    setShowSections(true);
  };
  const closeSections = () => {
    setShowSections(false);
  };

  const viewChapterHandler = (chapterId) => {
    const accessedChapter = chapters.find((chap) => {
      return chap.id === chapterId;
    });
    setSelectedChapter(accessedChapter);
    displaySections();
  };

  const getChapters = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/chapters/${subId}`
      );
      setChapters(responseData.chapters);
    } catch (error) {
      setChapters([]);
    }
  });

  useEffect(() => {
    const accessedSubject = studentContext.enrolledSubjects.find((sub) => {
      // console.log(sub.id);
      return sub.id.toString() === subId;
    });
    setSelectedSubject(accessedSubject);
  });

  useEffect(() => {
    getChapters();
  }, [subId]);

  // useEffect(() => {
  //   if (quizRecords) {
  //     const totalAttemptedQuiz = quizRecords.length;
  //     const totalMarks = totalAttemptedQuiz * 10;
  //     const totalAchievedMarks = quizRecords.reduce((prev, curr) => {
  //       return prev.marks + curr.marks;
  //     });
  //     console.log(totalAchievedMarks);
  //     const progressInPercentage = (totalAchievedMarks / totalMarks) * 100;
  //     console.log(progressInPercentage);
  //   }
  // }, [quizRecords]);

  return (
    <React.Fragment>
      {!showSections && selectedSubject && (
        <StudentSubDetails subject={selectedSubject} />
      )}
      {!showSections && (
        <div className="student-chapter-list-page-container">
          <StudentChapterList
            chapterList={chapters}
            onViewChapter={viewChapterHandler}
            subjectId={subId}
          />
        </div>
      )}
      {showSections && (
        <StudentSectionPg
          selectedSubject={selectedSubject}
          selectedChapter={selectedChapter}
          onBack={closeSections}
        />
      )}
    </React.Fragment>
  );
};

export default StudentChapterPg;
