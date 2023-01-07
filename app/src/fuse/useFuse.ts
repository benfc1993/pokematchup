import Fuse from 'fuse.js';

export const useFuse = <T>(list: T[], options: Fuse.IFuseOptions<T>) => {
  const fuse = new Fuse(list, options);
  const search = (string: string) => {
    return fuse.search(string);
  };

  return {
    search
  };
};
