import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import grid from './grid';
import gridSizeX from './gridSizeX';
import gridSizeY from './gridSizeY';

export default combineReducers({
  grid,
  gridSizeX,
  gridSizeY,
  router: routerReducer,
});
