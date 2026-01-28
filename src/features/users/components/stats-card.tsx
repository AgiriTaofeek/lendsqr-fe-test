import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  variant: "pink" | "purple" | "orange" | "red";
  label: string;
  value: string;
}

export function StatsCard({ icon, variant, label, value }: StatsCardProps) {
  return (
    <div className="users-page__stat-card">
      <div
        className={`users-page__stat-card-icon users-page__stat-card-icon--${variant}`}
      >
        {icon}
      </div>
      <div className="users-page__stat-card-label">{label}</div>
      <div className="users-page__stat-card-value">{value}</div>
    </div>
  );
}
