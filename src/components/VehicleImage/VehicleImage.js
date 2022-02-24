import React, { Component } from 'react'
import style from './VehicleImage.module.css';
import { Link } from 'react-router-dom';

export default class VehicleImage extends Component {
  render() {
    const { src, name, location, alt, className, to } = this.props
    return (
      <Link to={to} className={`${style.wrapper} ${className} position-relative`}>
        <img className={style.img} src={src} alt={alt || ''} srcSet="" />
        <div className={`${style.desc} position-absolute`}>
          <h3 className={style.name}>{name}</h3>
          <p className={style.location}>{location}</p>
        </div>
      </Link>
    )
  }
}
