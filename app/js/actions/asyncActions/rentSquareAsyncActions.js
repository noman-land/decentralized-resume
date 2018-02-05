import SquareUtils from '../../utils/SquaresUtils';

import {
  rentSquareError,
  rentSquareStart,
  rentSquareSuccess,
} from '../rentSquareActions';

import { getSquareInfo } from '../asyncActions/getSquareInfoAsyncActions';

const squareUtils = new SquareUtils();
squareUtils.initWeb3();

export const rentSquare = ({
  x,
  y,
  r,
  g,
  b,
  value,
}) => dispatch => {
  dispatch(rentSquareStart({
    x,
    y,
    r,
    g,
    b,
    value,
  }));
  return squareUtils
    .rentSquare({
      x,
      y,
      r,
      b,
      g,
      value,
    })
    .then(
      transaction => {
        dispatch(rentSquareSuccess({ transaction, x, y }));
        dispatch(getSquareInfo(x, y));
      },
      error => dispatch(rentSquareError({ error, x, y })),
    );
};
