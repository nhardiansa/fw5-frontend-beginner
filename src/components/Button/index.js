import React, { Component } from 'react'
import style from './style.module.css'

export default class Button extends Component {
  render() {
    const {className, type, onClick} = this.props
    return (
      <button
        onClick={onClick}
        type={type || 'button'}
        className={`btn ${style.primaryBtn} ${className}`}
      >{this.props.children}</button>
    )
  }
}
