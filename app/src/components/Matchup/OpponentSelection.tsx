import { faMinus, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { matchupByName, matchupByTypes } from '../../api/matchup';
import { namesIndex } from '../../fuse/indexes';
import { useMatchupStore } from '../../stores/matchupStore';
import { useTeamStoreContext } from '../../stores/TeamStore';
import { Autocomplete } from '../Forms/Inputs/Autocomplete';
import { TypesSelectors, TypesSelectorsState } from '../Forms/TypesSelector';
import './OpponentSelectionForm.scss';

type OpponentSelectionFormState = {
  loading: boolean;
  showForm: boolean;
  error: string | null;
};

export const OpponentSelection = () => {
  const { teamData } = useTeamStoreContext();
  const [opponentName, setStore] = useMatchupStore(
    (store) => store.opponentData?.monName
  );

  const [formState, setFormState] = useState<OpponentSelectionFormState>({
    loading: false,
    showForm: true,
    error: null
  });

  const setPartialFormState = (state: Partial<OpponentSelectionFormState>) => {
    setFormState((prevState) => ({
      ...prevState,
      ...state
    }));
  };

  const [opponentTypes, setOpponentTypes] = useState<TypesSelectorsState>({
    primaryType: '',
    secondaryType: ''
  });

  useEffect(() => {
    const getMatchup = async (name: string) => {
      try {
        const response = await matchupByName(teamData, name);
        setStore(response);
        setPartialFormState({ showForm: false });
      } catch (err) {
        setPartialFormState({
          loading: false,
          showForm: true,
          error: 'There was a problem'
        });
      }
    };
    if (opponentName) getMatchup(opponentName);
  }, [teamData, opponentName, setStore]);

  const onChooseOpponent = useCallback(
    async (name: string) => {
      setPartialFormState({ loading: true });
      try {
        const response = await matchupByName(teamData, name);

        setStore(response);
        setPartialFormState({ showForm: false });
      } catch (err) {
        setPartialFormState({
          loading: false,
          showForm: true,
          error: 'Pokemon not found'
        });
      }
    },
    [teamData, setStore]
  );

  const getOpponentByTypes = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setPartialFormState({ loading: true });
      try {
        const types = Object.values(opponentTypes).filter(
          (type) => type !== ''
        );
        const response = await matchupByTypes(teamData, types);
        setStore(response);
        setPartialFormState({ showForm: false });
      } catch (err) {
        setPartialFormState({
          loading: false,
          showForm: true,
          error: 'There was a problem'
        });
      }
    },
    [teamData, opponentTypes, setStore]
  );

  return (
    <>
      <div className={`opponent-form ${formState.showForm ? 'show' : ''}`}>
        {formState.loading ? (
          <div className="d-flex justify-center align-center w-100 h-100">
            <FontAwesomeIcon
              icon={faCircleNotch}
              color={'white'}
              size={'4x'}
              spin
            />
          </div>
        ) : (
          <>
            <label>
              <h2>Opponent</h2>
              {formState.error && (
                <p
                  className="error"
                  style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}
                >
                  {formState.error}
                </p>
              )}
              <Autocomplete fuse={namesIndex} setSelection={onChooseOpponent} />
            </label>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '8px'
              }}
            >
              <FontAwesomeIcon
                icon={faMinus}
                color={'#afaba5'}
                style={{ marginTop: '2px' }}
              />
              <p style={{ fontSize: '1.4rem', margin: '0 8px' }}>or</p>
              <FontAwesomeIcon
                icon={faMinus}
                color={'#afaba5'}
                style={{ marginTop: '2px' }}
              />
            </div>
            <form onSubmit={getOpponentByTypes}>
              <TypesSelectors
                onTypesChanged={setOpponentTypes}
                initialValue={opponentTypes}
              />
              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </>
        )}
        ;
      </div>
      <div
        style={{
          display: formState.showForm ? 'none' : 'block',
          margin: '1em 0'
        }}
      >
        <button
          className="button"
          onClick={() =>
            setPartialFormState({ showForm: true, loading: false })
          }
        >
          Search
        </button>
      </div>
    </>
  );
};
