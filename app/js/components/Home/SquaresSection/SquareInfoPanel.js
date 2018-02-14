import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { emojiToCodePoints } from '../../../utils/emojiUtils';

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
    this.closeIfClickedOutside = this.closeIfClickedOutside.bind(this);
    this.handleRentClick = this.handleRentClick.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.closeIfClickedOutside);
  }

  shouldComponentUpdate(newProps) {
    const { squareInfo: newSquareInfo } = newProps;
    const { squareInfo: oldSquareInfo } = this.props;
    return !newSquareInfo.equals(oldSquareInfo);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeIfClickedOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  closeIfClickedOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      const { closePanel, x, y } = this.props;
      closePanel(x, y);
    }
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
      emoji: emojiToCodePoints('💯'),
      r: Math.floor(Math.random() * 255),
      g: Math.floor(Math.random() * 255),
      b: Math.floor(Math.random() * 255),
      value: squareInfo.get('lastPricePaid') + 1,
    }).then(() => closePanel(x, y));
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
      <div className="info-box" ref={this.setWrapperRef}>
        <div>
          owner: {currentOwner.slice(0, 6)}
        </div>
        <div>
          placed at block: {placedAtBlock}
        </div>
        <div>
          minimum donation: {lastPricePaid + 1} wei
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
