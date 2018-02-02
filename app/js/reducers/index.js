import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import accountLoading from './accountLoading';

export default combineReducers({
  accountLoading,
  router: routerReducer,
});
