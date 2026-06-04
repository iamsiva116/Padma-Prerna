import { useParams, Link } from "react-router-dom";
import awardees from "../data/awardees.json";

function AwardeeDetails() {
  const { slug } = useParams();

  const awardee = awardees.find((item) => item.slug === slug);

  if (!awardee) {
    return (
      <section className="details-page">
        <h1>Awardee Not Found</h1>
        <Link to="/awardees" className="details-btn">
          Back to Awardees
        </Link>
      </section>
    );
  }

  return (
    <section className="details-page">
      <Link to="/awardees" className="back-link">
        ← Back to Awardees
      </Link>

      <div className="details-card">
        <div className="details-image">
          <img src={awardee.image} alt={awardee.name} />
        </div>

        <div className="details-content">
          <span className="award-badge">{awardee.award}</span>

          <h1>{awardee.name}</h1>

          <div className="details-grid">
            <p>
              <strong>Year:</strong> {awardee.year}
            </p>
            <p>
              <strong>Field:</strong> {awardee.field}
            </p>
            <p>
              <strong>State/Country:</strong> {awardee.state}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {awardee.posthumous ? "Posthumous" : "Living/Not specified"}
            </p>
            <p>
              <strong>Duo Award:</strong> {awardee.duo ? "Yes" : "No"}
            </p>
          </div>

          <div className="contribution-box">
            <h3>Contribution</h3>
            <p>{awardee.contribution}</p>
          </div>

          <a
            href={awardee.source}
            target="_blank"
            rel="noreferrer"
            className="source-link"
          >
            View Official Source
          </a>
        </div>
      </div>
    </section>
  );
}

export default AwardeeDetails;
