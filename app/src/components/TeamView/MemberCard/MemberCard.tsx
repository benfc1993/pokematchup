import { TeamMember } from '../../../shared/types';
import './memberCardStyle.scss';
import '../../../styles/utils.scss';

type MemberCardProps = { member: TeamMember; onRemoveClicked: () => void };

export const MemberCard: React.FC<MemberCardProps> = (props) => {
  const { member, onRemoveClicked } = props;
  return (
    <div className="member-card">
      <div className="member-card__close" onClick={() => onRemoveClicked()}>
        X
      </div>
      <h3>{member.monName}</h3>
      <div className="d-flex align-center">
        {member.types.map((type) => (
          <img
            key={type}
            src={`/assets/type-icons/${type}.png`}
            className={`member-card__type-icon ${
              member.types.length > 1 ? 'mr-auto' : 'm-auto'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
