import { Component } from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

import sideImg from '../../assets/img/side-login-img.png';
import googleIcon from '../../assets/img/google-icon.svg';
import logo from '../../assets/img/car-wheel.png';

import './style.css';
import { Link } from 'react-router-dom';

export default class Register extends Component {
  render () {
    return (
      <main className='row g-0 p-0'>
        {/* <div id="side-image" className=""></div> */}
        <img
          src={sideImg}
          alt="side"
          className='side-img img-fluid d-none d-lg-block col-6'
        />
        <section className="login-section col-lg-6 col-12 d-flex flex-column justify-content-center">
          <div className="main d-flex flex-column justify-content-center flex-fill">
            <h1 className="text-center text-lg-start mt-5 mb-5 fw-bold">Sign Up</h1>
            <form action="#" className="login-form d-flex flex-column mb-3">
              <input className="mb-3" type="text" placeholder="Name" />
              <input className="mb-3" type="text" placeholder="Email" />
              <input className="mb-3" type="text" placeholder="Password" />
              <a href="/login.html" className="login mt-4 btn">Sign Up</a>
            </form>
            <div
              className="separator my-4 d-flex justify-content-center align-items-center"
            >
              <hr className="line-separator rounded my-0" />
              <p className="text-center mx-3 mx-md-5 lh-1">or try another way</p>
              <hr className="line-separator rounded my-0" />
            </div>
            <div className="other-way d-flex flex-column">
              <a href="/login.html" className="btn mb-4 google-login btn-light">
                <img
                  className="google-icon"
                  src={googleIcon}
                  alt=""
                  srcSet=""
                />
                Sign Up with Google
              </a>
              <Link to='/login' className="btn btn-light login-btn">Login</Link>
            </div>
          </div>
          <footer className='flex-fill'>
            <img
              className="vehicle-rent-logo"
              src={logo}
              alt="vehicle-rent-log"
            />
            <p className="copy-writing mt-4">
              Plan and book your perfect trip with expert advice, travel tips for
              vehicle information from us
            </p>
            <p className="since mb-4">
              ©2020 Vehicle Rental Center. All rights reserved
            </p>
            <hr className="line-separator rounded mx-auto mb-4" />
            <div className="icons d-flex my-4 justify-content-center">
              <FaTwitter />
              <FaFacebookF />
              <FaInstagram />
              <FaLinkedinIn />
              <FaYoutube />
            </div>
          </footer>
        </section>
      </main>
    );
  }
}
