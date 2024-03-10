import React, { useEffect, useState, useContext, useCallback } from 'react';
import Avatar from '../../Shared/components/UIElements/Avatar';
import Card from '../../Shared/components/UIElements/Card';
import { AuthContext } from '../../Shared/context/AuthContext';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import ContactsList from './ContactsList';

const ContactsPg = (props) => {
  const auth = useContext(AuthContext);
  const [contacts, setContacts] = useState();
  const [status, setStatus] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getStatus = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/parent/acc-status/${auth.loggedInUser_asynchronous.id}`
      );
      console.log(responseData);
      setStatus(responseData.status);
    } catch (error) {
      setStatus('pending');
    }
  });

  const getContacts = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/parent//get-contacts/${auth.loggedInUser_asynchronous.studentId}`
      );
      console.log(responseData);
      setContacts(responseData.contacts);
    } catch (error) {
      setContacts([]);
    }
  });

  useEffect(() => {
    getStatus();
    getContacts();
  }, []);

  return (
    <React.Fragment>
      {status && status !== 'approved' && (
        <div
          className={`acc-req-status-container ${
            status === 'approved'
              ? 'acc-req-approved'
              : status === 'declined'
              ? 'acc-req-declined'
              : 'acc-req-pending'
          }`}
        >
          <p>Account request {status}</p>
        </div>
      )}
      {contacts && status && status === 'approved' && (
        <ContactsList contacts={contacts} />
      )}
    </React.Fragment>
  );
};

export default ContactsPg;
