import React, { Component } from 'react';
import style from './style.module.css';

export default class Button extends Component {
  constructor (props) {
    super(props);
    this.myRef = React.createRef();
  }

  render () {
    const { className, variant, ...rest } = this.props;

    return (
      <button
        className={`btn ${variant ? style[variant] : style.primaryBtn} ${className}`}
        ref={this.myRef}
        {...rest}
      >{this.props.children}</button>
    );
  }
}
