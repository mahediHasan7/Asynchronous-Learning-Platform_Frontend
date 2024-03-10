import React, { useState, useEffect } from 'react';
import Button from '../../Shared/components/FormElements/Button';
import Modal from '../../Shared/components/UIElements/Modal';
import './EnrolledStudents.css';

const EnrolledStudents = (props) => {
  return (
    <React.Fragment>
      <Modal
        show={props.onShow}
        className="enrolled-student-modal"
        contentClass="enrolled-student-modal-content"
        headerClass="enrolled-student-modal-header"
        footerClass="enrolled-student-modal-footer"
        header="Enrolled students list"
        footer={
          <div className="enrolled-student-close-btn">
            <Button danger onClick={props.onClose} type="button">
              CLOSE
            </Button>
          </div>
        }
      >
        <div className="enrolled-student-sub-detail">
          <p>Subject: {props.subject.name}</p>
          <p>Subject code: {props.subject.code}</p>
          <p>Total enrolled: {props.subject.enrollment}</p>
        </div>

        <div className="enrolled-student-content">
          <div className="overflow-content-scroll">
            <table className="enrolled-student-list-table">
              <thead>
                <tr>
                  <th>Student name</th>
                  <th>Student ID</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {props.enrolledStudents.map((student) => (
                  <tr>
                    <td>{student.name}</td>
                    <td>{student.id}</td>
                    <td>{student.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default EnrolledStudents;
