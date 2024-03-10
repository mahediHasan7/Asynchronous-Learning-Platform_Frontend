import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import SvgIcon from '../../../Shared/components/UIElements/SvgIcon';

const AccReqItem = (props) => {
  const acceptFromItem = () => {
    props.acceptHandler(props.id, props.role);
  };

  const declineFromItem = () => {
    props.declineHandler(props.id, props.role);
  };

  return (
    <React.Fragment>
      <tr>
        <td>{props.role}</td>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.phone}</td>
        <td>
          <p
            className={
              props.approval === 'approved'
                ? 'status-approved'
                : props.approval === 'declined'
                ? 'status-declined'
                : ''
            }
          >
            {props.approval}
          </p>
        </td>

        <td onClick={acceptFromItem}>
          <SvgIcon
            icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            color="#33A95B"
            size="2.1rem"
            fill="none"
            strokeWidth={2}
            className="accept-icon"
          />
        </td>
        <td onClick={declineFromItem}>
          <SvgIcon
            icon="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            color="#f34343"
            size="2.1rem"
            fill="none"
            strokeWidth={2}
            className="decline-icon"
          />
          <div id="mask"></div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default AccReqItem;
