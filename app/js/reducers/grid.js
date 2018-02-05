import { Map } from 'immutable';

import ActionTypes from '../actions/ActionTypes';

export default function grid(state = Map(), action) {
  switch (action.type) {
    case ActionTypes.GET_SQUARE_INFO_SUCCESS: {
      const { meta: { x, y }, payload: { squareInfo } } = action;
      return state.setIn([x, y], Map(squareInfo));
    }
    case ActionTypes.SET_GRID: {
      return action.payload.grid;
    }
    default:
      return state;
  }
}
