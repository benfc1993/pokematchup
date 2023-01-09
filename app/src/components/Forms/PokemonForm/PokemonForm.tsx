import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { namesIndex } from '../../../fuse/indexes';
import { setPartialState } from '../../../utils.ts/setPartialFormState';
import { Autocomplete } from '../Inputs/Autocomplete';
import { TypesSelectors, TypesSelectorsState } from '../TypesSelector';
import style from './PokemonForm.module.scss';

interface PokemonFormProps {
  submitName: (name: string) => Promise<void>;
  submitTypes: (types: TypesSelectorsState) => Promise<void>;
}

type PokemonFormState = {
  form: 'name' | 'types';
  types: TypesSelectorsState;
  loading: boolean;
  error: string | null;
};

const resetState = (): PokemonFormState => ({
  form: 'name',
  types: {
    primaryType: '',
    secondaryType: ''
  },
  loading: false,
  error: null
});

export const PokemonForm: React.FC<PokemonFormProps> = (props) => {
  const { submitName, submitTypes } = props;
  const [formState, setFormState] = useState<PokemonFormState>(resetState());

  const handleSelectName = async (name: string) => {
    try {
      setPartialState(setFormState, { loading: true });
      await submitName(name);
    } catch (err) {
      setPartialState(setFormState, { error: 'Pokemon not found' });
    } finally {
      setPartialState(setFormState, { loading: false });
    }
  };

  const handleSelectTypes = async () => {
    try {
      setPartialState(setFormState, { loading: true });
      await submitTypes(formState.types);
    } catch (err) {
      setPartialState(setFormState, { error: 'Pokemon not found' });
    } finally {
      setPartialState(setFormState, { loading: false });
    }
  };

  return formState.loading ? (
    <div className="d-flex justify-center align-center w-100 h-100">
      <FontAwesomeIcon icon={faCircleNotch} color={'white'} size={'4x'} spin />
    </div>
  ) : (
    <>
      <div
        className="d-flex justify-center align-center"
        style={{ marginBottom: '1em' }}
      >
        <p
          className={`${style.button} ${
            formState.form === 'name' ? style.active : ''
          }`}
          onClick={() => setPartialState(setFormState, { form: 'name' })}
        >
          Name
        </p>
        <p
          className={`${style.button} ${
            formState.form === 'types' ? style.active : ''
          }`}
          onClick={() => setPartialState(setFormState, { form: 'types' })}
        >
          Types
        </p>
      </div>
      {formState.error && (
        <p
          className="error"
          style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}
        >
          {formState.error}
        </p>
      )}
      <div
        style={{
          display: formState.form === 'name' ? 'block' : 'none',
          width: '100%'
        }}
      >
        <Autocomplete fuse={namesIndex} setSelection={handleSelectName} />
      </div>
      <div
        style={{
          display: formState.form === 'types' ? 'block' : 'none',
          width: '100%'
        }}
      >
        <TypesSelectors
          onTypesChanged={(types: TypesSelectorsState) =>
            setPartialState(setFormState, { types })
          }
        />
        <button className="button" onClick={() => handleSelectTypes()}>
          Confirm
        </button>
      </div>
    </>
  );
};
