import { createAction } from 'redux-actions';

import ActionTypes from './ActionTypes';

export const rentSquareError = createAction(
  ActionTypes.RENT_SQUARE_ERROR,
  ({ error }) => error,
  ({ x, y }) => ({ x, y }),
);

export const rentSquareStart = createAction(
  ActionTypes.RENT_SQUARE_START,
  ({ x, y, ...rest }) => ({ ...rest }),
  ({ x, y }) => ({ x, y }),
);

export const rentSquareSuccess = createAction(
  ActionTypes.RENT_SQUARE_SUCCESS,
  ({ x, y, ...rest }) => ({ ...rest }),
  ({ x, y }) => ({ x, y }),
);
