import React, { useRef, useState, useEffect } from 'react';
import Button from './Button';

import './ImageUpload.css';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const inputHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const buttonHandler = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    setImageUrl(props.image);
  }, []);

  return (
    <div className="form-control">
      <input
        type="file"
        accept=".jpg, .png, .jpeg"
        id={props.id}
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={inputHandler}
      />

      <div className={`image-upload ${props.center && 'center'}`}>
        <div className={`image-upload__preview ${props.className} `}>
          {imageUrl && <img src={imageUrl} alt="preview" />}
          {!imageUrl && props.buttonText !== 'UPLOAD STEP-BY-STEP SOLUTION' && (
            <p style={{ lineHeight: '1.5' }}>
              Upload a {<br />}profile picture
            </p>
          )}
          {!imageUrl && props.buttonText === 'UPLOAD STEP-BY-STEP SOLUTION' && (
            <p style={{ lineHeight: '1.5', padding: '2rem' }}>
              Step-by-step solution preview {<br />}[optional upload]
            </p>
          )}
        </div>
        <Button type="button" onClick={buttonHandler}>
          {props.buttonText === 'UPLOAD STEP-BY-STEP SOLUTION'
            ? 'Upload step-by-step solution'
            : 'UPLOAD PICTURE'}
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;

const deletelater = {
  subject: {
    label:
      'ADDITIONAL MATHEMATICS 1: Grade- Form 4, Subject code- 201, Enrollments- 49, Educator- Kathleen Arroyo',
    id: 124,
    value: 124,
    grade: 'Form 4',
    code: '201',
    enrollments: 49,
    educator: 'Kathleen Arroyo',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur eligendi enim totam! Culpa eaque accusamus suscipit modi facere quaerat adipisci a atque sunt, perferendis sed temporibus magni tempore dolorem voluptatem. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, recusandae veniam quos ratione consequatur, soluta obcaecati, sequi vel sapiente autem totam rerum deserunt labore incidunt facilis similique. A, cum repudiandae? \n\n Culpa eaque accusamus suscipit modi facere quaerat adipisci a atque sunt, perferendis sed temporibus magni tempore dolorem voluptatem. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, recusandae veniam quos ratione consequatur, soluta obcaecati, sequi vel sapiente autem totam rerum deserunt labore incidunt facilis similique. A, cum repudiandae!',
    createdAt: 'Aug 21, 2021',
  },
  chapter: {
    label: 'CHAPTER 1: Total section- 3, Total topics- 7, Quiz- 2,',
    value: 323,
    totalSections: 3,
    totalTopics: 7,
    quiz: 2,
    lastUpdated: 'Sat Apr 02 2022',
  },
  section: {
    id: 3323,
    label: 'SECTION 2: Total topics- 12, Quiz- 5',
    value: 3323,
    totalTopics: 12,
    quiz: 5,
    lastUpdated: 'Sat Apr 02 2022',
  },
  quiz: {
    question1: {
      value: {
        topicContent: {
          value: {
            ops: [
              {
                insert: 'sdgds\n',
              },
            ],
          },
          isValid: true,
        },
        radio: {
          value: 'dfg',
          isValid: true,
        },
        answer1: {
          value: 'dfg',
          isValid: true,
        },
        answer2: {
          value: 'dfg',
          isValid: true,
        },
        answer3: {
          value: 'dfg',
          isValid: true,
        },
        answer4: {
          value: 'dg',
          isValid: true,
        },
        solution: {
          value: {},
          isValid: true,
        },
      },
      isValid: true,
    },
    question2: {
      value: {
        topicContent: {
          value: {
            ops: [
              {
                insert: 'dfgdfg\n',
              },
            ],
          },
          isValid: true,
        },
        radio: {
          value: '23',
          isValid: true,
        },
        answer1: {
          value: '23',
          isValid: true,
        },
        answer2: {
          value: '23',
          isValid: true,
        },
        answer3: {
          value: '4',
          isValid: true,
        },
        answer4: {
          value: '4',
          isValid: true,
        },
        solution: {
          value: {},
          isValid: true,
        },
      },
      isValid: true,
    },
  },
};
