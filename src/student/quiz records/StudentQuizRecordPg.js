import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../Shared/context/AuthContext';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import StudentQuizResult from '../access content/subject/quiz/StudentQuizResult';
import StudentQuizRecordList from './StudentQuizRecordList';

const tempQuizzes = [
  {
    ops: [
      {
        insert: {
          formula: '\\cos (2\\theta) = \\cos^2 \\theta - \\sin^2 \\theta',
        },
      },
      {
        insert: ' \n\n',
      },
      {
        insert:
          'You just have to type the name of the letter after a backslash: if the first letter is lowercase, you will get a lowercase Greek letter, if the first letter is uppercase (and only the first letter), then you will get an uppercase letter. Note that some uppercase Greek letters look like Latin ones, so they are not provided by LaTeX (e.g. uppercase ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'Alpha',
      },
      {
        insert: ' and ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'Beta',
      },
      {
        insert:
          ' are just "A" and "B", respectively). Lowercase epsilon, theta, kappa, phi, pi, rho, and sigma are provided in two different versions. The alternate, or ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'var',
      },
      {
        insert:
          'iant, version is created by adding "var" before the name of the letter:\n',
      },
    ],
    options: [
      {
        option1: 'option 1',
      },
      {
        option2: 'option 2',
      },
      {
        option3: 'option 3',
      },
      {
        option4: 'option 4',
      },
    ],
    answer: 'option1',
  },
  {
    ops: [
      {
        insert: {
          formula: '\\cos (2\\theta) = \\cos^2 \\theta - \\sin^2 \\theta',
        },
      },
      {
        insert:
          '\nGreek letters are commonly used in mathematics, and they are very easy to type in ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'math mode',
      },
      {
        insert:
          '. You just have to type the name of the letter after a backslash: if the first letter is lowercase, you will get a lowercase Greek letter, if the first letter is uppercase (and only the first letter), then you will get an uppercase letter. Note that some uppercase Greek letters look like Latin ones, so they are not provided by LaTeX (e.g. uppercase ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'Alpha',
      },
      {
        insert: ' and ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'Beta',
      },
      {
        insert:
          ' are just "A" and "B", respectively). Lowercase epsilon, theta, kappa, phi, pi, rho, and sigma are provided in two different versions. The alternate, or ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'var',
      },
      {
        insert:
          'iant, version is created by adding "var" before the name of the letter:\n',
      },
    ],
    options: [
      {
        option1: 'option 1',
      },
      {
        option2: 'option 2',
      },
      {
        option3: 'option 3',
      },
      {
        option4: 'option 4',
      },
    ],
    answer: 'option3',
  },
  {
    ops: [
      {
        attributes: {
          height: '244',
          width: '488',
        },
        insert: {
          video: 'https://www.youtube.com/embed/R9I85RhI7Cg?showinfo=0',
        },
      },
      {
        insert:
          '\nGreek letters are commonly used in mathematics, and they are very easy to type in ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'math mode',
      },
      {
        insert:
          '. You just have to type the name of the letter after a backslash: if the first letter is lowercase, you will get a lowercase Greek letter, if the first letter is uppercase (and only the first letter), then you will get an uppercase letter. Note that some uppercase Greek letters look like Latin ones, so they are not provided by LaTeX (e.g. uppercase ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'Alpha',
      },
      {
        insert: ' and ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'Beta',
      },
      {
        insert:
          ' are just "A" and "B", respectively). Lowercase epsilon, theta, kappa, phi, pi, rho, and sigma are provided in two different versions. The alternate, or ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'var',
      },
      {
        insert:
          'iant, version is created by adding "var" before the name of the letter:\n',
      },
    ],
    options: [
      {
        option1: 'option 1',
      },
      {
        option2: 'option 2',
      },
      {
        option3: 'option 3',
      },
      {
        option4: 'option 4',
      },
    ],
    answer: 'option2',
  },
  {
    ops: [
      {
        attributes: {
          height: '244',
          width: '488',
        },
        insert: {
          video: 'https://www.youtube.com/embed/iu-lIDjt0G8',
        },
      },
      {
        insert:
          '\nGreek letters are commonly used in mathematics, and they are very easy to type in ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'math mode',
      },
      {
        insert:
          '. You just have to type the name of the letter after a backslash: if the first letter is lowercase, you will get a lowercase Greek letter, if the first letter is uppercase (and only the first letter), then you will get an uppercase letter. Note that some uppercase Greek letters look like Latin ones, so they are not provided by LaTeX (e.g. uppercase ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'Alpha',
      },
      {
        insert: ' and ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'Beta',
      },
      {
        insert:
          ' are just "A" and "B", respectively). Lowercase epsilon, theta, kappa, phi, pi, rho, and sigma are provided in two different versions. The alternate, or ',
      },
      {
        attributes: {
          italic: true,
        },
        insert: 'var',
      },
      {
        insert:
          'iant, version is created by adding "var" before the name of the letter:\n',
      },
    ],
    options: [
      {
        option1: 'option 1',
      },
      {
        option2: 'option 2',
      },
      {
        option3: 'option 3',
      },
      {
        option4: 'option 4',
      },
    ],
    answer: 'option4',
  },
  {
    ops: [
      {
        insert:
          'Let f and g be the function from the set of integers to itself, defined by f(x) = 2x + and g(x) 3x + 4. Then the composition of and g is ',
      },
    ],
    options: [
      {
        option1: 'option 1',
      },
      {
        option2: 'option 2',
      },
      {
        option3: 'option 3',
      },
      {
        option4: 'option 4',
      },
    ],
    answer: 'option2',
  },
  {
    ops: [
      {
        insert:
          'Let f and g be the function from the set of integers to itself, defined by f(x) = 2x + and g(x) 3x + 4. Then the composition of and g is ',
      },
    ],
    options: [
      {
        option1: 'option 1',
      },
      {
        option2: 'option 2',
      },
      {
        option3: 'option 3',
      },
      {
        option4: 'option 4',
      },
    ],
    answer: 'option3',
  },
  {
    ops: [
      {
        insert:
          'Let f and g be the function from the set of integers to itself, defined by f(x) = 2x + and g(x) 3x + 4. Then the composition of and g is ',
      },
    ],
    options: [
      {
        option1: 'option 1',
      },
      {
        option2: 'option 2',
      },
      {
        option3: 'option 3',
      },
      {
        option4: 'option 4',
      },
    ],
    answer: 'option1',
  },
  {
    ops: [
      {
        insert:
          'Let f and g be the function from the set of integers to itself, defined by f(x) = 2x + and g(x) 3x + 4. Then the composition of and g is ',
      },
    ],
    options: [
      {
        option1: 'option 1',
      },
      {
        option2: 'option 2',
      },
      {
        option3: 'option 3',
      },
      {
        option4: 'option 4',
      },
    ],
    answer: 'option4',
  },
  {
    ops: [
      {
        insert:
          'Let f and g be the function from the set of integers to itself, defined by f(x) = 2x + and g(x) 3x + 4. Then the composition of and g is ',
      },
    ],
    options: [
      {
        option1: 'option 1',
      },
      {
        option2: 'option 2',
      },
      {
        option3: 'option 3',
      },
      {
        option4: 'option 4',
      },
    ],
    answer: 'option3',
  },
  {
    ops: [
      {
        insert:
          'Powers and indices are equivalent to superscripts and subscripts in normal text mode. The caret (^; also known as the circumflex accent) character is used to raise something, and the underscore (_) is for lowering. If an expression containing more than one character is raised or lowered, it should be grouped using curly braces ({ and }). ',
      },
    ],
    options: [
      {
        option1: 'option 1',
      },
      {
        option2: 'option 2',
      },
      {
        option3: 'option 3',
      },
      {
        option4: 'option 4',
      },
    ],
    answer: 'option2',
  },
];

const StudentQuizRecordPg = (props) => {
  const auth = useContext(AuthContext);
  const [quizRecords, setQuizRecords] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [showSingleQuiz, setShowSingleQuiz] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getQuiz = useCallback(async (quizId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/quiz/${quizId}`
      );
      setQuiz(responseData.quiz);
    } catch (error) {
      setQuiz();
    }
  });

  const getQuizRecords = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/student/quiz-records/${auth.loggedInUser_asynchronous.id}/${props.subject.id}`
      );
      setQuizRecords(responseData.records);
    } catch (error) {
      setQuizRecords([]);
    }
  });

  const displaySingleQuiz = () => {
    setShowSingleQuiz(true);
  };
  const closeSingleQuiz = () => {
    setShowSingleQuiz(false);
  };

  const viewQuizHandler = (quizId) => {
    getQuiz(quizId);
    displaySingleQuiz();
  };

  useEffect(() => {
    getQuizRecords();
  }, [props.subject]);

  console.log(quizRecords);

  return (
    <React.Fragment>
      {showSingleQuiz && quiz && (
        <StudentQuizResult onBack={closeSingleQuiz} quizzes={quiz} />
      )}

      {!showSingleQuiz && quizRecords && (
        <StudentQuizRecordList
          quizRecords={quizRecords}
          onViewQuiz={viewQuizHandler}
          onBack={props.onBack}
        />
      )}
    </React.Fragment>
  );
};

export default StudentQuizRecordPg;
