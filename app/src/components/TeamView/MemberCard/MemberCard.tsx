import { TeamMember } from '../../../shared/types';
import './memberCardStyle.scss';
import '../../../styles/utils.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCircleXmark,
  faXmark,
  faMinus,
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import { TypesList } from '../../TypesList/TypesList';

type MemberCardProps = {
  selected?: boolean;
  member: TeamMember;
  onRemoveClicked: () => void;
};

const statOrder: Omit<keyof TeamMember, 'monName'>[] = [
  'Types',
  'Weakness',
  'Defence',
  'Resistances'
];

const hints: Partial<Record<keyof TeamMember, string>> = {
  defence: 'You take 1/2 damage',
  offence: 'You deal 2x damage',
  weakness: 'You take 2X damage',
  resistances: 'You take 0 damage'
};

export const MemberCard: React.FC<MemberCardProps> = (props) => {
  const { selected, member, onRemoveClicked } = props;
  return (
    <div className="member-card">
      <div className="member-card__title">
        {selected !== undefined && (
          <div className="member-card__selected">
            <span className="fa-layers fa-fw fa-lg">
              <FontAwesomeIcon icon={faCircle} color={'#3c3c3c'} size={'lg'} />
              <FontAwesomeIcon
                icon={selected ? faCheckCircle : faCircleXmark}
                color={selected ? '#69db69' : '#db2222'}
                size={'xl'}
              />
            </span>
          </div>
        )}
        <div className="member-card__close" onClick={() => onRemoveClicked()}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <h3>{member.monName}</h3>
      </div>
      {/* <div className="member-card__icons">
        {member.types.map((type) => (
          <TypeIcon key={type} type={type} size={'small'} />
        ))}
      </div> */}

      <div className="member-card__stats" style={{}}>
        {statOrder.map((stat, idx) => {
          const statData = member[stat.toLowerCase() as keyof TeamMember];
          return (
            statData instanceof Array && (
              <div className="member-card__stat">
                {idx > 0 && <FontAwesomeIcon icon={faMinus} />}
                <div style={{ marginBottom: '0.5em' }}>
                  <p>{stat}</p>
                  {stat.toLowerCase() in hints && (
                    <p style={{ fontSize: '0.7em' }}>
                      {hints[stat.toLowerCase() as keyof TeamMember]}
                    </p>
                  )}
                </div>
                <TypesList
                  list={statData}
                  showAll={false}
                  size={stat === 'types' ? 'small' : 'xsmall'}
                />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};
