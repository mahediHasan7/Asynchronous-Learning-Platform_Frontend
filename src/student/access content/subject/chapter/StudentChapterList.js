import './StudentChapterList.css';
import React from 'react';
import Button from '../../../../Shared/components/FormElements/Button';

import Card from '../../../../Shared/components/UIElements/Card';
import StudentChapterItem from './StudentChapterItem';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';
import { Link } from 'react-router-dom';

const StudentChapterList = (props) => {
  // if (props.chapterList.length === 0) {
  //   return (
  //     <div className="center">
  //       <Card>
  //         <h2>No chapters found!</h2>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <Card className="student-card-chapter-list">
      <div className="student-chapter-list-header">
        <Link to={`/student/access_content/`}>
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
        </Link>

        <p className="student-chapter-header-title">List of Chapters</p>
      </div>

      <div className="student-chapter-list-scroll-container">
        <table className="student-chapter-list-container">
          <thead>
            <tr>
              <th>Chapter name</th>
              <th>Total sections</th>
              <th>Total topics</th>
              <th>Quiz</th>
              <th>Learning progress</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.chapterList.map((chapter) => (
              <StudentChapterItem
                key={chapter.id}
                id={chapter.id}
                chapterName={chapter.name}
                totalSections={chapter.totalSection}
                totalTopics={chapter.totalTopics}
                totalQuizzes={chapter.totalQuizzes}
                subjectId={props.subjectId}
                lastUpdated={chapter.lastUpdated}
                onDeleteChapter={props.onDeleteChapter}
                onViewChapter={props.onViewChapter}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StudentChapterList;
