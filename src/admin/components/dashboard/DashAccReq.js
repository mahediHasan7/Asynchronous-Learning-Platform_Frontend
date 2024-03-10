import React, { useEffect, useState } from 'react';
import DashAccReqList from './DashAccReqList';

const DashAccReq = (props) => {
  const [accRequests, setAccRequests] = useState([]);
  const [userId, setUserId] = useState();

  // console.log(props.loadedUsers);

  useEffect(() => {
    const slicedLoadedUsers = props.loadedUsers.slice(0, 5);
    setAccRequests(slicedLoadedUsers);
  }, [props.loadedUsers]);

  return (
    <React.Fragment>
      <DashAccReqList accRequests={accRequests} userRole={props.userRole} />
    </React.Fragment>
  );
};

export default DashAccReq;
