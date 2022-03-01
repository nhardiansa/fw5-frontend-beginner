import React, { Component } from 'react'
import {FaChevronDown, FaMinus, FaPlus} from 'react-icons/fa'

import Layout from '../../components/Layout'

import vehicle from '../../assets/img/bike/image-banner.png'
import './style.css'
import { Link } from 'react-router-dom'

export default class Reservation extends Component {

  focusHandler = (e) => {
    e.target.type = 'date'
  }

  blurHandler = (e) => {
    e.target.type = 'text'
  }

  render() {
    return (
      <Layout isLogged={true}>
        <main className="reservation-wrapper container px-5 px-lg-0">
          <div className="back-section">
            <a
              href="/vehicle-detail.html"
              className="back-btn d-flex align-items-center"
            >
              <i className="back-icon fa-solid fa-chevron-left"></i>
              Reservartion
            </a>
          </div>
          <div className="detail-section w-100">
            <div className="banner">
              <img
                src={vehicle}
                alt="bike"
                className="banner-img"
              />
            </div>
            <div
              className="desc-price text-center text-md-start mt-4 mt-md-0 d-lg-flex flex-column justify-content-between"
            >
              <h1>
                Fixie - Gray Only <br />
                <span className="location">Yogyakarta</span>
              </h1>
              <p className="prepayment">No prepayment</p>
            </div>
            <div className="counter mt-5 mt-md-0 d-lg-flex justify-content-start">
              <div className="d-flex justify-content-between align-items-center w-100">
                <button className="qty-control btn minus">
                  <FaMinus />
                </button>
                  <span className="qty-number">2</span>
                <button className="qty-control btn plus">
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="reservation-date border-0 mt-5 mt-md-0">
              <h2 className="reservation-title">Reservation Date :</h2>
              <div className="d-flex flex-md-column">
                <input
                  type="text"
                  name="start_date"
                  id="start-date"
                  className="date-input date-picker"
                  // onfocus="(this.type='date')"
                  // onblur="(this.type='text')"
                  onFocus={this.focusHandler}
                  onBlur={this.blurHandler}
                  placeholder="Start Date"
                />
                <div className="count-day-wrapper position-relative mt-md-4">
                  {/* <i
                    className="date-dropdown-icon position-absolute fas fa-chevron-down"
                  ></i> */}
                  <FaChevronDown className='date-dropdown-icon position-absolute' />
                  <select
                    className="date-input count-day form-select h-100"
                    id="inputGroupSelect01"
                  >
                    <option defaultValue>1 Day</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="action-group mt-5 mt-md-0">
              <Link to='/payment' className="btn pay w-100"
                >Pay now : Rp. 178.000</Link
              >
            </div>
          </div>
        </main>
      </Layout>
    )
  }
}
