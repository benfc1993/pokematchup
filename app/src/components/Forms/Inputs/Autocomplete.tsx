import Fuse from 'fuse.js';
import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import '../formStyles.scss';
import styles from './Autocomplete.module.scss';

type AutocompleteProps<T> = {
  fuse: Fuse<T>;
  setSelection: (value: T) => void;
};

type InputState<T> = {
  focused: boolean;
  hovered: boolean;
  value: string;
  activeIndex: number;
  results: Fuse.FuseResult<T>[];
  clicked: boolean;
};

export const Autocomplete = <T,>(props: AutocompleteProps<T>) => {
  const { fuse, setSelection } = props;

  const [inputState, setInputState] = useState<InputState<T>>({
    focused: false,
    hovered: false,
    activeIndex: 0,
    value: '',
    results: [],
    clicked: false
  });

  const resetState = () => {
    setInputState({
      focused: false,
      hovered: false,
      results: [],
      value: '',
      activeIndex: 0,
      clicked: false
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState((prevState) => ({ ...prevState, value: event.target.value }));
    setInputState((prevState) => ({
      ...prevState,
      results: fuse.search(event.target.value),
      focused: true
    }));
  };

  const handleSelection = useCallback(() => {
    setSelection(inputState.results[inputState.activeIndex].item);
    resetState();
  }, [inputState, setSelection]);

  const handleClick = (index: number) => {
    console.log('handleClick', index);
    setInputState((prevState) => ({
      ...prevState,
      activeIndex: index,
      clicked: true
    }));
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!inputState.focused) return;
      switch (e.code) {
        case 'Escape':
          resetState();
          break;
        case 'Enter':
          handleSelection();
          break;
        case 'ArrowUp':
          if (inputState.activeIndex <= 0) {
            setInputState((prevState) => ({ ...prevState, activeIndex: 0 }));
            return;
          }
          setInputState((prevState) => ({
            ...prevState,
            activeIndex: prevState.activeIndex - 1
          }));

          break;
        case 'ArrowDown':
          if (inputState.activeIndex >= inputState.results.length - 1) {
            setInputState((prevState) => ({
              ...prevState,
              activeIndex: Math.max(0, inputState.results.length - 1)
            }));
            return;
          }

          setInputState((prevState) => ({
            ...prevState,
            activeIndex: prevState.activeIndex + 1
          }));
          break;
        default:
          break;
      }
    },
    [inputState, handleSelection]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    if (inputState.clicked) {
      console.log('clicked');
      setInputState((prevState) => ({ ...prevState, clicked: false }));
      handleSelection();
    }
  }, [inputState]);

  return (
    <div
      onMouseEnter={() => {
        setInputState((prevState) => ({
          ...prevState,
          focused: true,
          hovered: true
        }));
      }}
      onMouseLeave={() =>
        setInputState((prevState) => ({ ...prevState, hovered: false }))
      }
      onBlur={() => {
        if (inputState.hovered) return;
        setInputState((prevState) => ({
          ...prevState,
          focused: false,
          value: '',
          results: []
        }));
        window.removeEventListener('keydown', onKeyDown);
      }}
      className={styles.autocomplete}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSelection();
        }}
      >
        <input
          className={`form__input ${styles.input}`}
          value={inputState.value}
          onChange={handleChange}
          placeholder={'start typing to seach...'}
        />
      </form>
      {inputState.results && (
        <ul className={styles.suggestions}>
          {inputState.results.map((result, idx) => (
            <li
              key={idx}
              className={`${styles.suggestion} ${
                idx === inputState.activeIndex ? styles.active : ''
              }`}
              onClick={() => handleClick(idx)}
              onMouseEnter={() =>
                setInputState((prevState) => ({
                  ...prevState,
                  activeIndex: idx
                }))
              }
            >
              {result.item as string}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
