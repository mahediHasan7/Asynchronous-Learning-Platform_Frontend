import { Link } from 'react-router-dom';

import React from 'react';

const NewestContentItem = (props) => {
  return (
    <React.Fragment>
      <tr>
        <td>
          <Link to={`/${props.grade}/${props.subject}/${props.id}`}>
            {props.topic}
          </Link>
        </td>
        <td>
          <Link to={`/${props.grade}/${props.subject}/${props.id}`}>
            {props.subject}
          </Link>
        </td>
        <td>
          <Link to={`/${props.grade}/${props.subject}/${props.id}`}>
            {props.grade}
          </Link>
        </td>
        <td>
          <Link to={`/${props.grade}/${props.subject}/${props.id}`}>
            {props.createdAt}
          </Link>
        </td>
        <td>
          <Link to={`/${props.grade}/${props.subject}/${props.id}`}>
            {props.educator}
          </Link>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default NewestContentItem;
