import { FiUsers, FiFileText, FiDatabase } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { StatsCard } from "./stats-card";

export function StatsGrid() {
  return (
    <div className="users-page__stats">
      <StatsCard
        icon={<FiUsers />}
        variant="pink"
        label="Users"
        value="2,453"
      />
      <StatsCard
        icon={<FaUsers />}
        variant="purple"
        label="Active Users"
        value="2,453"
      />
      <StatsCard
        icon={<FiFileText />}
        variant="orange"
        label="Users with Loans"
        value="12,453"
      />
      <StatsCard
        icon={<FiDatabase />}
        variant="red"
        label="Users with Savings"
        value="102,453"
      />
    </div>
  );
}
