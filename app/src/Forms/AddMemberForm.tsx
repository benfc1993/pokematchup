import { useEffect, useState } from 'react';
import { TeamData } from '../types';
import { TypesSelectors } from './TypesSelector';

interface FormState {
  primaryType: number;
  secondaryType: number;
  requestCompleted: boolean;
  response: TeamData | null;
}

export const AddMemberForm = () => {
  const [formState, setFormState] = useState<FormState>({
    primaryType: -1,
    secondaryType: -1,
    requestCompleted: false,
    response: null
  });

  const postTypes = async (types: number[]) => {
    const response = await fetch('/team/add', {
      method: 'POST',
      body: JSON.stringify({
        team: { types: [], names: [] },
        types: types.filter((t) => t >= 0),
        name: 'Testing'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await postTypes([
      formState.primaryType,
      formState.secondaryType
    ]);

    localStorage.setItem('team', JSON.stringify(response));

    setFormState((prevState) => ({
      ...prevState,
      requestCompleted: true,
      response: response
    }));
  };

  const handleChange = (name: string, type: number) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: type
    }));
  };

  useEffect(() => {
    if (formState.requestCompleted) {
      setFormState((prevState) => ({
        ...prevState,
        response: prevState.response
      }));
    }
  }, [formState.requestCompleted]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TypesSelectors onTypesChanged={handleChange} />
        <button type="submit">Submit</button>
      </form>
      {formState.requestCompleted ? JSON.stringify(formState.response) : ''}
    </div>
  );
};
