import SquareUtils from '../../utils/SquaresUtils';

import {
  getGridSizeXError,
  getGridSizeXStart,
  getGridSizeXSuccess,
} from '../getGridSizeXActions';

const squareUtils = new SquareUtils();

export const getGridSizeX = () => dispatch => {
  dispatch(getGridSizeXStart());
  return squareUtils
    .getGridSizeX()
    .then(
      gridSizeX => dispatch(getGridSizeXSuccess({ gridSizeX })),
      error => dispatch(getGridSizeXError({ error })),
    );
};
