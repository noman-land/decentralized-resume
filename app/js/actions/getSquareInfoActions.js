import { createAction } from 'redux-actions';

import ActionTypes from './ActionTypes';

export const getSquareInfoError = createAction(
  ActionTypes.GET_SQUARE_INFO_ERROR,
  error => error,
);

export const getSquareInfoStart = createAction(
  ActionTypes.GET_SQUARE_INFO_START,
  () => null,
  ({ x, y }) => ({ x, y }),
);

export const getSquareInfoSuccess = createAction(
  ActionTypes.GET_SQUARE_INFO_SUCCESS,
  squareInfo => ({ squareInfo }),
  ({ x, y }) => ({ x, y }),
);
