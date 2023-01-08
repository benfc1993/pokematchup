import { useMatchupStore } from '../../stores/matchupStore';
import { PokemonStats } from '../PokemonStats/PokemonStats';

export const OpponentStats = () => {
  const [opponentData] = useMatchupStore((store) => store.opponentData);

  return (
    opponentData && (
      <div style={{ padding: '0 1em' }}>
        {opponentData.monName && <h2>{opponentData.monName}</h2>}
        <PokemonStats stats={opponentData} iconSize={'small'} />
      </div>
    )
  );
};
