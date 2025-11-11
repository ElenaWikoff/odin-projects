import { getDay } from "../../utils/functions";
import { ReactSVG } from "react-svg";
import "./styles.css";

function getImageUrl(icon) {
  return new URL(`../../assets/icons/conditions/${icon}.svg`, import.meta.url)
    .href;
}

const DayCard = ({ data }) => {
  const { datetime, tzoffset, conditions, icon, temp, precip } = data;

  return (
    <div className="card day-card">
      {/* Header - Day */}
      <div className="header">
        <h2>{getDay(datetime, tzoffset)}</h2>
      </div>

      <div className="main-content">
        {/* Left - Conditions and Icon */}
        <div className="card-left">
          <div className="conditions">{conditions.split(",")[0]}</div>
          <ReactSVG src={getImageUrl(icon)} className="icon-wrapper" />
        </div>
        {/* Right - Weather Data */}
        <div className="card-right">
          <div className="temperature">{Number(temp).toFixed(1)} °F</div>
          <div className="precipitation">
            Rain: {Number(precip.toFixed(2) * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
