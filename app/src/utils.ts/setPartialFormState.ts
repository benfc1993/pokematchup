export const setPartialState = <T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  state: Partial<T>
) => {
  setState((prevState) => ({
    ...prevState,
    ...state
  }));
};
