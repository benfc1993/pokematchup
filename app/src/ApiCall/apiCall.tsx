import { useEffect, useState } from 'react';

const types: string[] = [
  'Normal',
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
  'Fairy'
];

interface FormState {
  primaryType: number;
  secondaryType: number;
  response: string | null;
  requestCompleted: boolean;
}

export const ApiCall = () => {
  const [formState, setFormState] = useState<FormState>({
    primaryType: -1,
    secondaryType: -1,
    response: null,
    requestCompleted: false
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await postTypes([
      formState.primaryType,
      formState.secondaryType
    ]);
    setFormState((prevState) => ({
      ...prevState,
      requestCompleted: true,
      response: response
    }));
  };

  const postTypes = async (types: number[]) => {
    const response = await fetch('http://localhost:3000/types', {
      method: 'POST',
      body: JSON.stringify(types.filter((t) => t >= 0)),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: parseInt(value) }));
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
        <label>
          Primary Type:
          <select
            name="primaryType"
            value={formState.primaryType}
            onChange={handleChange}
          >
            <option value="-1">Select a type</option>
            {types.map((type, idx) => (
              <option key={type} value={idx}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Secondary Type:
          <select
            name="secondaryType"
            value={formState.secondaryType}
            onChange={handleChange}
          >
            <option value="-1">Select a type</option>
            {types.map((type, idx) =>
              idx !== formState.primaryType ? (
                <option key={type} value={idx}>
                  {type}
                </option>
              ) : null
            )}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      {formState.requestCompleted ? JSON.stringify(formState.response) : ''}
    </div>
  );
};
