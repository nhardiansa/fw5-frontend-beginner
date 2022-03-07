import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import qs from 'qs';

import Footer from '../../components/Footer/Footer';
import { axiosInstance } from '../../helpers/http';
import './style.css';
import Spinner from '../../components/Spinner';

export default function ForgotPassword (props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [forgotPage, setForgotPage] = useState(false);
  const [inputPassword, setInputPassword] = useState(false);
  const [verificationData, setVerificationData] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(props);
    if (pathname === '/forgotPassword') {
      setForgotPage(true);
    }
  }, []);

  const changeHandler = (e) => {
    setVerificationData({
      ...verificationData,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(verificationData);
    setIsLoading(true);

    if (pathname === '/forgotPassword') {
      if (forgotPage) {
        // send code to email
        sendCode(verificationData);
        console.log('send code to email');
      } else {
        // reset password
        console.log('reset password');
        console.log(verificationData);
        resetPassword(verificationData);
      }
    }

    if (pathname !== '/forgotPassword') {
      // verify code
      console.log('verify user');
      requestVerifyUser(verificationData);
    }
  };

  const requestVerifyUser = (dataObj) => {
    axiosInstance().post('/auth/confirm-reset', qs.stringify(dataObj))
      .then(res => {
        if (res.status === 200) {
          setIsLoading(false);
          alert('Verification successful');
          navigate('/login');
        }
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data.message);
        setIsLoading(false);
      });
  };

  const sendCode = (dataObj) => {
    axiosInstance().post('/auth/confirm-reset', qs.stringify(dataObj))
      .then(res => {
        if (res.status === 200) {
          alert('Check your email for code');
          setIsLoading(false);
          setForgotPage(false);
          setInputPassword(true);
        }
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data.message);
        setIsLoading(false);
      });
  };

  const resetPassword = (dataObj) => {
    axiosInstance().post('/auth/confirm-reset', qs.stringify(dataObj))
      .then(res => {
        if (res.status === 200) {
          alert('Password reset successful');
          setIsLoading(false);
          navigate('/login');
        }
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data.message);
        setIsLoading(false);
      });
  };

  return (
      <>
      {/* =============== Header =============== */}
      <header>
      <div className="filter">
        <div
          className="forgot-wrapper container text-center d-flex flex-column align-items-center"
        >
          <div className="back-nav-section mb-5 align-self-start">
            <Link className='d-flex align-items-center' to="/login">
              <FaChevronLeft />
              <span className="text-link">Back</span>
            </Link>
          </div>
          <h1>Do’nt worry, we got your back!</h1>
          <p className="my-5">
            You will receive a code to {pathname === '/forgotPassword' ? 'reset your password' : 'verify your self'}. If you haven’t
            received any code, click resend code
          </p>
          <form onSubmit={submitHandler} className="d-flex flex-column align-items-center" action="#">
            <input
              onChange={changeHandler}

              type="email"
              name="email"
              placeholder="Enter your email adress"
              className="forgot-input form-control text-center text-white"
            />
            {
              (!forgotPage) && (
                <input
                  onChange={changeHandler}
                  type="text"
                  name="code"
                  placeholder={`${forgotPage ? 'Reset' : 'Verification'} code`}
                  className="forgot-input mt-3 form-control text-center text-white"
                />
              )
            }
            {
              (!forgotPage && inputPassword) &&
              (
                <>
                  <input
                    onChange={changeHandler}
                    type="password"
                    name="password"
                    placeholder='Enter new password'
                    className="forgot-input mt-3 form-control text-center text-white"
                  />
                  <input
                    onChange={changeHandler}
                    type="password"
                    name="confirm_password"
                    placeholder='Confirm new password'
                    className="forgot-input mt-3 form-control text-center text-white"
                  />
                </>
              )
            }
            {
              inputPassword
                ? (
                <Button type='submit' className="login-btn mt-4 text-capitalize" disabled={isLoading} > reset password </Button>
                  )
                : (
                <Button type='submit' className="login-btn mt-4 text-capitalize" disabled={isLoading} >
                  {isLoading ? <Spinner /> : `${pathname === '/forgotPassword' ? 'Send Code' : 'Verify now!'}`}
                </Button>
                  )
            }
            {
              (inputPassword || forgotPage) && (
                <Button variant='secondaryBtn' className='text-capitalize mt-4' disabled={isLoading} >resend code</Button>
              )
            }
          </form>
        </div>
      </div>
    </header>

    {/* =============== Footer =============== */}
    <Footer />
    </>
  );
}
