import { Link } from 'react-router-dom';

import React from 'react';

const DashAccReqItem = (props) => {
  return (
    <React.Fragment>
      <tr>
        <td>
          <Link to={`/requests/${props.id}`}>{props.name} </Link>
        </td>
        <td>
          <Link to={`/requests/${props.id}`}>{props.email} </Link>
        </td>
        <td>
          <Link to={`/requests/${props.id}`}>{props.phone} </Link>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default DashAccReqItem;
