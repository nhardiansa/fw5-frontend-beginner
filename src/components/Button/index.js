import React, { Component } from 'react'
import style from './style.module.css'

export default class Button extends Component {
  render() {
    const {className, type, onClick, template} = this.props

    return (
      <button
        onClick={onClick}
        type={type || 'button'}
        className={`btn ${template ? style[template] : style.primaryBtn} ${className}`}
      >{this.props.children}</button>
    )
  }
}
