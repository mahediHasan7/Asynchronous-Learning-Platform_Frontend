import React, { useState, useContext } from 'react';
import { useEffect } from 'react/cjs/react.development';
import Button from '../../../Shared/components/FormElements/Button';
import SvgIcon from '../../../Shared/components/UIElements/SvgIcon';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Shared/context/AuthContext';
import Backdrop from '../../../Shared/components/UIElements/Backdrop';
import EditSubject from './EditSubject';

const SubjectsItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditSubjectModal, setShowEditSubjectModal] = useState(false);

  const closeEditModal = () => {
    setShowEditSubjectModal(false);
  };

  const editSubmitHandler = (updatedSubject) => {
    props.onEdit(updatedSubject, props.subId);
    setShowEditSubjectModal(false);
  };

  const displayMenuHandler = () => {
    setShowMenu(true);
  };

  const closeMenuHandler = () => {
    setShowMenu(false);
  };

  const syllabusButtonHandler = () => {
    // this props is going to set in app.js subState and which will be pass to <chapterPg/>
    // Object { subId: 0.2592515870552443, name: "Additional Mathematics", grade: "Form 4", code: "201", description: "dummy description", enrollments: 49, educator: "Kathleen Arroyo", createdAt: "Aug 21, 2021", … }
    auth.setSubject(props);
  };

  const subjectEditButtonHandler = () => {
    setShowEditSubjectModal(true);
    setShowMenu(false);
  };

  const deleteButtonHandler = () => {
    props.onDelete(props.subId);
    setShowMenu(false);
  };

  // only for the view content page
  // const viewContentButtonHandler = () => {};

  useEffect(() => {});

  return (
    <React.Fragment>
      {/* Edit subject modal */}
      <EditSubject
        show={showEditSubjectModal}
        subject={props}
        onCancel={closeEditModal}
        onSubmit={editSubmitHandler}
      />

      <tr>
        <td>{props.name}</td>
        <td>{props.grade}</td>
        <td>{props.code}</td>
        <td>{props.enrollments}</td>
        <td>{props.educator}</td>
        <td>{props.createdAt}</td>
        {!props.isViewContent && (
          <td>
            <Link to={`/admin/subjects/${props.name}/${props.subId}/chapters`}>
              <Button
                className="subject-item-syllabus-btn"
                inverse
                onClick={syllabusButtonHandler}
              >
                Syllabus
              </Button>
            </Link>
          </td>
        )}
        {!props.isViewContent && (
          <td className="subject-list-td-more">
            <SvgIcon
              onClick={displayMenuHandler}
              icon="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              color="#313537"
              size="2.1rem"
              fill="none"
              strokeWidth={3}
              className="subject-item-more-icon"
            />

            <React.Fragment>
              {showMenu && (
                <Backdrop
                  className="subject-item-more-menu-backdrop"
                  onClick={closeMenuHandler}
                />
              )}

              <CSSTransition
                in={showMenu}
                timeout={200}
                classNames="more-menu"
                mountOnEnter
                unmountOnExit
              >
                <div className="subject-item-btns-container">
                  <div
                    onClick={subjectEditButtonHandler}
                    className="subject-item-edit-btn-container"
                  >
                    <SvgIcon
                      icon="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      color="#313537"
                      size="2.1rem"
                      fill="none"
                      strokeWidth={2}
                      className="subject-item-edit-btn"
                    />
                    <span>Edit</span>
                  </div>
                  <div
                    onClick={deleteButtonHandler}
                    className="subject-item-delete-btn-container"
                  >
                    <SvgIcon
                      icon="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      color="#313537"
                      size="2.1rem"
                      fill="none"
                      strokeWidth={2}
                      className="subject-item-delete-btn"
                    />

                    <span>Delete</span>
                  </div>
                </div>
              </CSSTransition>
            </React.Fragment>
            {/* )} */}
          </td>
        )}

        {/* // Only for view content page */}
        {props.isViewContent && (
          // <td>
          //   <Link
          //     to={`/admin/subjects/${props.name}/${props.subId}/viewContent`}
          //   >
          //     <Button
          //       className="subject-item-syllabus-btn"
          //       inverse
          //       onClick={viewContentButtonHandler}
          //     >
          //       View
          //     </Button>
          //   </Link>
          // </td>

          <td>
            <Link
              to={`/admin/subjects/${props.name}/${props.subId}/viewContent`}
            >
              <div
                // onClick={viewContentButtonHandler}
                className="chap-list-view-btn"
              >
                <SvgIcon
                  icon="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  secondPath="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  color="#313537"
                  size="1.6rem"
                  fill="none"
                  strokeWidth={2}
                  className="chap-list-view-icon"
                />
                <p>View</p>
              </div>
            </Link>
          </td>
        )}
      </tr>
    </React.Fragment>
  );
};

export default SubjectsItem;
