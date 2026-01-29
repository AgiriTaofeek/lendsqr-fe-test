export function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-screen__logo-container">
        {/* Using the Lendsqr logo SVG or image if available, or a placeholder */}
        <img src="/logo.svg" alt="Lendsqr" className="loading-screen__logo" />
        <div className="loading-screen__spinner"></div>
      </div>
    </div>
  );
}
