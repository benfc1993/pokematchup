import { TeamMember } from '../../../shared/types';
import './memberCardStyle.scss';
import '../../../styles/utils.scss';
import { TypeIcon } from '../../TypeIcon/TypeIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCircleXmark,
  faXmark
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
            color={selected ? '#69db69' : '#db2222'}
            size={'xl'}
          />
        </div>
      )}
      <div className="member-card__close" onClick={() => onRemoveClicked()}>
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <h3>{member.monName}</h3>
      <div className="member-card__icons">
        {member.types.map((type) => (
          <TypeIcon key={type} type={type} size={'medium'} />
        ))}
      </div>
    </div>
  );
};
