import './SectionList.css';
import React from 'react';
import Button from '../../../../Shared/components/FormElements/Button';
import Card from '../../../../Shared/components/UIElements/Card';
import SectionItem from './SectionItem';
import { Link } from 'react-router-dom';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';

const SectionList = (props) => {
  props.sectionList.find((section) => {
    console.log(section);
  });
  return (
    <Card className="card-section-list">
      <div className="section-list-header">
        <div
          className="topic-output-header-back-btn-container"
          onClick={props.onBack}
        >
          <SvgIcon
            icon="M15 19l-7-7 7-7"
            color="#333333"
            size="3rem"
            fill="none"
            strokeWidth={1.8}
            className="topic-output-header-back-icon"
          />
          <p>Back</p>
        </div>

        <p className="section-header-title">Added Sections</p>
        <Button onClick={props.addSectionHandler}>
          <span style={{ fontSize: '4rem', paddingBottom: '.2rem' }}>
            &#43;{' '}
          </span>
          &nbsp;&nbsp; ADD SECTION
        </Button>
      </div>

      <div className="section-list-scroll-container">
        <table className="section-list-container">
          <thead>
            <tr>
              <th>Section name</th>
              <th>Last updated</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.sectionList.map((section) => (
              <SectionItem
                key={section.id}
                id={section.id}
                sectionName={section.name}
                totalSections={section.totalSections}
                lastUpdated={section.updatedAt.split('T')[0]}
                onDeleteSection={props.onDeleteSection}
                onEditSection={props.onEditSection}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default SectionList;
