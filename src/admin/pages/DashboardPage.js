import React, { useEffect, useState } from 'react';
import Card from '../../Shared/components/UIElements/Card';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import DashAccReq from '../components/dashboard/DashAccReq';
import DashSummary from '../components/dashboard/DashSummary';
import NewestContent from '../components/dashboard/NewestContent';
import './DashboardPage.css';
const newContentsArr = [
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
  {
    id: Math.random(),
    topic: 'Quadratic Equations and Inequalities',
    subject: 'Additional Mathematics',
    grade: 'Form 4',
    createdAt: 'Oct 06, 2021',
    educator: 'Kathleen Arroyo',
  },
];

const DashboardPage = (props) => {
  const [dashSummaryContents, setDashSummaryContents] = useState({
    subjects: '',
    educators: '',
    students: '',
  });
  const [educatorAccReqs, setEducatorAccReqs] = useState([]);
  const [studentAccReqs, setStudentAccReqs] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/student-requests`
      );
      setStudentAccReqs(responseData.stuAccReq);
      setDashSummaryContents((prevSate) => {
        return {
          subjects: prevSate.subjects,
          educators: prevSate.educators,
          students: responseData.stuAccReq.length,
        };
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/educator-requests`
      );

      setEducatorAccReqs(responseData.eduAccReq);
      setDashSummaryContents((prevSate) => {
        return {
          subjects: prevSate.subjects,
          educators: responseData.eduAccReq.length,
          students: prevSate.students,
        };
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/subjects`
      );

      setDashSummaryContents((prevSate) => {
        return {
          subjects: responseData.subjects.length,
          educators: prevSate.educators,
          students: prevSate.students,
        };
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="dash-container">
        <div className="dash-summary">
          <DashSummary dashSummary={dashSummaryContents} />
        </div>
        <div className="dash-student-req">
          <DashAccReq loadedUsers={studentAccReqs} userRole={'Students'} />
        </div>
        <div className="dash-educator-req">
          <DashAccReq loadedUsers={educatorAccReqs} userRole={'Educators'} />
        </div>

        <div className="dash-newest-content">
          <NewestContent newContentsArr={newContentsArr} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardPage;
