interface IUseSubScriber {
  subscribe: (subscriber: () => void) => () => void;
  raise: () => void;
}

export const useSubscriber = (): IUseSubScriber => {
  const subs = new Set<() => void>();

  const subscribe = (sub: () => void) => {
    subs.add(sub);
    return () => subs.delete(sub);
  };

  const raise = () => {
    subs.forEach((sub) => sub());
  };
  return { subscribe, raise };
};
