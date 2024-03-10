import React, { useEffect, useRef, useState, useContext } from 'react';
import { Dropdown } from 'reactjs-dropdown-component';
import Button from '../../Shared/components/FormElements/Button';
import { EducatorContext } from '../../Shared/context/EducatorContext';
import EducatorAddTopicPage from './EducatorAddTopicPage';
import EducatorContentManagementHeader from './EducatorContentManagementHeader';
import EducatorTopicPg from './EducatorTopicPg';
import './EducatorContentManagementPage.css';
import SvgIcon from '../../Shared/components/UIElements/SvgIcon';
import QuillEditor from '../../Shared/components/UIElements/QuillEditor';
import QuillOutput from '../../Shared/components/UIElements/QuillOutput';
import { useHttpClient } from '../../Shared/hooks/http-hook';
const fs = require('fs');

const sectionArr = [
  {
    id: 3232,
    value: 3232,
    label: `Section 1`,
    totalTopics: Math.floor(Math.random() * 30) + 1,
    quiz: Math.floor(Math.random() * 10) + 1,
    lastUpdated: new Date().toDateString(),
  },
  {
    id: 3323,
    value: 3323,
    label: `Section 2`,
    totalTopics: Math.floor(Math.random() * 30) + 1,
    quiz: Math.floor(Math.random() * 10) + 1,
    lastUpdated: new Date().toDateString(),
  },
  {
    id: 4323,
    value: 4323,
    label: `Section 3`,
    totalTopics: Math.floor(Math.random() * 30) + 1,
    quiz: Math.floor(Math.random() * 10) + 1,
    lastUpdated: new Date().toDateString(),
  },
  {
    id: 2323,
    value: 2323,
    label: `Section 4`,
    totalTopics: Math.floor(Math.random() * 30) + 1,
    quiz: Math.floor(Math.random() * 10) + 1,
    lastUpdated: new Date().toDateString(),
  },
  {
    id: 323,
    value: 323,
    label: `Section 5`,
    totalTopics: Math.floor(Math.random() * 30) + 1,
    quiz: Math.floor(Math.random() * 10) + 1,
    lastUpdated: new Date().toDateString(),
  },
  {
    id: 32243,
    value: 32243,
    label: `Section 6`,
    totalTopics: Math.floor(Math.random() * 30) + 1,
    quiz: Math.floor(Math.random() * 10) + 1,
    lastUpdated: new Date().toDateString(),
  },
];

const modifiedSectionArr = sectionArr.map((section) => {
  return {
    id: section.id,
    label: `${section.label.toUpperCase()}: Total topics- ${
      section.totalTopics
    }, Quiz- ${section.quiz}`,
    value: section.value,
    totalTopics: section.totalTopics,
    quiz: section.quiz,
    lastUpdated: section.lastUpdated,
  };
});

const EducatorContentManagementPage = () => {
  const educatorContext = useContext(EducatorContext);

  const [modifiedChapters, setModifiedChapters] = useState([]);
  const [modifiedSections, setModifiedSections] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [selectedSection, setSelectedSection] = useState();
  const [showTopicLists, setShowTopicLists] = useState(false);
  const [showAddTopicCard, setShowAddTopicCard] = useState();
  const [showQuizCommentBtn, setShowQuizCommentBtn] = useState(true);
  const [stopShowAddTopicCard, setStopShowAddTopicCard] = useState(true);
  const [contentForOutput, setContentForOutput] = useState();
  const [showTopic, setShowTopic] = useState(false);
  const [sectionId, setSectionId] = useState();
  const [topicId, setTopicId] = useState();
  const [updatedFromBack, setUpdatedFromBack] = useState(false);

  const subjectDropdownRef = useRef();
  const chapterDropdownRef = useRef();
  const sectionDropdownRef = useRef();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const registeredSubjectsArr = educatorContext.registeredSubjects;
  const modifiedRegisteredSubjects = registeredSubjectsArr.map((sub) => {
    return {
      label: `${sub.name.toUpperCase()}: Grade- ${sub.grade}, Subject code- ${
        sub.code
      }, Enrollments- ${sub.enrollments}, Educator- ${sub.educator}`,
      id: sub.id,
      value: sub.id,
      grade: sub.grade,
      code: sub.code,
      enrollments: sub.enrollments,
      educator: sub.educator,
      description: sub.description,
      createdAt: sub.createdAt,
    };
  });

  const displayTopicLists = () => {
    if (selectedSubject && selectedChapter && selectedSection) {
      setShowTopicLists(true);
    } else {
      setShowTopicLists(false);
    }
  };

  const closeTopicLists = () => {
    setShowTopicLists(false);
  };

  const displayAddTopicCard = () => {
    setShowQuizCommentBtn(false);
    setShowAddTopicCard(true);
    setStopShowAddTopicCard(true);
  };

  const closeAddTopicCard = () => {
    setShowQuizCommentBtn(true);
    setShowAddTopicCard(false);
    displayTopicLists();
  };

  const addTopicHandler = () => {
    closeTopicLists();
    displayAddTopicCard();
  };

  let viewContentHeader;
  if (selectedSubject && selectedChapter && selectedSection) {
    viewContentHeader = {
      subject: {
        name: selectedSubject.label.split(':')[0],
      },
      chapter: {
        name: selectedChapter.label.split(':')[0],
      },
      section: {
        name: selectedSection.label.split(':')[0],
      },
    };
  }

  // ! Working here ***************************************

  const subjectDropdownOnChange = async (subject, dropdownName) => {
    if (showAddTopicCard !== false || !stopShowAddTopicCard) {
      if (selectedChapter && chapterDropdownRef.current) {
        chapterDropdownRef.current.clearSelection();
      }
      if (selectedSection && sectionDropdownRef.current) {
        sectionDropdownRef.current.clearSelection();
      }
      setSelectedChapter();
      setSelectedSection();
    }
    setSelectedSubject(subject);

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/chapters/${subject.id}`
      );
      // setChapters(responseData.chapters);

      const modifiedChaptersArr = responseData.chapters.map((chapter) => {
        return {
          id: chapter.id,
          label: `${chapter.name.toUpperCase()}: Total section- ${
            chapter.totalSections
          }, Total topics- ${chapter.totalTopics}, Quiz- ${chapter.quiz},`,
          value: chapter.name + chapter.id,
          totalSections: chapter.totalSections,
          totalTopics: chapter.totalTopics,
          quiz: chapter.quiz,
          lastUpdated: chapter.updatedAt,
        };
      });

      setModifiedChapters(modifiedChaptersArr);
    } catch (error) {
      setModifiedChapters([]);
    }
  };

  const chapterDropdownOnChange = async (chapter, dropdownName) => {
    if (showAddTopicCard !== false || !stopShowAddTopicCard) {
      if (selectedSection && sectionDropdownRef.current) {
        sectionDropdownRef.current.clearSelection();
      }
      setSelectedSection();
    }

    setSelectedChapter(chapter);

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/sections/${chapter.id}`
      );
      // setChapters(responseData.chapters);

      const modifiedSectionArr = responseData.sections.map((section) => {
        return {
          id: section.id,
          label: `${section.name.toUpperCase()}: Total topics- ${
            section.totalTopics
          }, Quiz- ${section.quiz}`,
          value: section.name + section.id,
          totalTopics: section.totalTopics,
          quiz: section.quiz,
          lastUpdated: section.lastUpdated,
        };
      });

      setModifiedSections(modifiedSectionArr);
    } catch (error) {
      setModifiedSections([]);
    }
  };

  // let toggle = false;
  const sectionDropdownOnChange = (section, dropdownName) => {
    if (section) {
      setSectionId((prevSectionId) => {
        return section.id;
      });
    }
    setSelectedSection(section);
    setShowTopicLists(false); // new section turning off the topicLists, useEffect then activate topic lists again because the section changed
  };

  const saveTopicHandler = async (editorContent) => {
    // console.log('editorContentMgt page saveTopicHandler=> ', editorContent);
    setContentForOutput(editorContent);
    setShowTopic(true);
    setTopicId();

    const subjectId = selectedSubject.id;
    const chapterId = selectedChapter.id;
    const sectionId = selectedSection.id;
    const title = editorContent.inputs.title.value;
    const description = editorContent.inputs.description.value;
    const lectureNote = editorContent.inputs.lectureNote.value;
    const content = editorContent.inputs.topicContent.value;

    // Creating the content file
    const contentBlob = new Blob([JSON.stringify(content)], {
      type: 'application/json;charset=utf-8',
    });
    let contentFile = new File([contentBlob], 'content.json', {
      type: 'application/json',
    });

    try {
      const formData = new FormData();
      formData.append('subjectId', subjectId);
      formData.append('chapterId', chapterId);
      formData.append('sectionId', sectionId);
      formData.append('title', title);
      formData.append('description', description);
      if (lectureNote) {
        formData.append('lectureNote', lectureNote, lectureNote.name);
      }
      formData.append('content', contentFile);

      const responseData = await sendRequest(
        'http://localhost:5000/api/educator/topic',
        'POST',
        formData
      );

      setTopicId(responseData.topic.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeTopicCard = () => {
    setShowTopic(false);
    closeAddTopicCard();
    setShowQuizCommentBtn(true); // enable the quiz and comment button again
    // When back from the quill output
    setUpdatedFromBack(true);
  };

  useEffect(() => {
    if (showAddTopicCard === false && stopShowAddTopicCard) {
      setStopShowAddTopicCard(false);

      if (subjectDropdownRef) {
        // console.log('sub');
        subjectDropdownRef.current.selectSingleItem({
          value: selectedSubject.value,
        });
        if (chapterDropdownRef) {
          // console.log('chap');
          chapterDropdownRef.current.selectSingleItem({
            value: selectedChapter.value,
          });
          if (sectionDropdownRef) {
            // console.log('sec');
            sectionDropdownRef.current.selectSingleItem({
              value: selectedSection.value,
            });
          }
        }
      }
    }
  }, [showAddTopicCard, stopShowAddTopicCard]);

  useEffect(() => {
    displayTopicLists();
    setUpdatedFromBack(false);
  }, [selectedSubject, selectedChapter, selectedSection]);

  return (
    <React.Fragment>
      <div className="view-content-main-container">
        {!showAddTopicCard && (
          <div className="view-content-main-header">
            {!selectedSubject && (
              <p>
                To view content, please select a subject from the dropdown list
                below
              </p>
            )}
            {selectedSubject && (
              <p>
                To change the subject, chapter, section, or topic, select again
                from the dropdown
              </p>
            )}
          </div>
        )}

        {!showAddTopicCard && (
          <div className="all-dropdown-container">
            <table>
              <tbody>
                <tr>
                  <td>
                    <p className="drop-down-title">Subject</p>
                  </td>
                  <td>
                    <Dropdown
                      name="subjects"
                      title="Select a subject"
                      list={modifiedRegisteredSubjects}
                      onChange={subjectDropdownOnChange}
                      ref={subjectDropdownRef}
                      id="overallStyle"
                      searchable={['Search for subject', 'No matching subject']}
                    />
                  </td>
                </tr>

                {selectedSubject && modifiedChapters && (
                  <tr>
                    <td>
                      <p className="drop-down-title">Chapter</p>
                    </td>
                    <td>
                      <Dropdown
                        name="chapters"
                        title="Select a chapter"
                        list={modifiedChapters}
                        onChange={chapterDropdownOnChange}
                        ref={chapterDropdownRef}
                        id="overallStyle"
                        searchable={[
                          'Search for chapter',
                          'No matching chapter',
                        ]}
                      />
                    </td>
                  </tr>
                )}

                {selectedSubject && selectedChapter && modifiedSections && (
                  <tr>
                    <td>
                      <p className="drop-down-title">Section</p>
                    </td>
                    <td>
                      <Dropdown
                        name="sections"
                        title="Select a section"
                        list={modifiedSections}
                        onChange={sectionDropdownOnChange}
                        ref={sectionDropdownRef}
                        id="overallStyle"
                        searchable={[
                          'Search for section',
                          'No matching section',
                        ]}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Selected subject header */}
        {selectedSubject && selectedChapter && selectedSection && (
          <React.Fragment>
            <EducatorContentManagementHeader
              showQuizCommentBtn={showQuizCommentBtn}
              info={{
                subject: selectedSubject,
                chapter: selectedChapter,
                section: selectedSection,
              }}
            />
          </React.Fragment>
        )}
      </div>

      {sectionId && (
        <EducatorTopicPg
          onShow={showTopicLists}
          onAddTopic={addTopicHandler}
          newTopic={contentForOutput}
          sectionId={sectionId}
          updatedFromBack={updatedFromBack}
        />
      )}
      {!showTopic && (
        <EducatorAddTopicPage
          show={showAddTopicCard}
          onBack={closeAddTopicCard}
          onSaveTopic={saveTopicHandler}
        />
      )}
      {showTopic && topicId && (
        <QuillOutput
          // content={contentForOutput}
          onBack={closeTopicCard}
          topicId={topicId}
        />
      )}
    </React.Fragment>
  );
};

export default EducatorContentManagementPage;
