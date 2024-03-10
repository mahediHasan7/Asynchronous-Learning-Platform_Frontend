import './StudentTopicsList.css';
import React from 'react';
import Button from '../../../../Shared/components/FormElements/Button';
import Card from '../../../../Shared/components/UIElements/Card';
import StudentTopicsItem from './StudentTopicsItem';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';

const StudentTopicsList = (props) => {
  // if (props.topicList.length === 0) {
  //   return (
  //     <div className="center">
  //       <Card>
  //         <h2>No section found!</h2>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <Card className="student-card-topic-list">
      <div className="student-topic-list-header">
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
        <p className="student-topic-header-title">List of topics</p>
        {/* <p className="student-topic-header-chapter">
          Chapter: {props.selectedChapter}
        </p> */}
      </div>

      <div className="student-topic-list-scroll-container">
        <table className="student-topic-list-container">
          <thead>
            <tr>
              <th>Topic name</th>
              <th>Last updated</th>
              <th>Favorite</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.topicList.map((topic) => (
              <StudentTopicsItem
                key={topic.id}
                id={topic.id}
                topicName={topic.title}
                lastUpdated={
                  topic.updatedAt ? topic.updatedAt.split('T')[0] : ''
                }
                favorite={topic.favorite}
                onViewTopic={props.onViewTopic}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StudentTopicsList;
