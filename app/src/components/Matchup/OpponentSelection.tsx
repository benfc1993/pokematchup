import { useCallback, useEffect } from 'react';
import { matchupByName } from '../../api/matchup';
import { namesIndex } from '../../fuse/indexes';
import { useMatchupStore } from '../../stores/matchupStore';
import { useTeamStoreContext } from '../../stores/TeamStore';
import { Autocomplete } from '../Forms/Inputs/Autocomplete';

export const OpponentSelection = () => {
  const { teamData } = useTeamStoreContext();
  const [opponentName, setStore] = useMatchupStore(
    (store) => store.opponentData?.monName
  );

  useEffect(() => {
    const getMatchup = async (name: string) => {
      const response = await matchupByName(teamData, name);
      setStore(response);
    };
    if (opponentName) getMatchup(opponentName);
  }, [teamData, opponentName, setStore]);

  const onChooseOpponent = useCallback(
    async (name: string) => {
      const response = await matchupByName(teamData, name);

      setStore(response);
    },
    [teamData, setStore]
  );

  return <Autocomplete fuse={namesIndex} setSelection={onChooseOpponent} />;
};
