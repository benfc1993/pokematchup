import { useState } from 'react';
import { TypesSelectors } from './TypesSelector';
import './styles.css';
import { useTeamStoreContext } from '../stores/TeamStore';

interface FormState {
  primaryType: string;
  secondaryType: string;
  name: string;
  requestCompleted: boolean;
}

export const AddMemberByTypeForm = () => {
  const { addByType } = useTeamStoreContext();
  const [formState, setFormState] = useState<FormState>({
    primaryType: '-1',
    secondaryType: '-1',
    name: '',
    requestCompleted: false
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addByType(
      [parseInt(formState.primaryType), parseInt(formState.secondaryType)],
      formState.name
    );

    setFormState((prevState) => ({
      ...prevState,
      requestCompleted: true
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label w-100">
          <p>Name:</p>
          <input className="form__input" type="input" name="name" onChange={handleChange} />
        </label>

        <TypesSelectors onTypesChanged={handleChange} />
        <button className="form__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
