import awardees from "../data/awardees.json";

function countBy(key) {
  return awardees.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
}

function sortData(obj) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}

function Dashboard() {
  const total = awardees.length;

  const awardCounts = countBy("award");
  const fieldCounts = sortData(countBy("field"));
  const stateCounts = sortData(countBy("state"));

  const posthumousCount = awardees.filter((item) => item.posthumous).length;
  const duoCount = awardees.filter((item) => item.duo).length;

  const internationalCount = awardees.filter((item) =>
    ["United States of America", "Germany", "Russia", "Georgia"].includes(
      item.state,
    ),
  ).length;

  const indianCount = total - internationalCount;

  const topFields = fieldCounts.slice(0, 5);
  const topStates = stateCounts.slice(0, 5);

  return (
    <section>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Complete statistics of Padma Awardees 2026</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{total}</h2>
          <p>Total Awardees</p>
        </div>
        <div className="stat-card">
          <h2>{awardCounts["Padma Vibhushan"]}</h2>
          <p>Padma Vibhushan</p>
        </div>
        <div className="stat-card">
          <h2>{awardCounts["Padma Bhushan"]}</h2>
          <p>Padma Bhushan</p>
        </div>
        <div className="stat-card">
          <h2>{awardCounts["Padma Shri"]}</h2>
          <p>Padma Shri</p>
        </div>
        <div className="stat-card">
          <h2>{posthumousCount}</h2>
          <p>Posthumous Awards</p>
        </div>
        <div className="stat-card">
          <h2>{duoCount}</h2>
          <p>Duo Awards</p>
        </div>
        <div className="stat-card">
          <h2>{indianCount}</h2>
          <p>Indian Awardees</p>
        </div>
        <div className="stat-card">
          <h2>{internationalCount}</h2>
          <p>International Awardees</p>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="chart-card">
          <h2>Award Category Distribution</h2>
          {Object.entries(awardCounts).map(([award, count]) => (
            <Bar key={award} label={award} count={count} total={total} />
          ))}
        </div>

        <div className="chart-card">
          <h2>Top 5 Fields</h2>
          {topFields.map(([field, count]) => (
            <Bar key={field} label={field} count={count} total={total} />
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <div className="chart-card">
          <h2>Top 5 States / Countries</h2>
          {topStates.map(([state, count]) => (
            <Bar key={state} label={state} count={count} total={total} />
          ))}
        </div>

        <div className="chart-card">
          <h2>Posthumous vs Non-Posthumous</h2>
          <Bar label="Posthumous" count={posthumousCount} total={total} />
          <Bar
            label="Non-Posthumous"
            count={total - posthumousCount}
            total={total}
          />
        </div>
      </div>

      <div className="chart-card full-width">
        <h2>Complete Field-wise Count</h2>
        {fieldCounts.map(([field, count]) => (
          <Bar key={field} label={field} count={count} total={total} />
        ))}
      </div>

      <div className="chart-card full-width">
        <h2>Complete State/Country-wise Count</h2>
        {stateCounts.map(([state, count]) => (
          <Bar key={state} label={state} count={count} total={total} />
        ))}
      </div>
    </section>
  );
}

function Bar({ label, count, total }) {
  const percentage = ((count / total) * 100).toFixed(1);

  return (
    <div className="bar-row">
      <div className="bar-label">
        <span>{label}</span>
        <strong>
          {count} ({percentage}%)
        </strong>
      </div>

      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

export default Dashboard;
