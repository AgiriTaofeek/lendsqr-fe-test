import type { NavSection, Organization } from "@/types/types";
import {
  FaHome,
  FaUserFriends,
  FaUsers,
  FaRegHandshake,
  FaPiggyBank,
  FaHandHoldingUsd,
  FaUserCheck,
  FaUserTimes,
  FaBriefcase,
  FaBuilding,
  FaCoins,
  FaMobileAlt,
  FaScroll,
  FaChartBar,
  FaSlidersH,
  FaPercentage,
  FaClipboardList,
  FaTired,
} from "react-icons/fa";
// import type { NavSection, Organization } from "./types";

// Navigation structure
export const NAV_ITEMS: NavSection[] = [
  {
    section: "",
    items: [{ name: "Dashboard", icon: <FaHome />, path: "/" }],
  },
  {
    section: "CUSTOMERS",
    items: [
      { name: "Users", icon: <FaUserFriends />, path: "/users" },
      { name: "Guarantors", icon: <FaUsers />, path: "/guarantors" },
      { name: "Loans", icon: <FaHandHoldingUsd />, path: "/loans" },
      {
        name: "Decision Models",
        icon: <FaRegHandshake />,
        path: "/decision-models",
      },
      { name: "Savings", icon: <FaPiggyBank />, path: "/savings" },
      {
        name: "Loan Requests",
        icon: <FaHandHoldingUsd />,
        path: "/loan-requests",
      },
      { name: "Whitelist", icon: <FaUserCheck />, path: "/whitelist" },
      { name: "Karma", icon: <FaUserTimes />, path: "/karma" },
    ],
  },
  {
    section: "BUSINESSES",
    items: [
      { name: "Organization", icon: <FaBriefcase />, path: "/organization" },
      {
        name: "Loan Products",
        icon: <FaHandHoldingUsd />,
        path: "/loan-products",
      },
      {
        name: "Savings Products",
        icon: <FaBuilding />,
        path: "/savings-products",
      },
      { name: "Fees and Charges", icon: <FaCoins />, path: "/fees-charges" },
      { name: "Transactions", icon: <FaMobileAlt />, path: "/transactions" },
      { name: "Services", icon: <FaScroll />, path: "/services" },
      {
        name: "Service Account",
        icon: <FaUserCheck />,
        path: "/service-account",
      },
      { name: "Settlements", icon: <FaScroll />, path: "/settlements" },
      { name: "Reports", icon: <FaChartBar />, path: "/reports" },
    ],
  },
  {
    section: "SETTINGS",
    items: [
      { name: "Preferences", icon: <FaSlidersH />, path: "/preferences" },
      {
        name: "Fees and Pricing",
        icon: <FaPercentage />,
        path: "/fees-pricing",
      },
      { name: "Audit Logs", icon: <FaClipboardList />, path: "/audit-logs" },
      {
        name: "Systems Messages",
        icon: <FaTired />,
        path: "/systems-messages",
      },
    ],
  },
];

// Mock organizations - in production, this would come from API
export const ORGANIZATIONS: Organization[] = [
  { id: "lendsqr", name: "Lendsqr" },
  { id: "irorun", name: "Irorun" },
  { id: "lendstar", name: "Lendstar" },
];

// App version
export const APP_VERSION = "1.2.0";
