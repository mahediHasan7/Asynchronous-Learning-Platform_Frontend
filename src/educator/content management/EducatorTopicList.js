import './EducatorTopicList.css';
import React from 'react';
import Card from '../../Shared/components/UIElements/Card';
import Button from '../../Shared/components/FormElements/Button';
import EducatorTopicItem from './EducatorTopicItem';

const EducatorTopicList = (props) => {
  // console.log('educatorTopicList');
  return (
    <Card className="card-educator-topic-list">
      <div className="educator-topic-list-header">
        <p className="educator-topic-list-header-title">List of topics</p>
        {!props.isViewContent && (
          <Button onClick={props.onAddTopic}>
            <span style={{ fontSize: '4rem', paddingBottom: '.2rem' }}>
              &#43;{' '}
            </span>
            &nbsp;&nbsp; ADD NEW TOPIC
          </Button>
        )}
      </div>

      <div className="educator-topic-list-scroll-container">
        <table className="educator-topic-list-container">
          <thead>
            <tr>
              <th>Topic title</th>
              <th>Last updated</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.topicLists.map((topic) => (
              <EducatorTopicItem
                key={topic.id}
                id={topic.id}
                name={topic.title}
                createdAt={topic.updatedAt ? topic.updatedAt.split('T')[0] : ''}
                onAccessTopic={props.onAccessTopic}
                onDeleteTopic={props.onDeleteTopic}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default EducatorTopicList;
