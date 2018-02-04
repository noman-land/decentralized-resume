import { Map } from 'immutable';

import ActionTypes from '../actions/ActionTypes';

export default function grid(state = Map(), action) {
  switch (action.type) {
    case ActionTypes.GET_SQUARE_INFO_SUCCESS: {
      const { squareInfo } = action.payload;
      const { x, y } = squareInfo;
      return state.setIn([x, y], Map(squareInfo));
    }
    default:
      return state;
  }
}
