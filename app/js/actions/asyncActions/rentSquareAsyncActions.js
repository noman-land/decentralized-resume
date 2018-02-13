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
  emoji,
  r,
  g,
  b,
  value,
}) => dispatch => {
  dispatch(rentSquareStart({
    x,
    y,
    emoji,
    r,
    g,
    b,
    value,
  }));
  return squareUtils
    .rentSquare({
      x,
      y,
      emoji,
      r,
      b,
      g,
      value,
    })
    .then(
      transaction => {
        dispatch(rentSquareSuccess({
          x,
          y,
          emoji,
          r,
          g,
          b,
          value,
          transaction,
        }));
      },
      error => dispatch(rentSquareError({ error, x, y })),
    );
};
