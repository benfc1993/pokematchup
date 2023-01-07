import { MatchupTeamChoices, TeamMember } from '../shared/types';
import { createContextStore } from './contextStore';

export type MatchupStoreData = {
  opponentData: TeamMember | null;
  teamChoices: MatchupTeamChoices | null;
};

export const { Provider: MatchupProvider, useStore: useMatchupStore } =
  createContextStore<MatchupStoreData>({
    opponentData: null,
    teamChoices: null
  });
