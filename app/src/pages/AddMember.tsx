import { AddMemberByNameForm } from '../components/Forms/addMember/AddMemberByNameForm';
import { AddMemberByTypeForm } from '../components/Forms/addMember/AddMemberByTypeForm';
import { useTeamStoreContext } from '../stores/TeamStore';

export const AddMember: React.FC = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <AddMemberByNameForm />
        <div style={{ margin: '10px 0' }}></div>
        <AddMemberByTypeForm />
        <ClearButton />
      </div>
    </>
  );
};

const ClearButton = () => {
  const { setData } = useTeamStoreContext();

  return (
    <button
      className="form__button"
      onClick={() =>
        setData({
          types: [],
          team: {},
          defences: [],
          offences: [],
          weaknesses: []
        })
      }
    >
      Clear
    </button>
  );
};
