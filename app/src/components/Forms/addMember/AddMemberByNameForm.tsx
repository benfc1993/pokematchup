import React, { useEffect, useState } from 'react';
import { useTeamStoreContext } from '../../../stores/TeamStore';
import '../formStyles.scss';

interface FormState {
  name: string;
  requestCompleted: boolean;
  error: string | null;
  success: string | null;
}

export const AddMemberByNameForm = () => {
  const { addByName } = useTeamStoreContext();

  const [formState, setFormState] = useState<FormState>({
    name: '',
    requestCompleted: true,
    error: null,
    success: null
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await addByName(formState.name)
      .then(() => {
        setFormState((prevState) => ({
          name: '',
          requestCompleted: true,
          error: null,
          success: `${prevState.name} added to team`
        }));
      })
      .catch((error) => {
        setFormState((prevState) => ({
          name: '',
          requestCompleted: true,
          error: error.status === 404 ? 'Pokemon not Found' : 'Invalid',
          success: null
        }));
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      name: value,
      success: null
    }));
  };

  useEffect(() => {
    if (formState.requestCompleted) {
      setFormState((prevState) => ({
        ...prevState
      }));
    }
  }, [formState.requestCompleted]);

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        {formState.success && <p>{formState.success}</p>}
        {formState.error && <p>{formState.error}</p>}
        <label className="form__label w-100">
          <p>Name:</p>
          <input
            className="form__input"
            type="input"
            onChange={handleChange}
            value={formState.name}
          />
        </label>
        <button
          disabled={!formState.requestCompleted}
          className="form__button"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
