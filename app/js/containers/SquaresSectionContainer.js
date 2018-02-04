import { connect } from 'react-redux';

import SquaresSection from '../components/Home/SquaresSection';

import { getGridSizeX } from '../actions/asyncActions/getGridSizeXAsyncActions';
import { getGridSizeY } from '../actions/asyncActions/getGridSizeYAsyncActions';
import { getSquareInfo } from '../actions/asyncActions/getSquareInfoAsyncActions';

import {
  getGrid,
  getGridSizeX as gridSizeXSelector,
  getGridSizeY as gridSizeYSelector,
} from '../selectors/common';

const mapStateToProps = state => ({
  grid: getGrid(state),
  gridSizeX: gridSizeXSelector(state),
  gridSizeY: gridSizeYSelector(state),
});

const mapDispatchToProps = {
  getGridSizeX,
  getGridSizeY,
  getSquareInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(SquaresSection);
