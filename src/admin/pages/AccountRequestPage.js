import React, { useEffect, useState } from 'react';
import Button from '../../Shared/components/FormElements/Button';
import Modal from '../../Shared/components/UIElements/Modal';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import AccReqList from '../components/account request/AccReqList';
import './AccountRequestPage.css';

const AccountRequestPage = (props) => {
  const [studentAccReqs, setStudentAccReqs] = useState([]);
  const [educatorAccReqs, setEducatorAccReqs] = useState([]);
  const [parentAccReqs, setParentAccReqs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isApproveReq, setIsApproveReq] = useState(null);
  const [modalContent, setModalContent] = useState();
  const [userId, setUserId] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userDetails = (userId, role) => {
    let accReqArr;
    if (role === 'student') {
      accReqArr = studentAccReqs;
    } else if (role === 'educator') {
      accReqArr = educatorAccReqs;
    } else {
      accReqArr = parentAccReqs;
    }
    const user = accReqArr.find((user) => {
      const userIdFromArray =
        user.role === 'educator'
          ? user.UserEducatorId
          : user.role === 'student'
          ? user.UserStudentId
          : user.UserParentId;
      return userIdFromArray === userId;
    });
    if (!user) {
      return;
    }
    const content = (
      <table className="modal-table">
        <tbody>
          <tr>
            <td>
              <p>Id: </p>
            </td>
            <td>
              {user.role === 'educator'
                ? user.UserEducatorId
                : user.role === 'student'
                ? user.UserStudentId
                : user.UserParentId}
            </td>
          </tr>
          <tr>
            <td>
              <p>Name: </p>
            </td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>
              <p>Role: </p>
            </td>
            <td>{user.role}</td>
          </tr>
        </tbody>
      </table>
    );
    setModalContent(content);
  };

  const acceptHandler = (userId, role) => {
    setUserId(userId);
    setShowModal(true);
    setIsApproveReq(true);
    userDetails(userId, role);
  };

  const declineHandler = (userId, role) => {
    setUserId(userId);
    setShowModal(true);
    setIsApproveReq(false);
    userDetails(userId, role);
  };

  const modalCloseHandler = () => {
    setShowModal(false);
  };

  // in modal
  const cancelButtonHandler = () => {
    setShowModal(false);
  };

  //in modal
  const approveDeclineButtonHandler = async () => {
    const firstDigitOfId = String(userId)[0];
    // For student
    if (firstDigitOfId === '3') {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/admin/student-requests`,
          'PATCH',
          JSON.stringify({
            userId: userId,
            action: isApproveReq ? 'approved' : 'declined',
          }),
          {
            'Content-Type': 'application/json',
          }
        );
      } catch (error) {
        console.log(error.message);
      }

      // updating the states for the react part
      setStudentAccReqs((prevRequests) => {
        const user = prevRequests.find((user) => user.UserStudentId === userId);
        user.approval = isApproveReq ? 'approved' : 'declined';
        return prevRequests;
      });
    } else if (firstDigitOfId === '2') {
      // For educator
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/admin/educator-requests`,
          'PATCH',
          JSON.stringify({
            userId: userId,
            action: isApproveReq ? 'approved' : 'declined',
          }),
          {
            'Content-Type': 'application/json',
          }
        );
      } catch (error) {
        console.log(error.message);
      }

      // updating the states for the react part
      setEducatorAccReqs((prevRequests) => {
        const user = prevRequests.find(
          (user) => user.UserEducatorId === userId
        );
        user.approval = isApproveReq ? 'approved' : 'declined';
        return prevRequests;
      });
    } else if (firstDigitOfId === '4') {
      // For parent
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/admin/parent-requests`,
          'PATCH',
          JSON.stringify({
            userId: userId,
            action: isApproveReq ? 'approved' : 'declined',
          }),
          {
            'Content-Type': 'application/json',
          }
        );
      } catch (error) {
        console.log(error.message);
      }

      // updating the states for the react part
      setParentAccReqs((prevRequests) => {
        const user = prevRequests.find((user) => user.UserParentId === userId);
        user.approval = isApproveReq ? 'approved' : 'declined';
        return prevRequests;
      });
    }

    setShowModal(false);
  };

  useEffect(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/student-requests`
      );
      setStudentAccReqs(responseData.stuAccReq);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/educator-requests`
      );
      setEducatorAccReqs(responseData.eduAccReq);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/parent-requests`
      );
      setParentAccReqs(responseData.parentAccReq);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <React.Fragment>
      <Modal
        header={`${isApproveReq ? 'Approving ' : 'Declining'} this request?`}
        show={showModal}
        onClick={modalCloseHandler}
        footer={
          <React.Fragment>
            <Button
              // inverse={!isApproveReq}
              danger={isApproveReq}
              onClick={cancelButtonHandler}
              className={`${!isApproveReq && 'decline-cancel'}`}
            >
              CANCEL
            </Button>
            <Button
              inverse
              danger={!isApproveReq}
              onClick={approveDeclineButtonHandler}
              className={`${!isApproveReq && 'danger-inverse'}`}
            >
              {isApproveReq ? 'APPROVE' : 'DECLINE'}
            </Button>
          </React.Fragment>
        }
        className={'modal__acc-req'}
        headerClass={`modal-header__acc-req ${!isApproveReq && 'decline'}`}
        footerClass={'modal-footer__acc-req'}
      >
        {modalContent}
      </Modal>

      <div className="acc-req-page-container">
        <AccReqList
          accRequests={studentAccReqs}
          userRole={'Students'}
          acceptHandler={acceptHandler}
          declineHandler={declineHandler}
        />
        <AccReqList
          accRequests={educatorAccReqs}
          userRole={'Educators'}
          acceptHandler={acceptHandler}
          declineHandler={declineHandler}
        />
        <AccReqList
          accRequests={parentAccReqs}
          userRole={'Parent'}
          acceptHandler={acceptHandler}
          declineHandler={declineHandler}
        />
      </div>
    </React.Fragment>
  );
};

export default AccountRequestPage;
