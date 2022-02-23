import React, { Component } from 'react'
import Layout from '../../components/Layout'
import VehicleImage from '../../components/VehicleImage/VehicleImage'

import pict from '../../assets/img/popular/eric-muhr.png'
import './style.css'

export default class VehicleType extends Component {
  render() {
    return (
      <Layout isLogged={true}>
        <main className="container px-lg-4 px-5">
          {/* <!-- Popular in town --> */}
          <section className="popular vehicle-list">
            <div
              className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
            >
              <h2>Popular in town</h2>
              <a className="d-md-block d-none" href="/"
                >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
              ></a>
            </div>
            <div
              className="popular-vehicles d-flex flex-column align-items-center flex-md-row row"
            >
              {
                [...Array(4).fill(1)].map((el, i) => (
                <VehicleImage
                  key={i}
                  src={pict}
                  name='Merapi'
                  location='Yogyakarta'
                  className='image-wrapper h-75 p-0 me-md-3 col-12 col-md'
                />
                ))
              }
            </div>
            <a className="d-block d-md-none text-center mt-4" href="/"
              >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
            ></a>
          </section>

          {/* <!-- Cars --> */}
          <section className="cars vehicle-list">
            <div
              className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
            >
              <h2>Cars</h2>
              <a className="d-md-block d-none" href="/"
                >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
              ></a>
            </div>
            <div
              className="popular-vehicles d-flex flex-column align-items-center flex-md-row row"
            >
              {
                [...Array(4).fill(1)].map((el, i) => (
                <VehicleImage
                  key={i}
                  src={pict}
                  name='Merapi'
                  location='Yogyakarta'
                  className='image-wrapper h-75 p-0 me-md-3 col-12 col-md'
                />
                ))
              }
            </div>
            <a className="d-block d-md-none text-center mt-4" href="/"
              >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
            ></a>
          </section>

          {/* <!-- Motorbike --> */}
          <section className="motorbike vehicle-list">
            <div
              className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
            >
              <h2>Motorbike</h2>
              <a className="d-md-block d-none" href="/"
                >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
              ></a>
            </div>
            <div
              className="popular-vehicles d-flex flex-column align-items-center flex-md-row row"
            >
              {
                [...Array(4).fill(1)].map((el, i) => (
                <VehicleImage
                  key={i}
                  src={pict}
                  name='Merapi'
                  location='Yogyakarta'
                  className='image-wrapper h-75 p-0 me-md-3 col-12 col-md'
                />
                ))
              }
            </div>
            <a className="d-block d-md-none text-center mt-4" href="/"
              >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
            ></a>
          </section>

          {/* <!-- Bike --> */}
          <section className="bike vehicle-list">
            <div
              className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
            >
              <h2>Bikes</h2>
              <a className="d-md-block d-none" href="/"
                >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
              ></a>
            </div>
            <div
              className="popular-vehicles d-flex flex-column align-items-center flex-md-row row"
            >
              {
                [...Array(4).fill(1)].map((el, i) => (
                <VehicleImage
                  key={i}
                  src={pict}
                  name='Merapi'
                  location='Yogyakarta'
                  className='image-wrapper h-75 p-0 me-md-3 col-12 col-md'
                />
                ))
              }
            </div>
            <a className="d-block d-md-none text-center mt-4" href="/"
              >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
            ></a>
          </section>
        </main>
      </Layout>
    )
  }
}
