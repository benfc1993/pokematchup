import { useMatchupStore } from '../../stores/matchupStore';
import { TypesList } from '../TypesList/TypesList';

export const OpponentStats = () => {
  const [opponentData] = useMatchupStore((store) => store.opponentData);

  return (
    opponentData && (
      <>
        <h2>{opponentData.monName}</h2>

        <TypesList list={opponentData.types} showAll={false} />
        <h3>Offence</h3>
        <TypesList list={opponentData.offence} showAll={false} />
        <h3>Defence</h3>
        <TypesList list={opponentData.defence} showAll={false} />

        <h3>Weaknesses</h3>
        <TypesList list={opponentData.weakness} showAll={false} />
        <h3>Resistances</h3>
        <TypesList list={opponentData.resistances} showAll={false} />
      </>
    )
  );
};
