import ActionTypes from '../actions/ActionTypes';

export default function gridSizeX(state = 0, action) {
  switch (action.type) {
    case ActionTypes.GET_GRID_SIZE_X_SUCCESS: {
      return action.payload.gridSizeX;
    }
    default:
      return state;
  }
}
