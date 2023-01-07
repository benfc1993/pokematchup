import { useMatchupStore } from '../../stores/matchupStore';
import { TypesList } from '../TypesList/TypesList';

export const OpponentStats = () => {
  const [opponentData] = useMatchupStore((store) => store.opponentData);

  return (
    opponentData && (
      <>
        <h3>{opponentData.monName}</h3>

        <TypesList list={opponentData.types} showAll={false} />
        <h2>Offence</h2>
        <TypesList list={opponentData.offence} showAll={false} />
        <h2>Defence</h2>
        <TypesList list={opponentData.defence} showAll={false} />

        <h2>Weaknesses</h2>
        <TypesList list={opponentData.weakness} showAll={false} />
        <h2>Resistances</h2>
        <TypesList list={opponentData.resistances} showAll={false} />
      </>
    )
  );
};
