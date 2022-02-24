import React, { Component, useState } from 'react'
import {Link} from 'react-router-dom'

import logo from '../../assets/img/car-wheel.png'
import profilePict from '../../assets/img/profile-picture/samantha-doe.png'
import msgIcon from '../../assets/img/msg-icon.svg'
import './style.css';

export const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white position-fixed top-0 w-100 py-lg-4"
    >
      <div className="container d-flex align-items-center">
        <a className="navbar-brand" href="/">
          <img
            className="logo"
            src={logo}
            alt="vehicle-rent-logo"
          />
        </a>
        <div className="d-flex">
          {
            isLogged && (
              <div
                className="profile d-flex d-lg-none justify-content-between align-items-center"
              >
                <a href="/profile.html" className="profile-img">
                  <img
                    src={profilePict}
                    alt="profile-img"
                    className="profile-pict rounded-circle"
                  />
                </a>
                <div className="message-notif position-relative ms-4 me-2">
                  <img
                    src={msgIcon}
                    alt="message"
                    className="message"
                  />
                  <div
                    className="count position-absolute rounded-circle d-flex justify-content-center align-items-center"
                  >
                    1
                  </div>
                </div>
              </div>
            )
          }
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav d-flex ms-auto">
            <Link to='/' className="nav-link" aria-current="page" >Home</Link>
            <Link to='/vehicles' className="nav-link" >Vehicle Type</Link>
            <Link to='/histories' className="nav-link active" >History</Link>
            <Link to='/' className="nav-link" >About</Link>
          </div>
          {
            isLogged && (
              <div
                className="profile d-none d-lg-flex justify-content-between align-items-center"
              >
                <div className="message-notif position-relative">
                  <img
                    src={msgIcon}
                    alt="message"
                    className="message"
                  />
                  <div
                    className="count position-absolute rounded-circle d-flex justify-content-center align-items-center"
                  >
                    1
                  </div>
                </div>
                <a href="/profile.html" className="profile-img">
                  <img
                    src={profilePict}
                    alt="profile-img"
                    className="profile-pict rounded-circle"
                  />
                </a>
              </div>
            )
          }
          {
            !isLogged && (
              <div className="auth d-flex flex-column flex-lg-row">
                <Link to="/login"  className="login-btn fw-normal btn rounded-3 mb-3 mb-lg-0" href="/login.html">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="register-btn fw-normal btn rounded-3 mb-3 mb-lg-0"
                  href="/signup.html"
                >
                  Register
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </nav>
  )
}
