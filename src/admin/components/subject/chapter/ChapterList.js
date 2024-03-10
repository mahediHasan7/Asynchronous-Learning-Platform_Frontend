import './ChapterList.css';
import React from 'react';
import Button from '../../../../Shared/components/FormElements/Button';

import Card from '../../../../Shared/components/UIElements/Card';
import ChapterItem from './ChapterItem';
import SvgIcon from '../../../../Shared/components/UIElements/SvgIcon';
import { Link } from 'react-router-dom';

const ChapterList = (props) => {
  return (
    <Card className="card-chapter-list">
      <div className="chapter-list-header">
        <Link to={`/admin/subjects/`}>
          <div className="topic-output-header-back-btn-container">
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
        </Link>
        <p className="chapter-header-title">Added Chapters</p>
        <Button onClick={props.addChapterHandler}>
          <span style={{ fontSize: '4rem', paddingBottom: '.2rem' }}>
            &#43;{' '}
          </span>
          &nbsp;&nbsp; ADD CHAPTER
        </Button>
      </div>

      <div className="chapter-list-scroll-container">
        <table className="chapter-list-container">
          <thead>
            <tr>
              <th>Chapter name</th>
              <th>Total sections</th>
              <th>Last updated</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.chapterList.map((chapter) => (
              <ChapterItem
                key={chapter.id}
                id={chapter.id}
                chapterName={chapter.name}
                totalSections={chapter.totalSections}
                lastUpdated={chapter.updatedAt.split('T')[0]}
                onDeleteChapter={props.onDeleteChapter}
                onViewChapter={props.onViewChapter}
                onEditChapter={props.onEditChapter}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ChapterList;
