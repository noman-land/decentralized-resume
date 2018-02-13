import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

function stopPropagation(event) {
  event.stopPropagation();
}

export default class SquareInfoPanel extends Component {
  static get propTypes() {
    return {
      closePanel: PropTypes.func.isRequired,
      onRentClick: PropTypes.func.isRequired,
      squareInfo: ImmutablePropTypes.contains({
        emoji: ImmutablePropTypes.listOf(PropTypes.number.isRequired).isRequired,
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

  constructor(props) {
    super(props);
    this.handleRentClick = this.handleRentClick.bind(this);
  }

  shouldComponentUpdate(newProps) {
    const { squareInfo: newSquareInfo } = newProps;
    const { squareInfo: oldSquareInfo } = this.props;
    return !newSquareInfo.equals(oldSquareInfo);
  }

  handleRentClick() {
    const {
      x,
      y,
      closePanel,
      onRentClick,
      squareInfo,
    } = this.props;

    onRentClick({
      x,
      y,
      emoji: [128105, 8205, 128105, 8205, 128103, 8205, 128103, 0],
      r: Math.floor(Math.random() * 255),
      g: Math.floor(Math.random() * 255),
      b: Math.floor(Math.random() * 255),
      value: squareInfo.get('lastPricePaid') + 1,
    }).then(closePanel);
  }

  render() {
    const {
      squareInfo,
      x,
      y,
    } = this.props;

    const {
      currentOwner,
      placedAtBlock,
      lastPricePaid,
      timesRented,
    } = squareInfo.toJS();

    return (
      <div className="info-box" onClick={stopPropagation}>
        <div>
          owner: {currentOwner.slice(0, 6)}
        </div>
        <div>
          placed at block: {placedAtBlock}
        </div>
        <div>
          last price paid: {lastPricePaid}
        </div>
        <div>
          times rented: {timesRented}
        </div>
        <div>
          {`${x}, ${y}`}
        </div>
        <button onClick={this.handleRentClick}>
          Rent Square
        </button>
      </div>
    );
  }
}
