import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import SquareInfoPanel from './SquareInfoPanel';

import { codePointsToEmoji } from '../../../utils/emojiUtils';

export default class Square extends Component {
  static get propTypes() {
    return {
      closePanel: PropTypes.func.isRequired,
      isPanelOpen: PropTypes.bool,
      getSquareInfo: PropTypes.func.isRequired,
      onRentClick: PropTypes.func.isRequired,
      openPanel: PropTypes.func.isRequired,
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
      closePanel,
      isPanelOpen,
      onRentClick,
      openPanel,
      squareInfo,
      x,
      y,
    } = this.props;

    const {
      emoji,
      r,
      g,
      b,
    } = squareInfo.toJS();

    const id = `${x}-${y}`;
    return (
      <td
        key={id}
        onClick={isPanelOpen ? closePanel : openPanel}
        style={{
          backgroundColor: `rgb(${r}, ${g}, ${b})`,
        }}
      >
        <span className="emoji-wrapper">
          {codePointsToEmoji(emoji)}
        </span >
        {isPanelOpen && (
          <SquareInfoPanel
            closePanel={closePanel}
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
