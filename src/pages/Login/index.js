import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import axios from 'axios';
import qs from 'qs';
import { useDispatch } from 'react-redux';

import { login } from '../../redux/actions/auth';

import sideImg from '../../assets/img/side-login-img.png';
import carWheel from '../../assets/img/car-wheel.png';
import googleIcon from '../../assets/img/google-icon.svg';
import constants from '../../config/constants';

import './style.css';

export const Login = () => {
  const dispatch = useDispatch();

  const storage = window.localStorage;
  const { baseURL } = constants;
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = loginData;
      const data = await loginUser(email, password);

      if (!data.success) {
        return alert(data.message);
      }

      const user = data.results;
      storage.setItem('user', JSON.stringify(user));
      dispatch(login(user));

      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post(`${baseURL}/auth/login`, qs.stringify({ email, password }));
      return data;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  };

  return (
      <main className='row g-0 p-0 '>
        {/* <div id="side-image d-none d-lg-block col-6">
        </div> */}
        <img
          src={sideImg}
          alt=""
          className='side-img img-fluid d-none d-lg-block col-6'
        />
        <section className="login-section col-lg-6 d-flex flex-column justify-content-center">
          <div className="main d-flex flex-column justify-content-center flex-fill">
            <h1 className="text-center text-lg-start mt-5 mb-5 fw-bold">Login</h1>
            <form onSubmit={submitHandler} className="login-form d-flex flex-column mb-3">
              <input className="mb-3" type="text" placeholder="Email" name='email' onChange={handleChange} />
              <input className="mb-3" type="password" placeholder="Password" name='password' onChange={handleChange} />
              <button type='submit' className="btn login mt-4" >Login</button>
            </form>
            <Link className="forgot" to="/forgotPassword">Forgot password?</Link>
            <div
              className="separator my-4 d-flex justify-content-center align-items-center"
            >
              <hr className="line-separator rounded my-0" />
              <p className="text-center mx-3 mx-md-5 lh-1">or try another way</p>
              <hr className="line-separator rounded my-0" />
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
              <Link to='/register' className="btn sign-up">Sign Up</Link>
            </div>
          </div>
          <footer className='pb-1 flex-fill'>
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
  );
};

// export default Login;
