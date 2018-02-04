import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';

export default class SquaresSection extends Component {
  static get propTypes() {
    return {
      grid: ImmutablePropTypes.mapOf(
        ImmutablePropTypes.mapOf(
          ImmutablePropTypes.mapOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
            ]).isRequired,
            PropTypes.string.isRequired,
          ).isRequired,
          PropTypes.number.isRequired,
        ).isRequired,
        PropTypes.number.isRequired,
      ).isRequired,
      gridSizeX: PropTypes.number.isRequired,
      gridSizeY: PropTypes.number.isRequired,
      getGridSizeX: PropTypes.func.isRequired,
      getGridSizeY: PropTypes.func.isRequired,
      getSquareInfo: PropTypes.func.isRequired,
    };
  }

  componentDidMount() {
    this.props.getGridSizeX();
    this.props.getGridSizeY();
  }

  getSquareInfo(x, y) {
    return () => {
      this.props.getSquareInfo(x, y);
    };
  }

  renderColumns(y) {
    const { grid, gridSizeX } = this.props;
    return Array.from(new Array(gridSizeX)).map((_, x) => {
      const { r, g, b } = grid.getIn([x, y], Map()).toJS();

      return (
        <td
          key={`${x}-${y}`}
          onClick={this.getSquareInfo(x, y)}
          style={{
            backgroundColor: `rgb(${r}, ${g}, ${b})`,
          }}
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
      <table className="squares-table" cellPadding={0} cellSpacing={0}>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}
