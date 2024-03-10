import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../../../Shared/context/AuthContext';
import { useHttpClient } from '../../../../Shared/hooks/http-hook';
import SubDetails from '../SubDetails';
import AddSection from './AddSection';
import SectionList from './SectionList';

const SectionPg = (props) => {
  const [sections, setSections] = useState([]);
  const auth = useContext(AuthContext);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const showModal = () => {
    setShowAddSectionModal(true);
  };

  const closeModal = () => {
    setShowAddSectionModal(false);
  };

  // to link with the sectionList.js --> ADD SECTION Button
  const addSectionHandler = () => {
    showModal();
  };

  const getSections = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/sections/${props.chapterId}`
      );
      setSections(responseData.sections);
    } catch (error) {
      setSections([]);
    }
  });

  const sectionDeleteHandler = async (deleteSectionId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/sections/${deleteSectionId}`,
        'DELETE'
      );
    } catch (error) {
      console.log(error.message);
    }

    getSections();
  };

  const editSectionHandler = async (updatedSection, editSectionId) => {
    const sectionName = updatedSection.section.value;

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/sections`,
        'PATCH',
        JSON.stringify({
          name: sectionName,
          sectionId: editSectionId,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (error) {
      console.log(error.message);
    }

    getSections();

    // console.log(updatedSection.section.value);
    // const sectionsBeforeUpdate = [...sections];
    // const findSectionIndex = sectionsBeforeUpdate.findIndex(
    //   (sec) => sec.id === editSectionId
    // );
    // sectionsBeforeUpdate[findSectionIndex].sectionName =
    //   updatedSection.section.value;
    // setSections(sectionsBeforeUpdate);
  };

  const updateSectionsAfterAddingNew = async (sectionName) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/sections`,
        'POST',
        JSON.stringify({
          name: sectionName,
          chapterId: props.chapterId,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (error) {
      console.log(error.message);
    }

    getSections();
  };

  useEffect(() => {
    getSections();
  }, []);

  // if (!props.subject) {
  //   return <p>Subject and its relative sections could not found!</p>;
  // }
  return (
    <React.Fragment>
      <AddSection
        showAddSectionModal={showAddSectionModal}
        onCancel={closeModal}
        onAddSection={updateSectionsAfterAddingNew}
      />
      <div className="section-list-page-container">
        <SectionList
          sectionList={sections}
          addSectionHandler={addSectionHandler}
          onDeleteSection={sectionDeleteHandler}
          onEditSection={editSectionHandler}
          onBack={props.onBack}
        />
      </div>
    </React.Fragment>
  );
};

export default SectionPg;
