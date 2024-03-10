import React, { useCallback, useContext, useEffect, useState } from 'react';
import Avatar from '../../Shared/components/UIElements/Avatar';

const ContactsItem = (props) => {
  return (
    <React.Fragment>
      <tr>
        <td>{props.subject}</td>
        <td style={{ width: '10rem' }}>
          <Avatar
            image={
              props.image
                ? `http://localhost:5000/${props.image}`
                : 'https://www.clipartmax.com/png/full/144-1442578_flat-person-icon-download-dummy-man.png'
            }
            alt={`${props.name} image`}
            width={40}
            className="comment-avatar"
          />
        </td>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.phone}</td>
      </tr>
    </React.Fragment>
  );
};

export default ContactsItem;
