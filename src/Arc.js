import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { arc as d3Arc } from 'd3-shape';

export default class Arc extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    cornerRadius: PropTypes.number
  };

  static defaultProps = {
    cornerRadius: 20
  };

  id = Math.random();

  arc = d3Arc()
    .innerRadius(this.props.size / 2.75)
    .outerRadius(this.props.size / 2)
    .startAngle(this.props.startAngle)
    .endAngle(this.props.endAngle)
    .cornerRadius(this.props.cornerRadius);

  componentDidUpdate = prevProps => {
    d3.select(document.getElementById(this.id))
      .transition()
      .ease(d3.easeExpOut)
      .duration(1000)
      .attrTween('d', () => step =>
        this.arc
          .startAngle(
            this.calculateNextStartAngle(
              prevProps.startAngle,
              this.props.startAngle,
              step
            )
          )
          .endAngle(
            this.calculateNextEndAngle(
              prevProps.endAngle,
              this.props.endAngle,
              step
            )
          )()
      );
  };

  calculateNextStartAngle = (oldStartAngle, newStartAngle, step) =>
    oldStartAngle + step * (newStartAngle - oldStartAngle);

  calculateNextEndAngle = (oldEndAngle, newEndAngle, step) =>
    oldEndAngle + step * (newEndAngle - oldEndAngle);

  render() {
    const arc = this.arc();
    const { size, startAngle, endAngle, cornerRadius, ...props } = this.props;
    return (
      <g>
        <path id={this.id} d={arc} {...props} />
      </g>
    );
  }
}
