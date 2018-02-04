import Home from '../../components/Home/Home';
import SearchPageContainer from '../../containers/SearchPageContainer';

import { path } from './routingUtils';

import { Routes } from '../../constants';

export default [
  {
    component: Home,
    exact: true,
    path: path(),
  },
  {
    component: SearchPageContainer,
    path: path(Routes.SEARCH),
  },
];
