export function Dashboard() {
  return (
    <div className="users-page">
      <h1 className="users-page__title">Dashboard</h1>

      <div className="dashboard__welcome-card">
        <img
          src="/icon-dashboard-placeholder.svg"
          alt="Dashboard Placeholder"
          className="dashboard__image"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <h2 className="dashboard__welcome-title">Welcome to Lendsqr</h2>
        <p className="dashboard__welcome-text">
          Select "Users" from the sidebar to manage your customer base.
        </p>
      </div>
    </div>
  );
}
