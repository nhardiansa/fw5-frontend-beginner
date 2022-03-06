import { queryFormat } from './stringFormat';

export const imagePlaceholder = (name) => `https://via.placeholder.com/500x335?text=${queryFormat(name)}`;
