import React, { useState, useContext } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { Link } from 'react-router-dom';
import Button from '../../Shared/components/FormElements/Button';
import { AuthContext } from '../../Shared/context/AuthContext';

const ParentSubjectsItem = (props) => {
  return (
    <React.Fragment>
      <tr>
        <td>{props.name}</td>
        <td>{props.grade}</td>
        <td>{props.code}</td>
        <td>{props.educator}</td>
        <td>
          <Button
            className="student-access-content-btn"
            inverse
            onClick={props.onViewQuizzes.bind(null, props.subId)}
          >
            View quiz records
          </Button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default ParentSubjectsItem;
