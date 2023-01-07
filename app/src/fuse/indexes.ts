import Fuse from 'fuse.js';
import { names } from '../components/Forms/addMember/names';

export const namesIndex = new Fuse(names, {
  shouldSort: true,
  threshold: 0.25,
  minMatchCharLength: 3
});
