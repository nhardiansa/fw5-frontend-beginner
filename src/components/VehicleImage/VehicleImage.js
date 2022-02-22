import React, { Component } from 'react'
import style from './VehicleImage.module.css';

export default class VehicleImage extends Component {
  render() {
    const { src, name, location, alt, className } = this.props
    return (
      <div className={`${style.wrapper} position-relative col`}>
        <img className={style.img} src={src} alt={alt || ''} srcSet="" />
        <div className={`${style.desc} position-absolute`}>
          <h3 className={style.name}>{name}</h3>
          <p className={style.location}>{location}</p>
        </div>
      </div>
    )
  }
}
