import './App.css';
import { TeamStoreProvider, useTeamStoreContext } from './stores/TeamStore';
import { AddMemberByTypeForm } from './Forms/AddMemberByTypeForm';
import { TeamView } from './Team/TeamView';
import { AddMemberByNameForm } from './Forms/AddMemberByNameForm';

function App() {
  return (
    <TeamStoreProvider>
      <div className="App">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <AddMemberByNameForm />
          <div style={{ margin: '10px 0' }}></div>
          <AddMemberByTypeForm />
          <ClearButton />
        </div>
        <TeamView />
      </div>
    </TeamStoreProvider>
  );
}

export default App;

const ClearButton = () => {
  const { setData } = useTeamStoreContext();

  return (
    <button
      className="form__button"
      onClick={() =>
        setData({ types: [], team: {}, defences: [], offences: [] })
      }
    >
      Clear
    </button>
  );
};
