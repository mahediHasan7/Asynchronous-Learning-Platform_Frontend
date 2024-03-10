import './AccReqList.css';
import Card from '../../../Shared/components/UIElements/Card';
import AccReqItem from './AccReqItem';
import React from 'react';

const AccReqList = (props) => {
  return (
    <Card className="card-acc-req-list">
      <p className="header-title">
        {'Account Requests (' + props.userRole + ')'}
      </p>

      <div className="scroll-container">
        <table className="request-list-container">
          <thead>
            <tr>
              <th>Role</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.accRequests.map((accReq) => (
              <AccReqItem
                key={accReq.id}
                id={
                  accReq.role === 'educator'
                    ? accReq.UserEducatorId
                    : accReq.role === 'student'
                    ? accReq.UserStudentId
                    : accReq.UserParentId
                }
                role={accReq.role}
                name={accReq.name}
                email={accReq.email}
                phone={accReq.phone}
                approval={accReq.approval}
                declineHandler={props.declineHandler}
                acceptHandler={props.acceptHandler}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AccReqList;
