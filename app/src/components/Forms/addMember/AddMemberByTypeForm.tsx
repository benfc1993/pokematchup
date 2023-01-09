import React, { useState } from 'react';
import { TypesSelectors, TypesSelectorsState } from '../TypesSelector';
import { useTeamStoreContext } from '../../../stores/TeamStore';
import '../formStyles.scss';

interface FormState extends TypesSelectorsState {
  name: string;
  requestCompleted: boolean;
}

export const AddMemberByTypeForm = () => {
  const { addByType } = useTeamStoreContext();
  const [formState, setFormState] = useState<FormState>({
    primaryType: '',
    secondaryType: '',
    name: '',
    requestCompleted: false
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addByType(formState);

    setFormState((prevState) => ({
      ...prevState,
      requestCompleted: true
    }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTypesChange = (types: TypesSelectorsState) => {
    setFormState((prevState) => ({
      ...prevState,
      ...types
    }));
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label w-100">
          <p>Name:</p>
          <input
            className="form__input"
            type="input"
            name="name"
            onChange={handleNameChange}
          />
        </label>

        <TypesSelectors onTypesChanged={handleTypesChange} />
        <button className="form__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
