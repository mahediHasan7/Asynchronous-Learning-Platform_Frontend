// import React, { useEffect, useState } from 'react';
// import ViewContentHeader from './ViewContentHeader';
// import Card from '../../../Shared/components/UIElements/Card';
// import SvgIcon from '../../../Shared/components/UIElements/SvgIcon';

// import topic1_1 from './images/topic1/topic 1_1.png';
// import topic1_2 from './images/topic1/topic 1_2.png';
// import pdfFile from './files/dummy.pdf';

// import './TopicPg.css';
// import { Link } from 'react-router-dom';

// const TopicPg = (props) => {
//   const [showTopic, setShowTopic] = useState(true);

//   const { topicName } = props;

//   const deleteButtonHandler = () => {
//     setShowTopic((prev) => {
//       return !prev;
//     });
//   };

//   useEffect(() => {
//     if (props.topicName) {
//       setShowTopic(true);
//     }
//   }, [topicName]);

//   return (
//     <React.Fragment>
//       <ViewContentHeader
//         onClickComment={props.onClickComment}
//         info={props.info}
//       />

//       {showTopic && (
//         <Card className="topic-page-container">
//           <div className="topic-page-top">
//             <p>{props.topicName}</p>
//             <SvgIcon
//               onClick={deleteButtonHandler}
//               icon="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//               color="#f34343"
//               size="2.6rem"
//               fill="none"
//               strokeWidth={2}
//               className="topic-page-delete-btn"
//             />
//             <div className="topic-page-top-line"></div>
//           </div>
//           <div className="contents">
//             <p>
//               The domain is the set of all the values that go into a function.
//               {<br />}The function must work for all values we give it, so it is
//               up to us to make sure we get the domain correct!
//             </p>
//             <img className="topic-images" src={topic1_1} alt="image 1" />
//             <p>
//               Domain of Composite Function:{<br />} We must get both Domains
//               right (the composed function and the first function used).
//             </p>

//             <p>
//               {<br />}
//               {<br />}
//               When doing, for example, (g ° f) (x) = g(f(x)):{<br />}- Make sure
//               we get the Domain for f(x) right, {<br />}- Then also make sure
//               that g(x) gets the correct Domain
//             </p>
//             <img className="topic-images" src={topic1_2} alt="image 2" />
//           </div>

//           <div className="topic-page-bottom">
//             <div className="topic-page-top-line"></div>
//             <Link to={pdfFile} target="_blank" download>
//               <div className="topic-page-pdf">
//                 <SvgIcon
//                   // onClick={}
//                   icon="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
//                   color="#33a95b"
//                   size="3rem"
//                   fill="#33a95b"
//                   strokeWidth={2}
//                   className="pdf-icon"
//                 />
//                 <p>
//                   {props.topicName.toLowerCase()[0].toUpperCase() +
//                     props.topicName.toLowerCase().substring(1)}
//                   .pdf
//                 </p>
//               </div>
//             </Link>
//           </div>
//         </Card>
//       )}
//     </React.Fragment>
//   );
// };

// export default TopicPg;

import React, { useEffect, useState, useContext, useCallback } from 'react';
import ReactQuill from 'react-quill';
import Alert from '../../../Shared/components/UIElements/Alert';
import Card from '../../../Shared/components/UIElements/Card';
import SvgIcon from '../../../Shared/components/UIElements/SvgIcon';
import { AuthContext } from '../../../Shared/context/AuthContext';
import { useHttpClient } from '../../../Shared/hooks/http-hook';
import './TopicPg.css';

const TopicPg = (props) => {
  const auth = useContext(AuthContext);
  const [showDeleteAlert, setShowDeleteAlert] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState();
  const [topicContent, setTopicContent] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const displayDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const closeDeleteAlert = () => {
    setShowDeleteAlert(false);
  };

  const removeTopicHandler = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/topic/${props.topic.id}`,
        'DELETE'
      );
    } catch (error) {
      console.log(error.message);
    }

    props.onDelete();
    setDeleteConfirmation(true);
    closeDeleteAlert();
  };

  return (
    <React.Fragment>
      <Alert
        header={'Are you sure to delete this topic'}
        alertContent={
          <React.Fragment>
            <p>Topic name: </p> <p>{props.topic.title}</p>
            <p>Last modified: </p>{' '}
            <p>
              {props.topic.updatedAt ? props.topic.updatedAt.split('T')[0] : ''}
            </p>
            <p>This topic's content will be lost permanently.</p>
          </React.Fragment>
        }
        leftButtonText="CANCEL"
        rightButtonText="DELETE"
        showAlert={showDeleteAlert}
        closeAlertHandler={closeDeleteAlert}
        onConfirm={removeTopicHandler}
      />

      <Card className="single-topic-output-card">
        <div className="single-topic-header">
          <p className="single-topic-header-title">Topic </p>
          <p className="single-topic-header-title">{props.topic.title}</p>
          <div onClick={displayDeleteAlert}>
            <SvgIcon
              icon="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              color="#f34343"
              size="2.2rem"
              fill="none"
              strokeWidth={1.8}
              className="educator-topic-list-delete-icon"
            />
          </div>
        </div>

        <p className="topic-output-topic-description">
          {props.topic.description}
        </p>

        <div className="topic-output-top-line"></div>
        <ReactQuill
          theme={'bubble'}
          value={props.topic.content}
          readOnly={true}
          className="react-quill-for-output readonly"
        />

        <div className="topic-page-bottom">
          <div className="topic-output-bottom-line"></div>

          <React.Fragment>
            {props.topic.lectureNote && (
              <a
                href={`http://localhost:5000/${props.topic.lectureNote}`}
                target="_blank"
                download
              >
                <div className="topic-page-pdf">
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 98.63 122.88"
                  >
                    <title>file</title>
                    <path d="M98.63,35.57A3.58,3.58,0,0,0,96,32.12L64.39,1.32A3.53,3.53,0,0,0,61.63,0H6.43A6.42,6.42,0,0,0,0,6.43v110a6.42,6.42,0,0,0,6.43,6.43H92.21a6.42,6.42,0,0,0,6.4-6.43q0-40.45,0-80.88Zm-33.43-23L86.68,32.69H65.2V12.57ZM7.18,115.7V7.15H58V36.26a3.61,3.61,0,0,0,3.61,3.61H91.45q0,37.92,0,75.83Zm13.6-56.62a2.59,2.59,0,0,1,1.91-.88H64.84a2.55,2.55,0,0,1,1.91.87,3.1,3.1,0,0,1,0,4.08,2.55,2.55,0,0,1-1.9.88H22.69a2.57,2.57,0,0,1-1.92-.87,3.1,3.1,0,0,1,0-4.08Zm0,34.7a2.59,2.59,0,0,1,1.91-.88H76.59a2.59,2.59,0,0,1,1.91.88,3.12,3.12,0,0,1,0,4.09,2.6,2.6,0,0,1-1.92.87H22.72a2.6,2.6,0,0,1-1.92-.87,3.12,3.12,0,0,1,0-4.09ZM76.59,75.55a2.59,2.59,0,0,1,1.91.88,3.1,3.1,0,0,1,0,4.08,2.57,2.57,0,0,1-1.92.87H22.72a2.57,2.57,0,0,1-1.92-.87,3.1,3.1,0,0,1,0-4.08,2.59,2.59,0,0,1,1.91-.88ZM20.78,41.72a2.59,2.59,0,0,1,1.91-.88H47.62a2.58,2.58,0,0,1,1.92.87,3.12,3.12,0,0,1,.75,2,3,3,0,0,1-.77,2,2.52,2.52,0,0,1-1.9.88H22.69a2.59,2.59,0,0,1-1.92-.86,3.12,3.12,0,0,1,0-4.09Zm0-17.35a2.59,2.59,0,0,1,1.91-.88H36.41a2.55,2.55,0,0,1,1.91.87,3.1,3.1,0,0,1,0,4.08,2.52,2.52,0,0,1-1.9.88H22.72a2.57,2.57,0,0,1-1.92-.87,3.1,3.1,0,0,1,0-4.08Z" />
                  </svg>

                  <p>{`${props.topic.title}.${
                    `http://localhost:5000/${props.topic.lectureNote}`.split(
                      '.'
                    )[1]
                  }`}</p>
                </div>
              </a>
            )}
          </React.Fragment>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default TopicPg;
