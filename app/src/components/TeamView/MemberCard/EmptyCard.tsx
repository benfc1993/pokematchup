import './memberCardStyle.scss';
import '../../../styles/utils.scss';
import { PokemonForm } from '../../Forms/PokemonForm/PokemonForm';
import { useTeamStoreContext } from '../../../stores/TeamStore';

export const EmptyCard: React.FC = () => {
  const { addByName, addByType } = useTeamStoreContext();

  return (
    <div className="member-card member-card__empty">
      <PokemonForm submitName={addByName} submitTypes={addByType} />
    </div>
  );
};
