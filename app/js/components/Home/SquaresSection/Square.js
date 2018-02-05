import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

function stopPropagation(event) {
  event.stopPropagation();
}

export default class Square extends Component {
  static get propTypes() {
    return {
      isPanelOpen: PropTypes.bool,
      getSquareInfo: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired,
      onRentSquare: PropTypes.func.isRequired,
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

  constructor() {
    super();
    this.handleRentClick = this.handleRentClick.bind(this);
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

  handleRentClick() {
    const {
      x,
      y,
      onRentSquare,
      squareInfo,
    } = this.props;

    onRentSquare({
      x,
      y,
      r: Math.floor(Math.random() * 255),
      g: Math.floor(Math.random() * 255),
      b: Math.floor(Math.random() * 255),
      value: squareInfo.get('lastPricePaid') + 1,
    });
  }

  render() {
    const {
      isPanelOpen,
      onClick,
      squareInfo,
      x,
      y,
    } = this.props;

    const {
      r,
      g,
      b,
      currentOwner,
      placedAtBlock,
      lastPricePaid,
      timesRented,
    } = squareInfo.toJS();

    const id = `${x}-${y}`;
    return (
      <td
        key={id}
        onClick={onClick}
        style={{
          backgroundColor: `rgb(${r}, ${g}, ${b})`,
        }}
      >
        {isPanelOpen && (
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
        )}
      </td>
    );
  }
}
