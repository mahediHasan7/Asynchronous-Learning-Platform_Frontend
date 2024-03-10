import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dropdown } from 'reactjs-dropdown-component';
import { useHttpClient } from '../../../Shared/hooks/http-hook';
import AdminCommentPg from '../comments/AdminCommentPg';
import TopicPg from './TopicPg';
import './ViewContentPage.css';

const ViewContentPage = () => {
  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [selectedSection, setSelectedSection] = useState();
  const [selectedTopic, setSelectedTopic] = useState();

  const [modifiedSubjects, setModifiedSubjects] = useState();
  const [modifiedChapters, setModifiedChapters] = useState();
  const [modifiedSections, setModifiedSections] = useState();
  const [modifiedTopics, setModifiedTopics] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState();

  const [showComments, setShowComments] = useState(false);

  const subjectDropdownRef = useRef();
  const chapterDropdownRef = useRef();
  const sectionDropdownRef = useRef();
  const topicDropdownRef = useRef();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getAllSubjects = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/subjects/`
      );

      const modifiedSubjectsArr = responseData.subjects.map((subject) => {
        return {
          id: subject.id,
          label: `${subject.name.toUpperCase()}: Grade- ${
            subject.grade
          },Subject code- ${subject.code}, Enrollments- ${
            subject.enrollment
          }, Educator- ${subject.ecucator},`,
          value: subject.name + subject.id,
        };
      });

      setModifiedSubjects(modifiedSubjectsArr);
    } catch (error) {
      setModifiedSubjects([]);
    }
  });

  const updateTopicsAfterDelete = useCallback(async () => {
    // try {
    //   const responseData = await sendRequest(
    //     `http://localhost:5000/api/admin/topics/${selectedSection.id}`
    //   );

    //   const modifiedTopicsArr = responseData.topics.map((topic) => {
    //     return {
    //       id: topic.id,
    //       label: `${topic.title.toUpperCase()}`,
    //       value: topic.title,
    //       title: topic.title,
    //       description: topic.description,
    //       lectureNote: topic.lectureNote,
    //       content: topic.content,
    //       createdAt: topic.createdAt,
    //       updatedAt: topic.updatedAt,
    //       SectionId: topic.SectionId,
    //     };
    //   });

    //   setModifiedTopics(modifiedTopicsArr);
    // } catch (error) {
    //   setModifiedTopics([]);
    // }
    setDeleteConfirmation(true);
    setSelectedSection();
    setSelectedTopic();
  });

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
    //Reset before new selection
    setDeleteConfirmation(false);
    setShowComments(false);
    if (selectedChapter && chapterDropdownRef.current) {
      chapterDropdownRef.current.clearSelection();
    }
    setSelectedChapter();
    setSelectedSection();
    setSelectedTopic();

    setSelectedSubject(subject);

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/educator/chapters/${subject.id}`
      );

      const modifiedChaptersArr = responseData.chapters.map((chapter) => {
        return {
          id: chapter.id,
          label: `${chapter.name.toUpperCase()}: Total section- ${
            chapter.totalSections
          }, Total topics- ${chapter.totalTopics}`,
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

    // const itemValue = subject.value;
    // subjectDropdownRef.current.selectSingleItem({ value: itemValue });
  };

  const chapterDropdownOnChange = async (chapter, dropdownName) => {
    //Reset before new selection
    setDeleteConfirmation(false);
    setShowComments(false);
    if (selectedSection && sectionDropdownRef.current) {
      sectionDropdownRef.current.clearSelection();
    }
    setSelectedSection();
    setSelectedTopic();

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
          }`,
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
    // const itemValue = chapter.value;
    // chapterDropdownRef.current.selectSingleItem({ value: itemValue });
  };

  const sectionDropdownOnChange = async (section, dropdownName) => {
    //Reset before new selection
    setShowComments(true);
    setDeleteConfirmation(false);
    if (selectedTopic && topicDropdownRef.current) {
      topicDropdownRef.current.clearSelection();
    }
    setSelectedTopic();
    // if (topicDropdownRef.current) {
    //   topicDropdownRef.current.clearSelection();
    // }

    setSelectedSection(section);

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/topics/${section.id}`
      );

      const modifiedTopicsArr = responseData.topics.map((topic) => {
        return {
          id: topic.id,
          label: `${topic.title.toUpperCase()}`,
          value: topic.title,
          title: topic.title,
          description: topic.description,
          lectureNote: topic.lectureNote,
          content: topic.content,
          createdAt: topic.createdAt,
          updatedAt: topic.updatedAt,
          SectionId: topic.SectionId,
        };
      });

      console.log(modifiedTopicsArr);

      setModifiedTopics(modifiedTopicsArr);
    } catch (error) {
      setModifiedTopics([]);
    }
    // const itemValue = section.value;
    // chapterDropdownRef.current.selectSingleItem({ value: itemValue });
  };

  const topicDropdownOnChange = (topic, dropdownName) => {
    setDeleteConfirmation(false);

    setSelectedTopic(topic);
  };

  const onClickComment = () => {
    setShowComments(true);
  };

  useEffect(() => {
    getAllSubjects();
  }, []);

  // useEffect(() => {
  //   if (!selectedTopic && topicDropdownRef.current) {
  //     topicDropdownRef.current.clearSelection();
  //   }
  // }, [topicDropdownRef.current]);

  return (
    <React.Fragment>
      <div className="view-content-main-container">
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
                    list={modifiedSubjects}
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
                      searchable={['Search for chapter', 'No matching chapter']}
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
                      searchable={['Search for section', 'No matching section']}
                    />
                  </td>
                </tr>
              )}
              {selectedSubject && selectedChapter && selectedSection && (
                <tr>
                  <td>
                    <p className="drop-down-title">Topic</p>
                  </td>
                  <td>
                    <Dropdown
                      name="topics"
                      title="Select a topic"
                      list={modifiedTopics}
                      onChange={topicDropdownOnChange}
                      ref={topicDropdownRef}
                      id="overallStyle"
                      searchable={['Search for topic', 'No matching topic']}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedSubject &&
        selectedChapter &&
        selectedSection &&
        selectedTopic && (
          <TopicPg
            info={viewContentHeader}
            topicName={selectedTopic.label.split(':')[0]}
            onClickComment={onClickComment}
            topic={selectedTopic}
            onDelete={updateTopicsAfterDelete}
          />
        )}

      {showComments &&
        selectedSubject &&
        selectedChapter &&
        selectedSection && <AdminCommentPg sectionId={selectedSection.id} />}

      {deleteConfirmation && (
        <div className="topic-pg-status-container">
          <p>
            <span> Topic has been deleted from the database.</span>
            {<br />}
            <span style={{ fontSize: '1.2rem' }}>
              Please pick a new one from the dropdown above
            </span>
          </p>
        </div>
      )}
    </React.Fragment>
  );
};

export default ViewContentPage;
