import React, { useEffect, useState } from 'react';
import { useTeamStoreContext } from '../stores/TeamStore';
import './styles.css';

interface FormState {
  name: string;
  requestCompleted: boolean;
  error: string | null;
}

export const AddMemberByNameForm = () => {
  const { addByName } = useTeamStoreContext();

  const [formState, setFormState] = useState<FormState>({
    name: '',
    requestCompleted: true,
    error: null
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState((prevState) => ({
      ...prevState,
      requestCompleted: false,
      error: null
    }));

    await addByName(formState.name)
      .then(() => {
        setFormState((prevState) => ({
          ...prevState,
          requestCompleted: true,
          error: null
        }));
      })
      .catch((error) => {
        setFormState((prevState) => ({
          ...prevState,
          requestCompleted: true,
          error: error.status === 404 ? 'Pokemon not Found' : 'Invalid'
        }));
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      name: value
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
        {formState.error && <p>{formState.error}</p>}
        <label className="form__label w-100">
          <p>Name:</p>
          <input className="form__input" type="input" onChange={handleChange} />
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
