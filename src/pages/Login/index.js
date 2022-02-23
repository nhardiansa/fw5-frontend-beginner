import React, { Component } from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

import sideImg from '../../assets/img/side-login-img.png';
import carWheel from '../../assets/img/car-wheel.png';
import googleIcon from '../../assets/img/google-icon.svg';

import './style.css';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    const { email, password } = this.state

    if (!(email === 'admin@mail.com' && password === '1234')) {
      return alert('Invalid credentials');
    }

    this.props.setLogin(true)
    return console.log('Login success');
  }

  render() {
    return (
      <main className='row g-0 p-0 '>
        {/* <div id="side-image d-none d-lg-block col-6">
        </div> */}
        <img 
          src={sideImg} 
          alt="" 
          className='side-img img-fluid d-none d-lg-block col-6'
        />
        <section className="login-section col-lg-6 d-flex flex-column flex-wrap">
          <div className="main">
            <h1 className="text-center text-lg-start mt-5 mb-5">Login</h1>
            <form onSubmit={this.submitHandler} className="login-form d-flex flex-column mb-3">
              <input className="mb-3" type="text" placeholder="Email" name='email' onChange={this.handleChange} />
              <input className="mb-3" type="password" placeholder="Password" name='password' onChange={this.handleChange} />
              <button type='submit' className="btn login mt-4" >Login</button>
            </form>
            <a className="forgot" href="/forgot-password.html">Forgot password?</a>
            <div
              className="separator my-4 d-flex justify-content-center align-items-center"
            >
              <hr className="line-separator rounded" />
              <p className="text-center mx-3">or try another way</p>
              <hr className="line-separator rounded" />
            </div>
            <div className="other-way d-flex flex-column">
              <a href="/" className="btn mb-4 google-login">
                <img
                  className="google-icon"
                  // src="./assets/img/google-icon.svg"
                  src={googleIcon}
                  alt=""
                  srcSet=""
                />
                Login with Google
              </a>
              <a href="./signup.html" className="btn sign-up">Sign Up</a>
            </div>
          </div>
          <footer className='pb-1'>
            <img
              className="vehicle-rent-logo"
              src={carWheel}
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
    )
  }
}

export default Login;