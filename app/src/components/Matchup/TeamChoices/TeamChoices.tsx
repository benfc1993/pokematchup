import { MatchupTeamChoices, TeamMember } from '../../../shared/types';
import { useMatchupStore } from '../../../stores/matchupStore';
import { useTeamStoreContext } from '../../../stores/TeamStore';
import { EmptyCard } from '../../TeamView/MemberCard/EmptyCard';
import { MemberCard } from '../../TeamView/MemberCard/MemberCard';
import { TypesList } from '../../TypesList/TypesList';
import style from './TeamChoices.module.scss';

export const TeamChoices = () => {
  const [teamChoices] = useMatchupStore((store) => store.teamChoices);
  const { teamData, removeMember } = useTeamStoreContext();
  const teamMembers = sortTeamMembers(teamData.team, teamChoices);

  return (
    <div className="team-grid">
      {teamData &&
        Array.from({ length: 6 }).map((_v, idx) => {
          const id = teamMembers[idx]?.id;
          const choiceData = teamChoices && id ? teamChoices[id] : null;
          return teamMembers[idx] ? (
            <div
              key={`${teamMembers[idx]?.monName}-${idx}`}
              className="grid-item"
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <MemberCard
                  {...(teamChoices !== null && {
                    selected:
                      teamChoices !== null &&
                      (teamMembers[idx]?.id as string) in teamChoices
                  })}
                  onRemoveClicked={() =>
                    removeMember(teamMembers[idx]?.id as string)
                  }
                  member={teamMembers[idx] as TeamMember}
                  canHideTypes={teamChoices !== null}
                >
                  {choiceData && (
                    <div className={`flex-column ${style['choice-info']}`}>
                      <p className={`text-left ${style['choice-info__item']}`}>
                        Damage multiplier:{' '}
                        {choiceData.damageMultiplier > 0 &&
                        choiceData.damageMultiplier < 1
                          ? `1/${1 / choiceData.damageMultiplier}`
                          : choiceData.damageMultiplier}
                      </p>
                      <div
                        className={`d-flex align-center  ${style['choice-info__item']}`}
                      >
                        <p style={{ marginRight: '1em' }}>Resistances:</p>
                        <TypesList
                          list={choiceData?.resistances}
                          showAll={false}
                          size={'small'}
                        />
                      </div>
                      <div
                        className={`d-flex align-center  ${style['choice-info__item']}`}
                      >
                        <p style={{ marginRight: '1em' }}>Offence:</p>
                        <TypesList
                          list={choiceData?.offence}
                          showAll={false}
                          size={'small'}
                        />
                      </div>
                    </div>
                  )}
                </MemberCard>
              </div>
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

const sortTeamMembers = (
  team: Partial<Record<string, TeamMember>>,
  teamChoices: MatchupTeamChoices | null
) => {
  return (
    Object.values(team).sort((a, b) => {
      if (!teamChoices) return 0;
      const aM = teamChoices[a?.id as string];
      const bM = teamChoices[b?.id as string];
      const sort = aM && bM ? bM.score - aM.score : -100;
      return teamChoices && !aM && bM ? 1 : sort;
    }) ?? []
  );
};
