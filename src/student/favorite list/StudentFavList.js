import './StudentFavList.css';
import React from 'react';
import StudentFavItem from './StudentFavItem';
import SvgIcon from '../../Shared/components/UIElements/SvgIcon';
import Card from '../../Shared/components/UIElements/Card';

const StudentFavList = (props) => {
  // if (props.quizList.length === 0) {
  //   return (
  //     <div className="center">
  //       <Card>
  //         <h2>No section found!</h2>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <Card className="student-fav-card">
      <div className="student-fav-header">
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
        <p className="student-fav-header-title">My favorite topics</p>
      </div>

      <div className="student-fav-scroll-container">
        <table className="student-fav-list-container">
          <thead>
            <tr>
              <th>Topic title</th>
              <th>Chapter</th>
              <th>Section</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.favTopicList.map((favTopic) => {
              return (
                <StudentFavItem
                  key={favTopic.topicId}
                  id={favTopic.topicId}
                  topicTitle={favTopic.topicTitle}
                  chapter={favTopic.chapterName}
                  section={favTopic.sectionName}
                  onViewTopic={props.onViewTopic}
                  onRemoveFav={props.onRemoveFav}
                  favBtnHandler={props.favBtnHandler}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StudentFavList;
