import { Component } from 'react';
import '../assets/css/NavbarLogOut.css';
import carWeel from '../assets/img/car-wheel.png';

export default class NavbarLogOut extends Component {
  clickHandler = () => {
    this.props.setLogin(false);
  };

  render () {
    return (
      <nav
      className="navbar navbar-expand-lg navbar-light bg-light position-fixed top-0 w-100 py-lg-4"
    >
      <div className="container d-flex align-items-center">
        <a className="navbar-brand" href="/">
          <img
            className="logo"
            src={carWeel}
            alt="vehicle-rent-logo"
          />
        </a>
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
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav d-flex ms-auto">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
            <a className="nav-link" href="/vehicle-type.html">Vehicle Type</a>
            <a className="nav-link" href="/history.html">History</a>
            <a className="nav-link" href="/">About</a>
          </div>
          <div className="auth d-flex flex-column flex-lg-row">
            <a onClick={this.clickHandler} className="login-btn fw-normal btn rounded-3 mb-3 mb-lg-0" href="/login.html">
              Login
            </a>
            <a
              className="register-btn fw-normal btn rounded-3 mb-3 mb-lg-0"
              href="/signup.html"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </nav>
    );
  }
}
