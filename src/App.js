import React, { useState } from 'react';
import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import { useCallback, useEffect } from 'react/cjs/react.development';
import AdminCommentPg from './admin/components/comments/AdminCommentPg';
import ChapterPg from './admin/components/subject/chapter/ChapterPg';
import ViewContentPage from './admin/components/view content/ViewContentPage';
import AccountRequestPage from './admin/pages/AccountRequestPage';
import DashboardPage from './admin/pages/DashboardPage';
import SubjectsPage from './admin/pages/SubjectsPage';
import EducatorAddTopicPage from './educator/content management/EducatorAddTopicPage';
import EducatorContentManagementPage from './educator/content management/EducatorContentManagementPage';
import EducatorSubjectsPage from './educator/pages/EducatorSubjectPage';
import EditPlace from './places/pages/EditPlace';
import NewPlace from './places/pages/NewPlace';
import UserPlace from './places/pages/UserPlace';
import Login from './Shared/AuthPages/Login';
import SignUp from './Shared/AuthPages/Signup';
import Button from './Shared/components/FormElements/Button';
import AsynchronousMainNavigation from './Shared/components/Navigation/components/AsynchronousMainNavigation';
import MainNavigation from './Shared/components/Navigation/components/MainNavigation';
import SvgIcon from './Shared/components/UIElements/SvgIcon';
import { AuthContext } from './Shared/context/AuthContext';
import { EducatorContext } from './Shared/context/EducatorContext';
import { StudentContext } from './Shared/context/StudentContext';
import Auth from './user/pages/Auth';
import User from './user/pages/User';

// React Quill Editor
import ReactQuill, { Quill } from 'react-quill';
import Delta from 'quill-delta';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import BlotFormatter from 'quill-blot-formatter';
import {
  DeleteAction,
  ResizeAction,
  ImageSpec,
  IframeVideoSpec,
} from 'quill-blot-formatter';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import EducatorQuizManagementPage from './educator/quiz management/EducatorQuizManagementPage';
import EducatorAddQuizPage from './educator/quiz management/EducatorAddQuizPage';
import QuizReport from './Shared/components/ALPComponents/QuizReport';
import EducatorCommentManagementPage from './educator/comments/EducatorCommentManagementPage';
import StudentSubjectsEnrollmentPg from './student/subject enrollment/StudentSubjectsEnrollmentPg';
import StudentSubjectsPg from './student/access content/subject/StudentSubjectsPg';
import StudentChapterPg from './student/access content/subject/chapter/StudentChapterPg';
import QuizRecordManagementPage from './student/quiz records/QuizRecordManagementPage';
import StudentFavPg from './student/favorite list/StudentFavPg';
import FavListManagementPage from './student/favorite list/FavListManagementPage';
import TestDeleteLater from './testDeleteLater';
import StudentProgressPg from './parent/learning progress/StudentProgressPg';
import ContactsPg from './parent/contacts/ContactsPg';
import ParentQuizRecordManagementPage from './parent/quiz records/ParentQuizRecordManagementPage';
window.katex = katex;

const App = () => {
  const [token, setToken] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const [subState, setSubState] = useState();
  const [educatorRegSubjects, setEducatorRegSubjects] = useState(null);
  const [studentRegSubjects, setStudentRegSubjects] = useState(null);

  // React Quill use states
  const ops = [{ insert: '' }];
  const [editorValue, setEditorValue] = useState(new Delta(ops));
  const [htmlValue, setHtmlValue] = useState(new Delta(ops));

  Quill.register('modules/blotFormatter', BlotFormatter);
  class CustomImageSpec extends ImageSpec {
    getActions() {
      return [ResizeAction, DeleteAction];
    }
  }
  class CustomVideoSpec extends IframeVideoSpec {
    getActions() {
      return [ResizeAction, DeleteAction];
    }
  }

  const modules = React.useMemo(
    () => ({
      toolbar: [
        [{ font: [] }],
        [{ size: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
        ['formula', 'link', 'image', 'video'],
        ['clean'],
      ],

      blotFormatter: {
        specs: [CustomImageSpec, CustomVideoSpec],
        overlay: {
          style: {
            border: '1px solid #33A95B',
          },
        },
      },
    }),
    []
  );

  //Asynchronous learning platform
  const [asynLogin, setAsynLogin] = useState(false);
  ///////////////////////////////////////////////

  const login = useCallback((token) => {
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('userData');
  }, []);

  const updateLoggedInUser = useCallback((user, token) => {
    //When user login or signup ,the user and the token will be saved into the local storage
    localStorage.setItem('userData', JSON.stringify({ user: user, token }));
    setLoggedInUser({ user, token });
  }, []);

  //Asynchronous learning platform
  const login_asynchronous = useCallback((token, loggedUser) => {
    // console.log(token, loggedUser);
    localStorage.setItem(
      'userData',
      JSON.stringify({ user: loggedUser, token })
    );
    setAsynLogin(token);
    setLoggedInUser(loggedUser);
  }, []);

  const logout_asynchronous = useCallback((loggedUser) => {
    localStorage.removeItem('userData');
    setAsynLogin(null);
    setLoggedInUser(null);
  }, []);

  const setSubject = (subjects) => {
    setSubState(subjects);
  };

  // EducatorContext function
  const educatorRegSubjectsHandler = (registeredSubjects) => {
    setEducatorRegSubjects(registeredSubjects);
  };

  // StudentContext function
  const studentEnrollSubjectsHandler = (enrolledSubjects) => {
    setStudentRegSubjects(enrolledSubjects);
  };

  ///////////////////////////////////////////////

  // Setting value from the Quill Editor for the Quill Output
  const [valueFromEditor, setValueFromEditor] = useState();
  const onChangeEditorValue = (value) => {
    setValueFromEditor(value);
  };

  useEffect(() => {
    const userDataFromLocalStorage = JSON.parse(
      localStorage.getItem('userData')
    );

    if (userDataFromLocalStorage) {
      // console.log('-->USE: ', userDataFromLocalStorage);
      login_asynchronous(
        userDataFromLocalStorage.token,
        userDataFromLocalStorage.user
      );
      setLoggedInUser(userDataFromLocalStorage.user);
    }
  }, [login_asynchronous]);

  let routes;
  if (asynLogin) {
    {
      // console.log('asynLogin', loggedInUser);
    }
    routes = (
      <Routes>
        {loggedInUser && loggedInUser.role === 'admin' && (
          <Route path="/" element={<DashboardPage />} exact />
        )}
        <Route path="/admin" element={<DashboardPage />} exact />
        <Route path="admin/requests" element={<AccountRequestPage />} exact />
        <Route path="/admin/subjects" element={<SubjectsPage />} exact />
        <Route
          path="/admin/subjects/:subName/:subId/chapters"
          element={<ChapterPg subject={subState} />}
          exact
        />
        <Route
          path="/admin/view_contents"
          element={<ViewContentPage />}
          exact
        />

        {loggedInUser && loggedInUser.role === 'educator' && (
          <>
            <Route
              path="/educator/subject_registration"
              element={<EducatorSubjectsPage />}
              exact
            />
            <Route
              path="/educator/content_management"
              element={<EducatorContentManagementPage />}
              exact
            />
            <Route
              path="/educator/quiz_management"
              element={<EducatorQuizManagementPage />}
              exact
            />
            <Route
              path="/educator/comments"
              element={<EducatorCommentManagementPage />}
              exact
            />
            <Route path="/" element={<EducatorSubjectsPage />} exact />
          </>
        )}

        {loggedInUser && loggedInUser.role === 'student' && (
          <>
            <Route
              path="/student/subject_enrollment"
              element={<StudentSubjectsEnrollmentPg />}
              exact
            />
            <Route
              path="/student/access_content"
              element={<StudentSubjectsPg />}
              exact
            />
            <Route
              path="/student/quiz_records"
              element={<QuizRecordManagementPage />}
              exact
            />
            <Route
              path="/student/favorite_list"
              element={<FavListManagementPage />}
              exact
            />

            <Route
              path="/student/subjects/:subName/:subId/"
              element={<StudentChapterPg />}
              exact
            />
            <Route path="/" element={<StudentSubjectsEnrollmentPg />} exact />
          </>
        )}

        {loggedInUser && loggedInUser.role === 'parent' && (
          <>
            <Route
              path="/parent/student_progress"
              element={<StudentProgressPg />}
              exact
            />
            <Route
              path="/parent/quiz_records"
              element={<ParentQuizRecordManagementPage />}
              exact
            />
            <Route path="/parent/contacts" element={<ContactsPg />} exact />

            <Route path="/" element={<StudentProgressPg />} exact />
          </>
        )}

        <Route path="/" element={<Login />} exact />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    // {
    //   console.log('NOTasynLogin');
    // }
    routes = (
      <Routes>
        <Route
          path="/test"
          element={<TestDeleteLater />}
          // element={<QuizSingle />}
          exact
        />

        <Route path="/auth" element={<Login />} exact />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLogin: !!token,
        login: login,
        logout: logout,
        loggedInUser: loggedInUser, // both the user and token is provided into
        updateLoggedInUser: updateLoggedInUser,
        setSubject: setSubject,
        isLogin_asynchronous: asynLogin,
        login_asynchronous: login_asynchronous,
        logout_asynchronous: logout_asynchronous,
        loggedInUser_asynchronous: loggedInUser,
      }}
    >
      <EducatorContext.Provider
        value={{
          registeredSubjects: educatorRegSubjects,
          setRegisteredSubjects: educatorRegSubjectsHandler,
        }}
      >
        <StudentContext.Provider
          value={{
            enrolledSubjects: studentRegSubjects,
            setEnrolledSubjects: studentEnrollSubjectsHandler,
          }}
        >
          <Router>
            <AsynchronousMainNavigation />
            <div className="top-level-gap"></div>
            <main>{routes}</main>
          </Router>
        </StudentContext.Provider>
      </EducatorContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
