import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class Square extends Component {
  static get propTypes() {
    return {
      getSquareInfo: PropTypes.func.isRequired,
      squareInfo: ImmutablePropTypes.contains({
        r: PropTypes.number.isRequired,
        g: PropTypes.number.isRequired,
        b: PropTypes.number.isRequired,
        currentOwner: PropTypes.string.isRequired,
        placedAtBlock: PropTypes.number.isRequired,
        pricePaid: PropTypes.number.isRequired,
        timesRented: PropTypes.number.isRequired,
      }).isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    };
  }

  componentDidMount() {
    const { x, y } = this.props;
    this.props.getSquareInfo(x, y);
  }

  render() {
    const {
      squareInfo,
      x,
      y,
    } = this.props;

    const { r, g, b } = squareInfo.toJS();

    return (
      <td
        key={`${x}-${y}`}
        style={{
          backgroundColor: `rgb(${r}, ${g}, ${b})`,
        }}
      />
    );
  }
}
