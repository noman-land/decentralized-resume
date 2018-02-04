import ActionTypes from '../actions/ActionTypes';

export default function gridSizeY(state = 0, action) {
  switch (action.type) {
    case ActionTypes.GET_GRID_SIZE_Y_SUCCESS: {
      return action.payload.gridSizeY;
    }
    default:
      return state;
  }
}
