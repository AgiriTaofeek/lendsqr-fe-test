import { getRouteApi } from "@tanstack/react-router";
import { UserDetailsHeader } from "./user-details-header";
import { UserProfileCard } from "./user-profile-card";
import { UserInfoSection } from "./user-info-section";
import type { User } from "../data";

const routeApi = getRouteApi("/_protected/users/$id");

export function UserDetails() {
  const user = routeApi.useLoaderData() as User;

  return (
    <div className="user-details">
      <UserDetailsHeader />

      {/* Profile Card */}
      <UserProfileCard
        fullName={user.username}
        userId={user.id}
        amount={user.amount}
        bank={user.bank}
        tier={user.tier}
      />

      {/* Details Content */}
      <div className="user-details__content-card">
        {/* Personal Information */}
        <UserInfoSection
          title="Personal Information"
          items={[
            { label: "Full Name", value: user.username },
            { label: "Phone Number", value: user.phoneNumber },
            { label: "Email Address", value: user.email },
            { label: "BVN", value: user.bvn },
            { label: "Gender", value: user.gender },
            { label: "Marital Status", value: user.maritalStatus },
            { label: "Children", value: user.children },
            { label: "Type of Residence", value: user.residence },
          ]}
        />

        {/* Education and Employment */}
        <UserInfoSection
          title="Education and Employment"
          items={[
            { label: "Level of Education", value: user.education.level },
            { label: "Employment Status", value: user.education.status },
            { label: "Sector of Employment", value: user.education.sector },
            { label: "Duration of Employment", value: user.education.duration },
            { label: "Office Email", value: user.education.officeEmail },
            { label: "Monthly Income", value: user.education.income },
            { label: "Loan Repayment", value: user.education.repayment },
          ]}
        />

        {/* Socials */}
        <UserInfoSection
          title="Socials"
          items={[
            { label: "Twitter", value: user.socials.twitter },
            { label: "Facebook", value: user.socials.facebook },
            { label: "Instagram", value: user.socials.instagram },
          ]}
        />

        {/* Guarantor */}
        <UserInfoSection
          title="Guarantor"
          items={[
            { label: "Full Name", value: user.guarantor.name },
            { label: "Phone Number", value: user.guarantor.phone },
            { label: "Email Address", value: user.guarantor.email },
            { label: "Relationship", value: user.guarantor.relationship },
          ]}
        />
      </div>
    </div>
  );
}
