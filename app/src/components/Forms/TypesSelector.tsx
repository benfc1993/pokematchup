import { useState } from 'react';
import { types } from '../../shared/types';
import './formStyles.scss';

interface TypesSelectorsState {
  primaryType: number;
  secondaryType: number;
}

interface TypesSelectorsProps {
  onTypesChanged: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const TypesSelectors: React.FC<TypesSelectorsProps> = (props) => {
  const { onTypesChanged } = props;

  const [formState, setFormState] = useState<TypesSelectorsState>({
    primaryType: -1,
    secondaryType: -1
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: parseInt(value) }));
    onTypesChanged(event);
  };

  return (
    <div className="w-100">
      <label className="form__label">
        <p>Primary Type:</p>
        <select
          className="form__input"
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
      <label className="form__label">
        <p>Secondary Type:</p>
        <select
          className="form__input"
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
