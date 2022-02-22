import React, { Component } from 'react'

import logo from '../../assets/img/car-wheel.png'
import profilePict from '../../assets/img/profile-picture/samantha-doe.png'
import msgIcon from '../../assets/img/msg-icon.svg'
import './style.css';

export default class NavbarLogged extends Component {
  render() {
    return (
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light position-fixed top-0 w-100 py-lg-4"
      >
        <div class="container d-flex align-items-center">
          <a class="navbar-brand" href="/">
            <img
              class="logo"
              src={logo}
              alt="vehicle-rent-logo"
            />
          </a>
          <div class="d-flex">
            <div
              class="profile d-flex d-lg-none justify-content-between align-items-center"
            >
              <a href="/profile.html" class="profile-img">
                <img
                  src={profilePict}
                  alt="profile-img"
                  class="profile-pict rounded-circle"
                />
              </a>
              <div class="message-notif position-relative ms-4 me-2">
                <img
                  src={msgIcon}
                  alt="message"
                  class="message"
                />
                <div
                  class="count position-absolute rounded-circle d-flex justify-content-center align-items-center"
                >
                  1
                </div>
              </div>
            </div>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>

          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav d-flex ms-auto">
              <a class="nav-link" aria-current="page" href="/">Home</a>
              <a class="nav-link" href="/vehicle-type.html">Vehicle Type</a>
              <a class="nav-link active" href="#">History</a>
              <a class="nav-link" href="#">About</a>
            </div>
            <div
              class="profile d-none d-lg-flex justify-content-between align-items-center"
            >
              <div class="message-notif position-relative">
                <img
                  src={msgIcon}
                  alt="message"
                  class="message"
                />
                <div
                  class="count position-absolute rounded-circle d-flex justify-content-center align-items-center"
                >
                  1
                </div>
              </div>
              <a href="/profile.html" class="profile-img">
                <img
                  src={profilePict}
                  alt="profile-img"
                  class="profile-pict rounded-circle"
                />
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
