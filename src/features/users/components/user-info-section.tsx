import { InfoGroup } from "./user-info-group";

interface UserInfoSectionProps {
  title: string;
  items: { label: string; value: string }[];
}

export function UserInfoSection({ title, items }: UserInfoSectionProps) {
  return (
    <div className="user-details__section">
      <h3 className="user-details__section-title">{title}</h3>
      <div className="user-details__grid">
        {items.map((item, index) => (
          <InfoGroup key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}
