import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from 'react';
import { Dropdown } from 'reactjs-dropdown-component';
import Button from '../../Shared/components/FormElements/Button';
import { EducatorContext } from '../../Shared/context/EducatorContext';

import './EducatorQuizManagementPage.css';
import SvgIcon from '../../Shared/components/UIElements/SvgIcon';
import QuillEditor from '../../Shared/components/UIElements/QuillEditor';
import QuillOutput from '../../Shared/components/UIElements/QuillOutput';
import EducatorAddQuizPage from './EducatorAddQuizPage';
import QuizOutput from '../../Shared/components/ALPComponents/QuizOutput';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import QuizOutputWithServerData from './QuizOutputWithServerData';

const EducatorQuizManagementPage = () => {
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
  const [showQuiz, setShowQuiz] = useState(false);
  const [availableQuiz, setAvailableQuiz] = useState();
  const [quizData, setQuizData] = useState();
  const [newQuizId, setNewQuizId] = useState();

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

  const displayQuiz = () => {
    setShowQuiz(true);
  };
  const closeQuiz = () => {
    setShowQuiz(false);
  };

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
    setShowQuiz(false);

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
    setShowQuiz(false);

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
    setShowQuiz(false);
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

  const quizzesDataHandler = async (quizData, quizId) => {
    setQuizData(quizData);
    setNewQuizId(quizId);
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

  useEffect(async () => {
    if (selectedSection) {
      const sectionId = selectedSection.id;

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/educator/quiz/${sectionId}`,
          'GET',
          null
        );
        if (responseData) {
          setAvailableQuiz(true);
        } else {
          setAvailableQuiz(false);
        }
        // console.log(responseData);
      } catch (error) {
        setAvailableQuiz(false);

        console.log(error.message);
      }
    }
  }, [selectedSection]);

  return (
    <React.Fragment>
      <div className="view-content-main-container">
        {!showAddTopicCard && (
          <div className="view-content-main-header">
            {!selectedSubject && (
              <p>
                To add a quiz, please select a subject from the dropdown list
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

                {selectedSubject && (
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

                {selectedSubject && selectedChapter && (
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
            {!showQuiz && !availableQuiz && (
              <p
                style={{
                  color: '#f34343',
                  fontSize: '1.6rem',
                  fontWeight: '600',
                  marginLeft: '1rem',
                  padding: '.5rem 0',
                }}
              >
                If you change the subject, chapter or section, the newly entered
                quiz data will be lost permanently!
              </p>
            )}
          </React.Fragment>
        )}
      </div>

      {selectedSubject && selectedChapter && selectedSection && (
        <React.Fragment>
          {!availableQuiz && (
            <EducatorAddQuizPage
              // show={true}
              displayQuiz={displayQuiz}
              closeQuiz={closeQuiz}
              selectedSubject={selectedSubject}
              selectedChapter={selectedChapter}
              selectedSection={selectedSection}
              onAddingQuizzes={quizzesDataHandler}
            />
          )}
          {!showQuiz && availableQuiz && (
            <QuizOutputWithServerData
              // quizData={quizData}
              selectedSubject={selectedSubject}
              selectedChapter={selectedChapter}
              selectedSection={selectedSection}
            />
          )}
          {showQuiz && (
            <QuizOutput
              newQuizId={newQuizId}
              quizData={quizData}
              selectedSubject={selectedSubject}
              selectedChapter={selectedChapter}
              selectedSection={selectedSection}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EducatorQuizManagementPage;
