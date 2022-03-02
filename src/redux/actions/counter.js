import { INCREASE, DECREASE } from '../types/counter';

export const increase = () => {
  return {
    type: INCREASE
  };
};

export const decrease = () => {
  return {
    type: DECREASE
  };
};
