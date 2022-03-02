import { Component } from 'react';
import style from './style.module.css';

export default class Button extends Component {
  render () {
    const { className, variant, ...rest } = this.props;

    return (
      <button
        className={`btn ${variant ? style[variant] : style.primaryBtn} ${className}`}
        {...rest}
      >{this.props.children}</button>
    );
  }
}
