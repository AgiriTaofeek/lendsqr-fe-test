export function InfoGroup({ label, value }: { label: string; value: string }) {
  return (
    <div className="user-details__info-group">
      <span className="user-details__info-label">{label}</span>
      <span className="user-details__info-value">{value}</span>
    </div>
  );
}
