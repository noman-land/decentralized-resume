import SquareUtils from '../../utils/SquaresUtils';

import {
  getSquareInfoError,
  getSquareInfoStart,
  getSquareInfoSuccess,
} from '../getSquareInfoActions';

const squareUtils = new SquareUtils();

export const getSquareInfo = (x, y) => dispatch => {
  dispatch(getSquareInfoStart({ x, y }));
  return squareUtils
    .getSquareInfo(x, y)
    .then(
      squareInfo => {
        dispatch(getSquareInfoSuccess(squareInfo));
      },
      error => dispatch(getSquareInfoError(error)),
    );
};
