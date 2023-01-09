import React, { useState } from 'react';
import { namesIndex } from '../../../fuse/indexes';
import { useTeamStoreContext } from '../../../stores/TeamStore';
import { Autocomplete } from '../Inputs/Autocomplete';
import '../formStyles.scss';

interface FormState {
  name: string;
  requestCompleted: boolean;
  error: string | null;
  success: string | null;
}

export const AddMemberByNameForm: React.FC = () => {
  const { addByName } = useTeamStoreContext();

  const [formState, setFormState] = useState<FormState>({
    name: '',
    requestCompleted: true,
    error: null,
    success: null
  });

  const handleSubmit = async (name: string) => {
    const state: FormState = {
      name: '',
      requestCompleted: true,
      error: null,
      success: null
    };

    await addByName(name)
      .then(() => {
        state.success = `${name} added to team`;
      })
      .catch((error) => {
        state.error =
          error.status === 404 ? `Pokemon not Found ${name}` : 'Invalid';
      });

    setFormState(state);
  };

  return (
    <div>
      {formState.success && <p className="success">{formState.success}</p>}
      {formState.error && <p className="error">{formState.error}</p>}
      <label className="form__label w-100">
        <p>Name:</p>
        <Autocomplete fuse={namesIndex} setSelection={handleSubmit} />
      </label>
    </div>
  );
};
