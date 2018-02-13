import { fromJS } from 'immutable';

export const DEFAULT_GAS = 2000000;

export const DEFAULT_SQUARE_INFO = fromJS({
  emoji: [0, 0, 0, 0, 0, 0, 0, 0],
  r: 255,
  g: 255,
  b: 255,
  currentOwner: '0x0000000000000000000000000000000000000000',
  placedAtBlock: 0,
  lastPricePaid: 0,
  timesRented: 0,
});

export const Routes = {
  SEARCH: 'search',
};
