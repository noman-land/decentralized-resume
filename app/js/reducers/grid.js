import { List, Map, fromJS } from 'immutable';

import ActionTypes from '../actions/ActionTypes';

export default function grid(state = Map(), action) {
  switch (action.type) {
    case ActionTypes.GET_SQUARE_INFO_SUCCESS: {
      const { meta: { x, y }, payload: { squareInfo } } = action;
      return state.setIn([x, y], fromJS(squareInfo));
    }
    case ActionTypes.SET_GRID: {
      return action.payload.grid;
    }
    case ActionTypes.RENT_SQUARE_SUCCESS: {
      const {
        meta: {
          x,
          y,
        },
        payload: {
          emoji,
          r,
          g,
          b,
          value,
          transaction: {
            logs: [{ address }],
            receipt: { blockNumber },
          },
        },
      } = action;
      return state.updateIn([x, y], square => square
        .set('emoji', List(emoji))
        .set('r', r)
        .set('g', g)
        .set('b', b)
        .set('lastPricePaid', value)
        .set('currentOwner', address)
        .set('placedAtBlock', blockNumber)
        .update('timesRented', timesRented => timesRented + 1));
    }
    default:
      return state;
  }
}
