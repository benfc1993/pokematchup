import { TeamMember } from '../../../shared/types';
import './memberCardStyle.scss';
import '../../../styles/utils.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCircleXmark,
  faXmark,
  faCircle,
  faAnglesDown,
  faAnglesUp
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { PokemonStats } from '../../PokemonStats/PokemonStats';

type MemberCardProps = {
  selected?: boolean;
  member: TeamMember;
  onRemoveClicked: () => void;
  canHideTypes?: boolean;
  children?: React.ReactNode;
};

export const MemberCard: React.FC<MemberCardProps> = (props) => {
  const {
    selected,
    member,
    onRemoveClicked,
    canHideTypes = false,
    children = null
  } = props;

  const [hidden, setHidden] = useState<boolean>(canHideTypes);

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
      {children && children}
      <>
        {canHideTypes && hidden ? (
          <div
            style={{ display: hidden ? 'block' : 'none', padding: '1em' }}
            onClick={() => setHidden(false)}
          >
            <FontAwesomeIcon icon={faAnglesDown} color={'#afaba5'} />
          </div>
        ) : (
          <div
            className="member-card__stats"
            style={{ display: hidden ? 'none' : 'block' }}
          >
            <PokemonStats stats={member} showHints={true} iconSize={'small'} />
            {canHideTypes && !hidden && (
              <div
                style={{
                  display: hidden ? 'none' : 'block',
                  paddingTop: '1em'
                }}
                onClick={() => setHidden(true)}
              >
                <FontAwesomeIcon icon={faAnglesUp} color={'#afaba5'} />
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
};
