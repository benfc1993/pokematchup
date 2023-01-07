import { TeamMember } from '../../../shared/types';
import './memberCardStyle.scss';
import '../../../styles/utils.scss';
import { TypeIcon } from '../../TypeIcon/TypeIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';

type MemberCardProps = {
  selected?: boolean;
  member: TeamMember;
  onRemoveClicked: () => void;
};

export const MemberCard: React.FC<MemberCardProps> = (props) => {
  const { selected, member, onRemoveClicked } = props;
  return (
    <div className="member-card">
      {selected !== undefined && (
        <div className="member-card__selected">
          <FontAwesomeIcon
            icon={selected ? faCheckCircle : faCircleXmark}
            color={selected ? 'green' : 'red'}
            size={'xl'}
          />
        </div>
      )}
      <div className="member-card__close" onClick={() => onRemoveClicked()}>
        X
      </div>
      <h3>{member.monName}</h3>
      <div className="member-card__icons">
        {member.types.map((type) => (
          <TypeIcon key={type} type={type} size={'large'} />
        ))}
      </div>
    </div>
  );
};
