import React, { Component } from 'react'

import Layout from '../../components/Layout'

import pict from '../../assets/img/bike/image-banner.png'
import './style.css'

export default class VehicleDetail extends Component {
  render() {
    return (
      <Layout>
        <main className="container px-5 px-lg-0">
          <div className="back-section">
            <a href="/vehicle-type.html" className="back-btn d-flex align-items-center">
              <i className="back-icon fa-solid fa-chevron-left"></i>
              Detail
            </a>
          </div>
          <div className="detail-section w-100">
            <div className="banner">
              <img src={pict} alt="bike" />
            </div>
            <div
              className="image-slider mt-4 mt-md-0 d-flex justify-content-between align-items-center"
            >
              <button className="btn rounded-circle slide-control slide-next">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <img src={pict} alt="bike" />
              <img src={pict} alt="bike" />
              <button className="btn rounded-circle slide-control slide-prev">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <div
              className="desc-price text-center text-md-start mt-4 mt-md-0 d-lg-flex flex-column justify-content-between"
            >
              <h1>
                Fixie - Gray Only <br />
                <span className="location">Yogyakarta</span>
              </h1>
              <p className="availability">Available</p>
              <p className="prepayment">No prepayment</p>
              <p className="vehicle-desc">
                Capacity : 1 person <br />
                Type : Bike <br />
                Reservation before 2 PM
              </p>
              <p className="price mb-0 text-lg-end">Rp. 78.000/day</p>
            </div>
            <div className="counter mt-5 mt-md-0 d-lg-flex justify-content-start">
              <div className="d-flex justify-content-around align-items-center w-100">
                <button className="qty-control btn plus">
                  <i className="fa-solid fa-plus"></i></button
                ><span className="qty-number">2</span>
                <button className="qty-control btn minus">
                  <i className="fa-solid fa-minus"></i>
                </button>
              </div>
            </div>
            <div
              className="action-group mt-5 mt-md-0 d-flex flex-column flex-md-row justify-content-between"
            >
              <button className="btn chat mb-3 mb-md-0">Chat Admin</button>
              <a href="/reservation.html" className="reservation btn mb-3 mb-md-0"
                >Reservation</a
              >
              <button className="btn like">
                <i className="heart-icon fa-solid fa-heart me-1"></i> <span>Like</span>
              </button>
            </div>
          </div>
        </main>
      </Layout>
    )
  }
}
