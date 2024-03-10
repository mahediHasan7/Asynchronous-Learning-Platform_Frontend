import React, { useState } from 'react';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';
import EditChapter from './EditChapter';

const ChapterItem = (props) => {
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showEditChapterModal, setShowEditChapterModal] = useState(false);

  const displayEditModal = () => {
    setShowEditChapterModal(true);
  };

  const closeEditModal = () => {
    setShowEditChapterModal(false);
  };

  const viewButtonHandler = () => {
    props.onViewChapter(props.id);
  };

  const editButtonHandler = () => {
    setShowEditChapterModal(true);
  };

  const deleteButtonHandler = () => {
    props.onDeleteChapter(props.id);
  };

  const editSubmitHandler = (updatedChapter) => {
    props.onEditChapter(updatedChapter, props.id);
    closeEditModal();
  };

  return (
    <React.Fragment>
      <EditChapter
        show={showEditChapterModal}
        chapter={props.chapterName}
        onCancel={closeEditModal}
        onSubmit={editSubmitHandler}
      />
      <tr>
        <td>{props.chapterName}</td>
        <td>{props.totalSections}</td>
        <td>{props.lastUpdated}</td>
        <td>
          <div onClick={viewButtonHandler} className="chap-list-view-btn">
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
        </td>
        <td>
          <div onClick={editButtonHandler} className="chap-list-edit-btn">
            <SvgIcon
              icon="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              color="#313537"
              size="1.5rem"
              fill="none"
              strokeWidth={2}
              className="chap-list-edit-icon"
            />
            <p>Edit</p>
          </div>
        </td>
        <td>
          <div onClick={deleteButtonHandler} className="chap-list-delete-btn">
            <SvgIcon
              icon="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              color="#313537"
              size="1.6rem"
              fill="none"
              strokeWidth={2}
              className="chap-list-delete-icon"
            />
            <p>Delete</p>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default ChapterItem;
