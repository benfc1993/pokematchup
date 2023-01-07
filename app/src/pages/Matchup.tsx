import { TeamView } from '../components/TeamView/TeamView';
import { namesIndex } from '../fuse/indexes';
import { Autocomplete } from '../components/Forms/Inputs/Autocomplete';
import { useCallback, useState } from 'react';
import { matchupByName } from '../api/matchup';
import { useTeamStoreContext } from '../stores/TeamStore';
import { TypesList } from '../components/TypesList/TypesList';
import { MatchupResult, PokemonStats } from '../shared/types';
import { MatchupProvider } from '../stores/matchupStore';
import { OpponentSelection } from '../components/Matchup/OpponentSelection';
import { OpponentStats } from '../components/Matchup/OpponentStats';
import { TeamChoices } from '../components/Matchup/TeamChoices';

export const Matchup: React.FC = () => {
  return (
    <MatchupProvider>
      <div className="flex-column w-100">
        <h1>Team Balancer</h1>
        <div className="d-flex align-center">
          <div style={{ width: '50%', margin: '1em' }}>
            <TeamChoices />
          </div>
          <div className="flex-column">
            <div style={{ width: '50%', margin: '1em' }}>
              <OpponentSelection />
            </div>
            <OpponentStats />
          </div>
        </div>
      </div>
    </MatchupProvider>
  );
};
