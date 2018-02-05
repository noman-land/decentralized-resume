import { createAction } from 'redux-actions';

import ActionTypes from './ActionTypes';

export const getGridSizeYError = createAction(
  ActionTypes.GET_GRID_SIZE_Y_ERROR,
  error => error,
);

export const getGridSizeYStart = createAction(ActionTypes.GET_GRID_SIZE_Y_START);

export const getGridSizeYSuccess = createAction(
  ActionTypes.GET_GRID_SIZE_Y_SUCCESS,
  ({ gridSizeY }) => ({ gridSizeY }),
);
