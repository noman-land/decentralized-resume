import { createAction } from 'redux-actions';

import ActionTypes from './ActionTypes';

export const setGrid = createAction(
  ActionTypes.SET_GRID,
  grid => ({ grid }),
);
