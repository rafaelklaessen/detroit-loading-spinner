import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pie from './Pie';

export const ArcTypes = {
  FILLED: 'filled',
  BLANK: 'blank'
};

export default class Spinner extends Component {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    segments: PropTypes.number,
    segmentMax: PropTypes.number,
    padding: PropTypes.number,
    cornerRadius: PropTypes.number
  };

  static defaultProps = {
    size: 150,
    color: '#58728D',
    segments: 4,
    segmentMax: 65,
    padding: 2,
    cornerRadius: 20
  };

  constructor(props) {
    super(props);
    this.state = {
      pieOneData: this.generatePercentages(),
      pieTwoData: this.generatePercentages()
    };
  }

  intervalId = null;

  componentDidMount = () => {
    this.intervalId = setInterval(this.updateProgress, 1000);
  };

  componentWillUnmount = () => clearInterval(this.intervalId);

  updateProgress = () =>
    this.setState({
      pieOneData: this.generatePercentages(),
      pieTwoData: this.generatePercentages()
    });

  generatePercentages = () => {
    const percentagesWithoutPadding = this.generatePercentagesWithoutPadding();
    const startsWithPadding = Math.random() >= .5;
    return this.addPaddingToPercentages(
      percentagesWithoutPadding,
      startsWithPadding
    );
  };

  generatePercentagesWithoutPadding = () => {
    const segments = this.props.segments;
    let segmentMax = this.props.segmentMax;
    // https://stackoverflow.com/a/39630127
    const max = 100;
    const tempResults = [];
    let remaining = max;
    let finalResults = [];

     // create a series of random numbers and push them into an array
    for (let i = 1; i <= segments; i++) {
      let r = Math.random() * segmentMax;
      if (i === segments) {
        // the final segment is just what's left after the other randoms are
        // added up
        r = remaining;
      }
      tempResults.push(r);
      // subtract them from the total
      remaining -= r;
      // no segment can be larger than what's remaining
      segmentMax = remaining;
    }

    // randomly shuffle the array into a new array
    while (tempResults.length > 0) {
      const index = Math.floor(Math.random() * tempResults.length);
      finalResults = finalResults.concat(tempResults.splice(index, 1));
    }
    return finalResults;
  };

  addPaddingToPercentages = (percentages, startsWithPadding) => {
    let availablePadding = 0;
    const targetPadding = this.props.padding;
    const withPadding = percentages.map((percentage) => {
      if (percentage > targetPadding) {
        availablePadding += targetPadding;
        return percentage - targetPadding;
      }
      availablePadding += percentage;
      return 0;
    });

    const padding = availablePadding / 8;

    const percentagesAndPaddings = [];

    percentagesAndPaddings.push({
      type: ArcTypes.BLANK,
      value: startsWithPadding ? padding : 0
    });

    withPadding.forEach((percentage) => {
      percentagesAndPaddings.push({
        type: ArcTypes.FILLED,
        value: percentage
      });
      percentagesAndPaddings.push({
        type: ArcTypes.BLANK,
        value: padding
      });
    });

    if (!startsWithPadding) {
      percentagesAndPaddings[percentagesAndPaddings.length - 1].value = 0;
    }

    return percentagesAndPaddings;
  };

  render() {
    const { pieOneData, pieTwoData } = this.state;
    const {
      size,
      color,
      segments,
      segmentMax,
      padding,
      cornerRadius,
      ...props
    } = this.props;
    return (
      <svg width={size} height={size} {...props}>
        <Pie
          size={size}
          cornerRadius={cornerRadius}
          data={pieOneData}
          color={color}
          opacity={.3}
        />
        <Pie
          size={size}
          cornerRadius={cornerRadius}
          data={pieTwoData}
          color={color}
          opacity={.7}
        />
      </svg>
    );
  }
}
