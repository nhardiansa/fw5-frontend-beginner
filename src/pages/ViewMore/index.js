import React, { Component } from 'react'

import VehicleImage from '../../components/VehicleImage/VehicleImage'

import pict from '../../assets/img/popular/eric-muhr.png'
import Layout from '../../components/Layout'

import './style.css'

export default class ViewMore extends Component {
  render() {
    return (
      <Layout isLogged={true}>
        <main>
          <div className="view-more-wrapper container">
            <h1 className="view-more-title text-center text-md-start">Popular in town</h1>
            <p className="click-suggestion mt-4 text-center fw-bold">
              Click item to see details and reservation
            </p>
            <div
              className="view-more-container mt-5 d-flex flex-column align-items-center flex-md-row flex-wrap"
            >
              {
                [...Array(12).fill(1)].map((el, i) => (
                  <VehicleImage
                    key={i}
                    src={pict}
                    name='Merapi'
                    location='Yogyakarta'
                    className='view-more-item h-75 p-0 me-md-3 col-12 col-md'
                  />
                  // <a key={i} href="/vehicle-detail.html" className="view-more-item mb-4 me-md-4 position-relative">
                  //   <img
                  //     src={pict}
                  //     alt="white-jeep"
                  //     className="item-img w-100"
                  //   />
                  //   <div className="item-desc position-absolute">
                  //     <p className="item-name fw-bold">Merapi</p>
                  //     <p className="item-location">Yogyakarta</p>
                  //   </div>
                  // </a>
                ))
              }
            </div>
            <p className="no-items mt-5 text-center">There is no vehicle left</p>
          </div>
        </main>
      </Layout>
    )
  }
}
