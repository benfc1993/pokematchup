import { useState } from 'react';
import { types } from '../../shared/types';
import './formStyles.scss';

export type TypesSelectorsState = {
  primaryType: string;
  secondaryType: string;
};

interface TypesSelectorsProps {
  onTypesChanged: (types: TypesSelectorsState) => void;
  initialValue?: TypesSelectorsState;
}

export const TypesSelectors: React.FC<TypesSelectorsProps> = (props) => {
  const { onTypesChanged, initialValue } = props;

  const [formState, setFormState] = useState<TypesSelectorsState>(
    initialValue || {
      primaryType: '',
      secondaryType: ''
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    onTypesChanged({ ...formState, [name]: value });
    setFormState((prevState) => ({ ...prevState, [name]: value }));
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
          {types.map((type) => (
            <option key={type} value={type}>
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
          <option value="-1">None</option>
          {types.map((type) =>
            type !== formState.primaryType ? (
              <option key={type} value={type}>
                {type}
              </option>
            ) : null
          )}
        </select>
      </label>
    </div>
  );
};
