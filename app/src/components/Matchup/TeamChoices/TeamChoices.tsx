import {
  MatchupResult,
  MatchupTeamChoices,
  TeamMember
} from '../../../shared/types';
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
          const name = teamMembers[idx]?.monName;
          const choiceData = teamChoices && name ? teamChoices[name] : null;
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
                      (teamMembers[idx]?.monName as string) in teamChoices
                  })}
                  onRemoveClicked={() => removeMember(idx)}
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
      const sort =
        teamChoices &&
        teamChoices[a?.monName as string] &&
        teamChoices[b?.monName as string]
          ? teamChoices[b?.monName as string].score -
            teamChoices[a?.monName as string].score
          : -100;
      return teamChoices &&
        !teamChoices[a?.monName as string] &&
        teamChoices[b?.monName as string]
        ? 1
        : sort;
    }) ?? []
  );
};
