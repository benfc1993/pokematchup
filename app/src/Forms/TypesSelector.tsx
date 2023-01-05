import { useState } from 'react';
import { types } from '../types';

interface TypesSelectorsState {
  primaryType: number;
  secondaryType: number;
}

interface TypesSelectorsProps {
  onTypesChanged: (name: string, type: number) => void;
}

export const TypesSelectors: React.FC<TypesSelectorsProps> = (props) => {
  const { onTypesChanged } = props;

  const [formState, setFormState] = useState<TypesSelectorsState>({
    primaryType: -1,
    secondaryType: -1
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    onTypesChanged(name, parseInt(value));
    setFormState((prevState) => ({ ...prevState, [name]: parseInt(value) }));
  };

  return (
    <div>
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
    </div>
  );
};
