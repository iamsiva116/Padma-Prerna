import { Link } from "react-router-dom";

function AwardeeCard({ awardee }) {
  return (
    <div className="awardee-card">
      <img src={awardee.image} alt={awardee.name} />

      <div className="awardee-info">
        <span className="award-badge">{awardee.award}</span>
        <h3>{awardee.name}</h3>
        <p>{awardee.field}</p>
        <p>{awardee.state}</p>

        <Link to={`/awardees/${awardee.slug}`} className="details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default AwardeeCard;