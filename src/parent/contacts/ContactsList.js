import './ContactsList.css';
import React from 'react';
import ContactsItem from './ContactsItem';
import Card from '../../Shared/components/UIElements/Card';

const ContactsList = (props) => {
  return (
    <Card className="parent-st-learning-progress-card">
      <div className="parent-st-learning-progress-header">
        <p className="parent-st-learning-progress-header-title">
          Contact information of educators
        </p>
      </div>

      <div className="parent-st-learning-progress-scroll-container">
        <table className="parent-st-learning-progress-list-container">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Educator Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {props.contacts.map((contact) => (
              <ContactsItem
                key={contact.educator.id}
                id={contact.educator.id}
                name={contact.educator.name}
                email={contact.educator.email}
                phone={contact.educator.phone}
                image={contact.educator.image}
                subject={contact.subject}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ContactsList;
