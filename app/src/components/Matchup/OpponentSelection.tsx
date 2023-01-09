import React, { useCallback } from 'react';
import { matchupByName, matchupByTypes } from '../../api/matchup';
import { useMatchupStore } from '../../stores/matchupStore';
import { useTeamStoreContext } from '../../stores/TeamStore';
import { PokemonForm } from '../Forms/PokemonForm/PokemonForm';
import { TypesSelectorsState } from '../Forms/TypesSelector';
import './OpponentSelectionForm.scss';

interface OpponentSelectionProps {
  onSelectionChanged?: () => void;
}

export const OpponentSelection: React.FC<OpponentSelectionProps> = (props) => {
  const { onSelectionChanged } = props;
  const { teamData } = useTeamStoreContext();
  const [, setStore] = useMatchupStore((store) => store.opponentData?.monName);

  const onChooseOpponent = useCallback(
    async (name: string) => {
      console.log('onChooseOpponent');

      const response = await matchupByName(teamData, name);

      setStore(response);
      onSelectionChanged?.();
    },
    [teamData, setStore, onSelectionChanged]
  );

  const getOpponentByTypes = useCallback(
    async (opponentTypes: TypesSelectorsState) => {
      const types = Object.values(opponentTypes).filter((type) => type !== '');
      const response = await matchupByTypes(teamData, types);
      setStore(response);
      onSelectionChanged?.();
    },
    [teamData, setStore, onSelectionChanged]
  );

  return (
    <div className="align-center w-100 h-100" style={{ padding: '1em' }}>
      <PokemonForm
        submitName={onChooseOpponent}
        submitTypes={getOpponentByTypes}
      />
    </div>
  );
};
