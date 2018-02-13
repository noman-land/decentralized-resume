import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import SquareInfoPanel from './SquareInfoPanel';

export default class Square extends Component {
  static get propTypes() {
    return {
      isPanelOpen: PropTypes.bool,
      getSquareInfo: PropTypes.func.isRequired,
      onRentClick: PropTypes.func.isRequired,
      onSquareClick: PropTypes.func.isRequired,
      squareInfo: ImmutablePropTypes.contains({
        r: PropTypes.number.isRequired,
        g: PropTypes.number.isRequired,
        b: PropTypes.number.isRequired,
        currentOwner: PropTypes.string.isRequired,
        placedAtBlock: PropTypes.number.isRequired,
        lastPricePaid: PropTypes.number.isRequired,
        timesRented: PropTypes.number.isRequired,
      }).isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    };
  }

  static get defaultProps() {
    return {
      isPanelOpen: false,
    };
  }

  componentDidMount() {
    const { getSquareInfo, x, y } = this.props;
    getSquareInfo(x, y);
  }

  shouldComponentUpdate(newProps) {
    const { isPanelOpen: shouldPanelBeOpen, squareInfo: newSquareInfo } = newProps;
    const { isPanelOpen, squareInfo: oldSquareInfo } = this.props;
    return !newSquareInfo.equals(oldSquareInfo) || !(shouldPanelBeOpen === isPanelOpen);
  }

  render() {
    const {
      isPanelOpen,
      onRentClick,
      onSquareClick,
      squareInfo,
      x,
      y,
    } = this.props;

    const {
      r,
      g,
      b,
    } = squareInfo.toJS();

    const id = `${x}-${y}`;
    return (
      <td
        key={id}
        onClick={onSquareClick}
        style={{
          backgroundColor: `rgb(${r}, ${g}, ${b})`,
        }}
      >
        {isPanelOpen && (
          <SquareInfoPanel
            closePanel={onSquareClick}
            onRentClick={onRentClick}
            squareInfo={squareInfo}
            x={x}
            y={y}
          />
        )}
      </td>
    );
  }
}
