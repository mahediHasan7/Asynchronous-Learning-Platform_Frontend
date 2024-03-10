import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../../Shared/context/AuthContext';
import { useHttpClient } from '../../../../Shared/hooks/http-hook';
import SectionPg from '../section/SectionPg';
import SubDetails from '../SubDetails';
import AddChapter from './AddChapter';
import ChapterList from './ChapterList';

const ChapterPg = (props) => {
  const [chapters, setChapters] = useState([]);
  const [showAddChapterModal, setShowAddChapterModal] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [chapterId, setChapterId] = useState();

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const showModal = () => {
    setShowAddChapterModal(true);
  };

  const closeModal = () => {
    setShowAddChapterModal(false);
  };

  // to link with the chaptersList.js --> ADD CHAPTER Button
  const addChapterHandler = () => {
    showModal();
  };

  const backFromSectionHandler = () => {
    setShowSectionModal(false);
  };

  const getChapters = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/chapters/${props.subject.subId}`
      );
      setChapters(responseData.chapters);
    } catch (error) {
      setChapters([]);
    }
  };

  const chapterDelete = async (deleteChapterId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/chapter/${deleteChapterId}`,
        'DELETE'
      );
    } catch (error) {
      console.log(error.message);
    }

    getChapters();
  };

  const updateChaptersAfterAddingNew = async (chapterName) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/chapters`,
        'POST',
        JSON.stringify({
          name: chapterName,
          subId: props.subject.subId,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      setChapters((prevState) => {
        const chapters = [...prevState];
        chapters.push(responseData.chapter);
        return chapters;
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const viewChapterHandler = (chapterId) => {
    setChapterId(chapterId);
    setShowSectionModal(true);
  };

  const editChapterHandler = async (chapter, chapterId) => {
    const chapterName = chapter.chapter.value;
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/chapters`,
        'PATCH',
        JSON.stringify({
          name: chapterName,
          chapterId: chapterId,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
    } catch (error) {
      console.log(error.message);
    }

    setChapters((prevState) => {
      const previousChapters = [...prevState];
      const chapterIndex = previousChapters.findIndex(
        (chapter) => chapter.id === chapterId
      );
      previousChapters[chapterIndex].name = chapterName;
      return previousChapters;
    });
  };

  useEffect(async () => {
    let responseData;
    try {
      responseData = await sendRequest(
        `http://localhost:5000/api/admin/chapters/${props.subject.subId}`
      );
      setChapters(responseData.chapters);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (!props.subject) {
    return <p>Subject and its relative chapters could not found!</p>;
  }
  return (
    <React.Fragment>
      <AddChapter
        showAddChapterModal={showAddChapterModal}
        onCancel={closeModal}
        onAddChapter={updateChaptersAfterAddingNew}
        subjectId={props.subject.subId}
      />
      <div className="chapter-list-page-container">
        <SubDetails
          subject={props.subject}
          className="chapter-list-pg-sub-details"
        />
        {!showSectionModal && (
          <ChapterList
            chapterList={chapters}
            addChapterHandler={addChapterHandler}
            onDeleteChapter={chapterDelete}
            onViewChapter={viewChapterHandler}
            onEditChapter={editChapterHandler}
          />
        )}
        {showSectionModal && (
          <SectionPg chapterId={chapterId} onBack={backFromSectionHandler} />
        )}
      </div>
    </React.Fragment>
  );
};

export default ChapterPg;
