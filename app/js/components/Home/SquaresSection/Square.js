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

  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  componentDidMount() {
    const { x, y } = this.props;
    this.props.getSquareInfo(x, y);
  }

  handleMouseOver() {
    this.setState({
      isHovered: true,
    });
  }

  handleMouseOut() {
    this.setState({
      isHovered: false,
    });
  }

  render() {
    const {
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
      pricePaid,
      timesRented,
    } = squareInfo.toJS();

    const id = `${x}-${y}`;
    return (
      <td
        key={id}
        style={{
          backgroundColor: `rgb(${r}, ${g}, ${b})`,
        }}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {this.state.isHovered && (
          <div className="info-box">
            <div>
              owner: {currentOwner.slice(0, 6)}
            </div>
            <div>
              placed at block: {placedAtBlock}
            </div>
            <div>
              price paid: {pricePaid}
            </div>
            <div>
              times rented: {timesRented}
            </div>
            <div>
              {`${x}, ${y}`}
            </div>
          </div>
        )}
      </td>
    );
  }
}
