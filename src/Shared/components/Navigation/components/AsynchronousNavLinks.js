import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import EditProfile from '../../../AuthPages/EditProfile';
import Profile from '../../../AuthPages/Profile';
import { AuthContext } from '../../../context/AuthContext';
import Backdrop from '../../UIElements/Backdrop';
import Modal from '../../UIElements/Modal';

import './AsynchronousNavLinks.css';

const AsynchronousNavLinks = (props) => {
  const auth = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState();
  const [showEditProfile, setShowEditProfile] = useState();

  const displayProfile = () => {
    setShowProfile(true);
  };
  const closeProfile = () => {
    setShowProfile(false);
  };

  const displayEditProfile = () => {
    setShowEditProfile(true);
  };
  const closeEditProfile = () => {
    setShowEditProfile(false);
  };

  const userIconHandler = () => {
    if (auth.loggedInUser_asynchronous) {
      displayProfile();
    }
  };

  const editProfileHandler = () => {
    closeProfile();
    displayEditProfile();
  };

  let element;
  if (auth.loggedInUser_asynchronous) {
    if (auth.loggedInUser_asynchronous.role === 'admin') {
      element = (
        <React.Fragment>
          <li>
            <NavLink to="/admin/subjects">MANAGING SUBJECTS</NavLink>
          </li>

          <li>
            <NavLink to={`/admin/view_contents`}>VIEW CONTENTS</NavLink>
          </li>

          <li>
            <NavLink to="/admin/requests">ACCOUNT REQUESTS</NavLink>
          </li>
        </React.Fragment>
      );
    } else if (auth.loggedInUser_asynchronous.role === 'educator') {
      element = (
        <React.Fragment>
          <li>
            <NavLink to="/educator/subject_registration">
              SUBJECT REGISTRATION
            </NavLink>
          </li>

          <li>
            <NavLink to={`/educator/content_management`}>
              CONTENT MANAGEMENT
            </NavLink>
          </li>

          <li>
            <NavLink to="/educator/quiz_management">QUIZ MANAGEMENT</NavLink>
          </li>

          <li>
            <NavLink to="/educator/comments">COMMENTS</NavLink>
          </li>
        </React.Fragment>
      );
    } else if (auth.loggedInUser_asynchronous.role === 'student') {
      element = (
        <React.Fragment>
          <li>
            <NavLink to="/student/subject_enrollment">
              SUBJECT ENROLLMENT
            </NavLink>
          </li>

          <li>
            <NavLink to={`/student/access_content`}>ACCESS CONTENT</NavLink>
          </li>

          <li>
            <NavLink to="/student/quiz_records">QUIZ RECORDS</NavLink>
          </li>

          <li>
            <NavLink to="/student/favorite_list">FAVORITE LIST</NavLink>
          </li>
        </React.Fragment>
      );
    } else if (auth.loggedInUser_asynchronous.role === 'parent') {
      element = (
        <React.Fragment>
          <li>
            <NavLink to="/parent/student_progress">STUDENT PROGRESS</NavLink>
          </li>

          <li>
            <NavLink to="/parent/quiz_records">QUIZ RECORDS</NavLink>
          </li>

          <li>
            <NavLink to="/parent/contacts">CONTACTS</NavLink>
          </li>
        </React.Fragment>
      );
    }
  }

  const logoutHandler = () => {
    auth.logout_asynchronous();
  };

  return (
    <React.Fragment>
      <Modal
        show={showProfile}
        className="profile-item-modal"
        headerClass="profile-modal-header"
        footerClass="profile-modal-footer"
        // onSubmit={editProfileHandler}
      >
        <Profile
          user={auth.loggedInUser_asynchronous}
          onEditButton={editProfileHandler}
        />
      </Modal>
      {showProfile && <Backdrop onClick={closeProfile} />}

      <Modal
        show={showEditProfile}
        className="profile-item-modal"
        headerClass="profile-modal-header"
        footerClass="profile-modal-footer"
        // onSubmit={editProfileHandler}
      >
        <EditProfile
          user={auth.loggedInUser_asynchronous}
          onSaveChanges={closeEditProfile}
        />
      </Modal>
      {showEditProfile && <Backdrop onClick={closeEditProfile} />}

      <ul className="asynchronous-nav-links">
        {element}
        <li>
          <NavLink to="/admin/auth" onClick={logoutHandler}>
            {auth.isLogin_asynchronous ? 'LOGOUT' : 'LOGIN'}
          </NavLink>
        </li>
        <li>
          <NavLink to="admin/createNewAcc">
            <div onClick={userIconHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="none"
                viewBox="0 0 24 24"
                className="asynchronous-nav-link-user-icon"
              >
                <path
                  fill="#33a95b"
                  fill-rule="evenodd"
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10ZM5.99927 17C7.36758 15.1783 9.54609 14 11.9998 14C14.4535 14 16.6321 15.1783 18.0004 17C16.6321 18.8217 14.4535 20 11.9998 20C9.54609 20 7.36758 18.8217 5.99927 17Z"
                  clip-rule="evenodd"
                />
              </svg>
              <p className="nav-link-user-role">
                {auth.loggedInUser_asynchronous &&
                  auth.loggedInUser_asynchronous.role}
              </p>
            </div>
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default AsynchronousNavLinks;
