import SquareUtils from '../../utils/SquaresUtils';

import {
  getGridSizeYError,
  getGridSizeYStart,
  getGridSizeYSuccess,
} from '../getGridSizeYActions';

const squareUtils = new SquareUtils();
squareUtils.initWeb3();

export const getGridSizeY = () => dispatch => {
  dispatch(getGridSizeYStart());
  return squareUtils
    .getGridSizeY()
    .then(
      gridSizeY => dispatch(getGridSizeYSuccess({ gridSizeY })),
      error => dispatch(getGridSizeYError({ error })),
    );
};
