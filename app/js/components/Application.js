import React, { Component } from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Map } from 'immutable';

import Nav from './Nav';

import { setGrid } from '../actions/gridActions';
import { getGridSizeXSuccess } from '../actions/getGridSizeXActions';
import { getGridSizeYSuccess } from '../actions/getGridSizeYActions';
import rootReducer from '../reducers/index';
import routeConfig from '../utils/routing/routeConfig';
import SquareUtils from '../utils/SquaresUtils';

import { DEFAULT_SQUARE_INFO } from '../constants';

function createInitialGrid(gridSizeX, gridSizeY) {
  let grid = Map();

  Array.from(new Array(gridSizeX)).forEach((_, x) => {
    Array.from(new Array(gridSizeY)).forEach((__, y) => {
      grid = grid.setIn([x, y], DEFAULT_SQUARE_INFO);
    });
  });

  return grid;
}

export default class Application extends Component {
  constructor(props, context) {
    super(props, context);
    window.App = this;

    this.createStore();

    this.SquareUtils = new SquareUtils();
    this.SquareUtils.initWeb3().then(() => {
      const { dispatch } = this.store;
      Promise.all([
        this.SquareUtils.getGridSizeX(),
        this.SquareUtils.getGridSizeY(),
      ]).then(([gridSizeX, gridSizeY]) => {
        dispatch(getGridSizeXSuccess({ gridSizeX }));
        dispatch(getGridSizeYSuccess({ gridSizeY }));
        dispatch(setGrid(createInitialGrid(gridSizeX, gridSizeY)));
      });
    });
  }

  createStore() {
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-enable */

    this.history = createHistory();

    this.store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(
        thunk,
        routerMiddleware(this.history),
      )),
    );
  }

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          <div className="flex-column">
            <Nav />
            {renderRoutes(routeConfig)}
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
