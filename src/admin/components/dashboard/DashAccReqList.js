import './DashAccReqList.css';
import Card from '../../../Shared/components/UIElements/Card';
import DashAccReqItem from './DashAccReqItem';
import React from 'react';
import Button from '../../../Shared/components/FormElements/Button';
import { Link } from 'react-router-dom';

const DashAccReqList = (props) => {
  return (
    <Card className="dash-card-acc-req-list">
      <p className="dash-header-title">
        {'Account Requests (' + props.userRole + ')'}
      </p>

      <div className="dash-acc-req-scroll-container">
        <table className="dash-request-list-container">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {props.accRequests.map((accReq) => (
              <DashAccReqItem
                key={accReq.id}
                id={
                  accReq.role === 'educator'
                    ? accReq.UserEducatorId
                    : accReq.UserStudentId
                }
                name={accReq.name}
                email={accReq.email}
                phone={accReq.phone}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="dash-acc-req-btn">
        <Link to="/admin/requests">
          <Button inverse>View all</Button>
        </Link>
      </div>
    </Card>
  );
};

export default DashAccReqList;
