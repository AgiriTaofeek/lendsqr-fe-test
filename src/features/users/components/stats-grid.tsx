import { FiUsers, FiFileText, FiDatabase } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { StatsCard } from "./stats-card";

interface StatsGridProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    usersWithLoans: number;
    usersWithSavings: number;
  };
}

export function StatsGrid({ stats }: StatsGridProps) {
  if (!stats) return null;

  return (
    <div className="users-page__stats">
      <StatsCard
        icon={<FiUsers />}
        variant="pink"
        label="Users"
        value={stats.totalUsers.toLocaleString()}
      />
      <StatsCard
        icon={<FaUsers />}
        variant="purple"
        label="Active Users"
        value={stats.activeUsers.toLocaleString()}
      />
      <StatsCard
        icon={<FiFileText />}
        variant="orange"
        label="Users with Loans"
        value={stats.usersWithLoans.toLocaleString()}
      />
      <StatsCard
        icon={<FiDatabase />}
        variant="red"
        label="Users with Savings"
        value={stats.usersWithSavings.toLocaleString()}
      />
    </div>
  );
}
