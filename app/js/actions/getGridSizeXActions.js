import { createAction } from 'redux-actions';

import ActionTypes from './ActionTypes';

export const getGridSizeXError = createAction(
  ActionTypes.GET_GRID_SIZE_X_ERROR,
  error => error,
);

export const getGridSizeXStart = createAction(ActionTypes.GET_GRID_SIZE_X_START);

export const getGridSizeXSuccess = createAction(
  ActionTypes.GET_GRID_SIZE_X_SUCCESS,
  ({ gridSizeX }) => ({ gridSizeX }),
);
