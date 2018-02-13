import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Square from './Square';

import { DEFAULT_SQUARE_INFO } from '../../../constants';

export default class SquaresSection extends Component {
  static get propTypes() {
    return {
      grid: ImmutablePropTypes.mapOf(
        ImmutablePropTypes.mapOf(
          ImmutablePropTypes.contains({
            r: PropTypes.number.isRequired,
            g: PropTypes.number.isRequired,
            b: PropTypes.number.isRequired,
            currentOwner: PropTypes.string.isRequired,
            placedAtBlock: PropTypes.number.isRequired,
            lastPricePaid: PropTypes.number.isRequired,
            timesRented: PropTypes.number.isRequired,
          }).isRequired,
          PropTypes.number.isRequired,
        ).isRequired,
        PropTypes.number.isRequired,
      ).isRequired,
      gridSizeX: PropTypes.number.isRequired,
      gridSizeY: PropTypes.number.isRequired,
      getSquareInfo: PropTypes.func.isRequired,
      rentSquare: PropTypes.func.isRequired,
    };
  }

  constructor() {
    super();
    this.state = {
      openedPanel: { x: null, y: null },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(newProps, newState) {
    const { grid, gridSizeX, gridSizeY } = this.props;
    const { openedPanel: { x, y } } = this.state;
    const {
      grid: newGrid,
      gridSizeX: newGridSizeX,
      gridSizeY: newGridSizeY,
    } = newProps;
    const { openedPanel: { x: newX, y: newY } } = newState;

    return !grid.equals(newGrid)
      || gridSizeX !== (newGridSizeX)
      || gridSizeY !== (newGridSizeY)
      || x !== newX
      || y !== newY;
  }

  handleClick(x, y) {
    return () => this.setState(state => {
      const { x: openX, y: openY } = state.openedPanel;
      return {
        ...state,
        openedPanel: x === openX && y === openY
          ? { x: null, y: null }
          : { x, y },
      };
    });
  }

  renderColumns(y) {
    const {
      getSquareInfo,
      grid,
      gridSizeX,
      rentSquare,
    } = this.props;
    const { openedPanel } = this.state;
    return Array.from(new Array(gridSizeX)).map((_, x) => {
      const squareInfo = grid.getIn([x, y], DEFAULT_SQUARE_INFO);
      return (
        <Square
          key={`${x}-${y}`}
          isPanelOpen={openedPanel.x === x && openedPanel.y === y}
          getSquareInfo={getSquareInfo}
          onSquareClick={this.handleClick(x, y)}
          onRentClick={rentSquare}
          squareInfo={squareInfo}
          x={x}
          y={y}
        />
      );
    });
  }

  renderRows() {
    const { gridSizeY } = this.props;
    return Array.from(new Array(gridSizeY)).map((_, y) => (
      <tr key={y}>{this.renderColumns(y)}</tr>
    ));
  }

  render() {
    return (
      <div>
        <table className="squares-table" cellPadding={0} cellSpacing={0}>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}
