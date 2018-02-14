import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Square from './Square';

import { DEFAULT_SQUARE_INFO } from '../../../constants';

export default class SquaresSection extends Component {
  static get propTypes() {
    return {
      getSquareInfo: PropTypes.func.isRequired,
      grid: ImmutablePropTypes.mapOf(
        ImmutablePropTypes.mapOf(
          ImmutablePropTypes.contains({
            emoji: ImmutablePropTypes.listOf(PropTypes.number.isRequired).isRequired,
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
      rentSquare: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      openedPanel: { x: null, y: null },
    };
    this.closePanel = this.closePanel.bind(this);
    this.openPanel = this.openPanel.bind(this);
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
      || gridSizeX !== newGridSizeX
      || gridSizeY !== newGridSizeY
      || x !== newX
      || y !== newY;
  }

  closePanel(closeX, closeY) {
    const { x: openX, y: openY } = this.state.openedPanel;
    if (closeX === openX && closeY === openY) {
      this.setState({
        openedPanel: { x: null, y: null },
      });
    }
  }

  isPanelOpen(x, y) {
    const { x: openX, y: openY } = this.state.openedPanel;
    return openX === x && openY === y;
  }

  openPanel(x, y) {
    this.setState({
      openedPanel: { x, y },
    });
  }

  renderColumns(y) {
    const {
      getSquareInfo,
      grid,
      gridSizeX,
      rentSquare,
    } = this.props;
    return Array
      .from(new Array(gridSizeX))
      .map((_, x) => (
        <Square
          closePanel={this.closePanel}
          isPanelOpen={this.isPanelOpen(x, y)}
          getSquareInfo={getSquareInfo}
          key={`${x}-${y}`}
          onRentClick={rentSquare}
          openPanel={this.openPanel}
          squareInfo={grid.getIn([x, y], DEFAULT_SQUARE_INFO)}
          x={x}
          y={y}
        />
      ));
  }

  renderRows() {
    const { gridSizeY } = this.props;
    return Array
      .from(new Array(gridSizeY))
      .map((_, y) => (
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
