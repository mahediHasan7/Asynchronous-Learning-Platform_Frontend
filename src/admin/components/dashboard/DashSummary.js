import Card from '../../../Shared/components/UIElements/Card';
import SvgIcon from '../../../Shared/components/UIElements/SvgIcon';
import './DashSummary.css';

const DashSummary = (props) => {
  return (
    <Card>
      <div className="dash-summary-container">
        <div className="dash-summary-div">
          <SvgIcon
            icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            color="#33A95B"
            fill="none"
            size="2.4rem"
            strokeWidth={2}
            className="dash-summary-icon"
          />
          <p>{props.dashSummary.subjects} subjects</p>
        </div>
        <div className="dash-summary-div">
          <SvgIcon
            icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            color="#33A95B"
            size="2.4rem"
            fill="none"
            strokeWidth={2}
            className="dash-summary-icon"
          />
          <p>{props.dashSummary.educators} educators</p>
        </div>
        <div className="dash-summary-div">
          <SvgIcon
            icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            color="#33A95B"
            size="2.4rem"
            fill="none"
            strokeWidth={2}
            className="dash-summary-icon"
          />
          <p>{props.dashSummary.students} students</p>
        </div>
      </div>
    </Card>
  );
};

export default DashSummary;
