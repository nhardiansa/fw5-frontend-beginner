import React, { Component } from 'react'
import {FaChevronLeft} from 'react-icons/fa'
import { Link } from 'react-router-dom'

import Footer from '../../components/Footer/Footer'
import './style.css'

export default class ForgotPassword extends Component {
  render() {
    return (
      <>
      {/*=============== Header =============== */}
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
            You will receive a link to reset your password. If you haven’t
            received any link, click resend link
          </p>
          <form className="d-flex flex-column align-items-center" action="#">
            <input
              type="email"
              name="email"
              placeholder="Enter your email adress"
              className="form-control text-center text-white"
            />
            <button className="mt-5 send btn" type="submit">Send Link</button>
            <button className="mt-4 resend btn" type="submit">Resend Link</button>
          </form>
        </div>
      </div>
    </header>

    {/*=============== Footer =============== */}
    <Footer />
    </>
    )
  }
}
