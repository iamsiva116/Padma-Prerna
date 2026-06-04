import awardees from "../data/awardees.json";
import AwardeeCard from "../components/AwardeeCard";

function Awardees() {
  return (
    <section>
      <div className="page-header">
        <h1>Padma Awardees 2026</h1>
        <p>Total Awardees: {awardees.length}</p>
      </div>

      <div className="awardee-grid">
        {awardees.map((awardee) => (
          <AwardeeCard key={awardee.id} awardee={awardee} />
        ))}
      </div>
    </section>
  );
}

export default Awardees;
