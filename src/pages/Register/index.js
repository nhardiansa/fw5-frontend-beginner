import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { axiosInstance } from "../../helpers/http";
import qs from "qs";
import Spinner from "../../components/Spinner";

import sideImg from "../../assets/img/side-login-img.png";
import googleIcon from "../../assets/img/google-icon.svg";
import logo from "../../assets/img/car-wheel.png";

import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import { clearEmptyObject } from "../../helpers/dataFilter";

export default function Register() {
  const navigate = useNavigate();
  // const history = useHi();
  const [registerData, setRegisterData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = clearEmptyObject(registerData);

    if (Object.keys(data).length === 0) {
      return alert("Please fill all the fields");
    }

    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    setIsLoading(true);
    axiosInstance().post("/auth/register", qs.stringify(data))
      .then(res => {
        if (res.status === 201) {
          setIsLoading(false);
          alert("Registration successful");
          navigate("/verify");
        }
      })
      .catch(err => {
        alert(err.response.data.message);
        setIsLoading(false);
      });

    // navigate('/verify');
    // console.log(registerData);
  };

  return (
      <main className='register row g-0 p-0'>
        {/* <div id="side-image" className=""></div> */}
        <img
          src={sideImg}
          alt="side"
          className='side-img img-fluid d-none d-lg-block col-6 w-100 h-100'
        />
        <section className="login-section w-100 col-lg-6 col-12 d-flex flex-column justify-content-center">
          <div className="main d-flex flex-column justify-content-center flex-fill">
            <h1 className="text-center text-lg-start mt-5 mb-5 fw-bold">Sign Up</h1>
            <form onSubmit={submitHandler} className="login-form d-flex flex-column mb-3">
              <input name='name' onChange={changeHandler} className="mb-3" type="text" placeholder="Name" />
              <input name='username' onChange={changeHandler} className="mb-3" type="text" placeholder="Username" />
              <input name='email' onChange={changeHandler} className="mb-3" type="email" placeholder="Email" />
              <input name='phone' onChange={changeHandler} className="mb-3" type="text" placeholder="Phone number" />
              <input name='password' onChange={changeHandler} className="mb-3" type="password" placeholder="Password" />
              <input name='confirmPassword' onChange={changeHandler} className="mb-3" type="password" placeholder="Confirm password" />
              <Button type='submit' className="login-btn mt-4" disabled={isLoading} >
                {
                  isLoading ? <Spinner /> : "Sign Up"
                }
              </Button>
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
              <Link to='/login' className="btn sign-up text-custom-primary">Login</Link>
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
