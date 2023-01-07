import {
  Children,
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore
} from 'react';

export interface IContextStore<Store> {
  get: () => Store;
  set: (value: Partial<Store>) => void;
  subscribe: (callback: () => void) => () => void;
}

export const createContextStore = <Store,>(initialState: Store) => {
  const useContextStoreData = (): IContextStore<Store> => {
    const store = useRef(initialState);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((subscriber) => subscriber());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe
    };
  };

  type UseContextStoreDataReturnType = ReturnType<typeof useContextStoreData>;

  const StoreContext = createContext<UseContextStoreDataReturnType | null>(
    null
  );

  const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
      <StoreContext.Provider value={useContextStoreData()}>
        {children}
      </StoreContext.Provider>
    );
  };

  const useStore = <SelectorOutput,>(
    selector: (store: Store) => SelectorOutput
  ): [SelectorOutput, (value: Partial<Store>) => void] => {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('store not found');
    }

    const state = useSyncExternalStore(store.subscribe, () =>
      selector(store.get())
    );
    return [state, store.set];
  };

  return { Provider, useStore };
};
