import { FiUser } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface UserProfileCardProps {
  fullName: string;
  userId: string;
  amount: string;
  bank: string;
  tier?: number;
}

export function UserProfileCard({
  fullName,
  userId,
  amount,
  bank,
  tier = 1,
}: UserProfileCardProps) {
  return (
    <div className="user-details__profile-card">
      <div className="user-details__profile-info">
        <div className="user-details__avatar-wrapper">
          <FiUser />
        </div>

        <div className="user-details__name-section">
          <div className="user-details__fullname">{fullName}</div>
          <div className="user-details__id">{userId}</div>
        </div>

        <div className="user-details__tier-section">
          <span className="user-details__tier-label">User's Tier</span>
          <div className="user-details__stars">
            {[1, 2, 3].map((star) =>
              star <= tier ? (
                <AiFillStar key={star} size={16} color="#E9B200" />
              ) : (
                <AiOutlineStar key={star} size={16} color="#E9B200" />
              ),
            )}
          </div>
        </div>

        <div className="user-details__bank-section">
          <div className="user-details__amount">{amount}</div>
          <div className="user-details__bank-details">{bank}</div>
        </div>
      </div>

      <div className="user-details__tabs">
        <button className="user-details__tab user-details__tab--active">
          General Details
        </button>
        <button className="user-details__tab">Documents</button>
        <button className="user-details__tab">Bank Details</button>
        <button className="user-details__tab">Loans</button>
        <button className="user-details__tab">Savings</button>
        <button className="user-details__tab">App and System</button>
      </div>
    </div>
  );
}
