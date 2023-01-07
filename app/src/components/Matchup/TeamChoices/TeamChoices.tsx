import { TeamMember } from '../../../shared/types';
import { useMatchupStore } from '../../../stores/matchupStore';
import { useTeamStoreContext } from '../../../stores/TeamStore';
import { EmptyCard } from '../../TeamView/MemberCard/EmptyCard';
import { MemberCard } from '../../TeamView/MemberCard/MemberCard';
import { TypesList } from '../../TypesList/TypesList';
import style from './TeamChoices.module.scss';

export const TeamChoices = () => {
  const [teamChoices] = useMatchupStore((store) => store.teamChoices);
  const { teamData, removeMember } = useTeamStoreContext();
  const teamMembers = Object.values(teamData.team) ?? [];

  return (
    <div className="team-grid">
      {teamData &&
        Array.from({ length: 6 }).map((_v, idx) => {
          const name = teamMembers[idx]?.monName;
          const choiceData = teamChoices && name ? teamChoices[name] : null;
          return teamMembers[idx] ? (
            <div
              key={`${teamMembers[idx]?.monName}-${idx}`}
              className="grid-item"
            >
              <MemberCard
                selected={
                  teamChoices !== null &&
                  (teamMembers[idx]?.monName as string) in teamChoices
                }
                onRemoveClicked={() => removeMember(idx)}
                member={teamMembers[idx] as TeamMember}
              />
              {choiceData && (
                <div className={`flex-column ${style['choice-info']}`}>
                  <p className={`text-left ${style['choice-info__item']}`}>
                    damage multiplier: {choiceData.damageMultiplier}
                  </p>
                  <div
                    className={`d-flex align-center  ${style['choice-info__item']}`}
                  >
                    <p style={{ marginRight: '1em' }}>resistances:</p>
                    <TypesList
                      list={choiceData?.resistances}
                      showAll={false}
                      size={'small'}
                    />
                  </div>
                  <div
                    className={`d-flex align-center  ${style['choice-info__item']}`}
                  >
                    <p style={{ marginRight: '1em' }}>offence:</p>
                    <TypesList
                      list={choiceData?.offence}
                      showAll={false}
                      size={'small'}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div key={`empty-${idx}`} className="grid-item">
              <EmptyCard />
            </div>
          );
        })}
    </div>
  );
};
