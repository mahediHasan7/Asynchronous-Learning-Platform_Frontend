import React, { useEffect, useRef, useState, useContext } from 'react';
import { Dropdown } from 'reactjs-dropdown-component';
import { EducatorContext } from '../../Shared/context/EducatorContext';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import './EducatorCommentManagementPage.css';
import EducatorCommentPg from './EducatorCommentPg';

const chaptersArr = [
  {
    value: 323,
    label: `Chapter 1`,
    totalSections: 3,
    totalTopics: 7,
    quiz: 2,
    lastUpdated: new Date().toDateString(),
  },
  {
    value: 1212,
    label: 'Chapter 2',
    totalSections: 3,
    totalTopics: 15,
    quiz: 13,
    lastUpdated: new Date().toDateString(),
  },
  {
    value: 31231,
    label: 'Functions 33',
    totalSections: 8,
    totalTopics: 24,
    quiz: 10,
    lastUpdated: new Date().toDateString(),
  },
  {
    value: 13313,
    label: 'Functions 44',
    totalSections: 3,
    totalTopics: 21,
    quiz: 13,
    lastUpdated: new Date().toDateString(),
  },
  {
    value: 13613,
    label: 'Functions 5',
    totalSections: 5,
    totalTopics: 9,
    quiz: 8,
    lastUpdated: new Date().toDateString(),
  },
  {
    value: 13153,
    label: 'Functions 6',
    totalSections: 9,
    totalTopics: 13,
    quiz: 13,
    lastUpdated: new Date().toDateString(),
  },
  {
    value: 13132,
    label: 'Functions 7',
    totalSections: 7,
    totalTopics: 43,
    quiz: 33,
    lastUpdated: new Date().toDateString(),
  },
  {
    value: 7676,
    label: 'Functions 8',
    totalSections: 7,
    totalTopics: 40,
    quiz: 31,
    lastUpdated: new Date().toDateString(),
  },
  {
    value: 2678,
    label: 'Functions 9',
    totalSections: 9,
    totalTopics: 35,
    quiz: 23,
    lastUpdated: new Date().toDateString(),
  },
];

const modifiedChaptersArr = chaptersArr.map((chapter) => {
  return {
    label: `${chapter.label.toUpperCase()}: Total section- ${
      chapter.totalSections
    }, Total topics- ${chapter.totalTopics}, Quiz- ${chapter.quiz},`,
    value: chapter.value,
    totalSections: chapter.totalSections,
    totalTopics: chapter.totalTopics,
    quiz: chapter.quiz,
    lastUpdated: chapter.lastUpdated,
  };
});

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

const EducatorCommentManagementPage = () => {
  const educatorContext = useContext(EducatorContext);

  const [modifiedChapters, setModifiedChapters] = useState([]);
  const [modifiedSections, setModifiedSections] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [selectedSection, setSelectedSection] = useState();
  const [showTopicLists, setShowTopicLists] = useState(false);
  const [showAddTopicCard, setShowAddTopicCard] = useState();
  // const [showQuizCommentBtn, setShowQuizCommentBtn] = useState(true);
  const [stopShowAddTopicCard, setStopShowAddTopicCard] = useState(true);
  const [contentForOutput, setContentForOutput] = useState();
  const [showTopic, setShowTopic] = useState(false);

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
    // setShowQuizCommentBtn(false);
    setShowAddTopicCard(true);
    setStopShowAddTopicCard(true);
  };

  const closeAddTopicCard = () => {
    // setShowQuizCommentBtn(true);
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

  const sectionDropdownOnChange = (section, dropdownName) => {
    setSelectedSection(section);
    setShowTopicLists(false); // new section turning off the topicLists, useEffect then activate topic lists again because the section changed
  };

  const saveTopicHandler = (editorContent) => {
    // console.log('editorContentMgt page saveTopicHandler=> ', editorContent);
    setContentForOutput(editorContent);
    setShowTopic(true);
  };

  const closeTopicCard = () => {
    setShowTopic(false);
    closeAddTopicCard();
    // setShowQuizCommentBtn(true); // enable the quiz and comment button again
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
  }, [selectedSubject, selectedChapter, selectedSection]);

  return (
    <React.Fragment>
      <div className="view-content-main-container">
        {!showAddTopicCard && (
          <div className="view-content-main-header">
            {!selectedSubject && (
              <p>
                To view comments, please select a subject from the dropdown list
                below
              </p>
            )}
            {/* {selectedSubject && selectedChapter && selectedSection && (
              <p style={{ color: '#f34343' }}>
                If you change the subject, chapter or section, the current quiz
                data will be lost permanently!
              </p>
            )} */}
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
          <React.Fragment></React.Fragment>
        )}
      </div>

      {selectedSubject && selectedChapter && selectedSection && (
        <React.Fragment>
          <EducatorCommentPg sectionId={selectedSection.id} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EducatorCommentManagementPage;
