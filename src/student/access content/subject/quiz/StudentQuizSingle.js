import React from 'react';
import ReactQuill from 'react-quill';
import Input from '../../../../Shared/components/FormElements/Input';

const StudentQuizSingle = (props) => {
  // console.log(props.quiz ? props.quiz.option1 : '');
  // return <p>{'ff'}</p>;
  return (
    <React.Fragment>
      {props.quiz && (
        <div className="single-quiz-question">
          <p className="quiz-question-num"> {`Question ${props.id}`}</p>
          <ReactQuill
            theme={'bubble'}
            value={props.quiz.question.ops}
            readOnly={true}
            className="react-quill-for-output readonly"
          />
          {Array.from(Array(4), (e, i) => {
            // console.log(props.question.options[i][`option${i + 1}`]);
            const option = `option${i + 1}`;
            return (
              <Input
                element="radio"
                type="radio"
                id={'question' + props.id}
                name={props.id}
                className="student-quiz"
                onInput={props.inputHandler}
                textValue={props.quiz[`option${i + 1}`]}
                inputForLabel={props.quiz[`option${i + 1}`]}
              />
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default StudentQuizSingle;
