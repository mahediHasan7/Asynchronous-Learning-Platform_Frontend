import React, { useState } from 'react';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';
import EditSection from './EditSection';

const SectionItem = (props) => {
  const [showEditSectionModal, setShowEditSectionModal] = useState(false);

  const editSubmitHandler = (updatedSection) => {
    props.onEditSection(updatedSection, props.id);
    setShowEditSectionModal(false);
  };

  const closeEditModal = () => {
    setShowEditSectionModal(false);
  };

  const sectionEditButtonHandler = () => {
    setShowEditSectionModal(true);
  };

  const deleteButtonHandler = () => {
    props.onDeleteSection(props.id);
  };

  return (
    <React.Fragment>
      <EditSection
        show={showEditSectionModal}
        section={props.sectionName}
        onCancel={closeEditModal}
        onSubmit={editSubmitHandler}
      />

      <tr>
        <td>{props.sectionName}</td>
        <td>{props.lastUpdated}</td>

        <td>
          <div onClick={sectionEditButtonHandler} className="sec-list-edit-btn">
            <SvgIcon
              icon="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              color="#313537"
              size="1.5rem"
              fill="none"
              strokeWidth={2}
              className="sec-list-edit-icon"
            />
            <p>Edit</p>
          </div>
        </td>
        <td>
          <div onClick={deleteButtonHandler} className="sec-list-delete-btn">
            <SvgIcon
              icon="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              color="#313537"
              size="1.6rem"
              fill="none"
              strokeWidth={2}
              className="sec-list-delete-icon"
            />
            <p>Delete</p>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default SectionItem;
