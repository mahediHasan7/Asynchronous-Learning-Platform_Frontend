import './DashAccReqList.css';
import Card from '../../../Shared/components/UIElements/Card';
import React from 'react';
import Button from '../../../Shared/components/FormElements/Button';
import { Link } from 'react-router-dom';
import NewestContentItem from './NewestContentItem';
import './NewestContentList.css';

const NewestContentList = (props) => {
  // if (props.newContents.length === 0) {
  //   return (
  //     <div className="center">
  //       <Card>
  //         <h2>No content found!</h2>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <Card className="dash-card-new-content-list">
      <p className="dash-header-new-content-title">{'Newest contents'}</p>

      <div className="dash-new-content-scroll-container">
        <table className="dash-new-content-container">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Subject</th>
              <th>Grade</th>
              <th>Date</th>
              <th>Educator</th>
            </tr>
          </thead>
          <tbody>
            {props.newContents.map((newContent) => (
              <NewestContentItem
                key={newContent.id}
                id={newContent.id}
                topic={newContent.title}
                subject={newContent.subject}
                grade={newContent.grade}
                createdAt={
                  newContent.createdAt ? newContent.createdAt.split('T')[0] : ''
                }
                educator={newContent.educator}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="dash-new-content-btn-container">
        <Link to="/admin/view_contents">
          <Button inverse>View all</Button>
        </Link>
      </div>
    </Card>
  );
};

export default NewestContentList;
