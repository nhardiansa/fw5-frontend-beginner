import React, { useEffect, useState } from 'react'
import {FaChevronDown, FaStar} from 'react-icons/fa'
import axios from 'axios';

import VehicleImage from '../../components/VehicleImage/VehicleImage';
import Layout from '../../components/Layout';

import testimonialImage from '../../assets/img/testimonial-user-pict/edward-newgate.png';
import navigationIcon from '../../assets/img/circle-chevron-arrow.svg'

import './style.css'


export const Home = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    if (popular.length === 0) {
      getVehicles('/vehicles/popular', setPopular);
    }
  }, [popular]);

  const getVehicles = async (uri, stateReducer) => {
    try {
      const {data} = await axios.get('http://localhost:5000' + uri)
      stateReducer(data.results.slice(0,4))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Layout>

      {/*=============== Jumbotron =============== */}
      <section className="jumbotron container-fluid pt-5">
        <div className="hero-content container">
          <h1>Explore and Travel</h1>
          <p>Vehicle Finder</p>
          <div className="aesthetic-line rounded"></div>
          <form className="vehicle-finder-form mt-5" action="#">
            <div className="row select-group">
              <div className="my-2 col-6 position-relative">
                <select
                  className="filter-input form-select"
                  aria-label="Default select example"
                >
                  <option defaultValue>Location</option>
                  <option defaultValue="1">One</option>
                  <option defaultValue="2">Two</option>
                  <option defaultValue="3">Three</option>
                </select>
                <FaChevronDown />
              </div>

              <div className="my-2 col-6 position-relative">
                <select
                  className="filter-input form-select"
                  aria-label="Default select example"
                >
                  <option defaultValue>Type</option>
                  <option defaultValue="1">One</option>
                  <option defaultValue="2">Two</option>
                  <option defaultValue="3">Three</option>
                </select>
                <FaChevronDown />
              </div>
              <div className="my-2 col-6 position-relative">
                <select
                  className="filter-input form-select"
                  aria-label="Default select example"
                >
                  <option defaultValue>Payment</option>
                  <option defaultValue="1">One</option>
                  <option defaultValue="2">Two</option>
                  <option defaultValue="3">Three</option>
                </select>
                <FaChevronDown />
              </div>
              <div className="my-2 col-6 position-relative">
                <select
                  className="filter-input form-select"
                  aria-label="Default select example"
                >
                  <option defaultValue>Date</option>
                  <option defaultValue="1">One</option>
                  <option defaultValue="2">Two</option>
                  <option defaultValue="3">Three</option>
                </select>
                <FaChevronDown />
              </div>
            </div>
            <button className="btn mt-4 search-btn">Explore</button>
          </form>
        </div>
      </section>

      {/*=============== Popular =============== */}
      <section className="popular container px-lg-4 px-5">
        <div
          className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
        >
          <h2>Popular in town</h2>
          <a className="d-md-block d-none" href="/vehicle-type.html"
            >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
          ></a>
        </div>
        <div
          className="popular-vehicles d-flex flex-column align-items-center flex-md-row row"
        >
          {popular.map((vehicle, idx) => (
            <VehicleImage
              to={`/vehicles/${vehicle.id}`}
              key={idx}
              src={vehicle.image || 'https://via.placeholder.com/300x200?text=Popular+Vehicle'}
              name={vehicle.name}
              location={vehicle.location}
              className='col p-0 me-md-3'
            />
          ))}
        </div>
        <a className="d-block d-md-none text-center mt-4" href="/"
          >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
        ></a>
      </section>

      {/*=============== Testimonials =============== */}
      <section className="testimonial container px-lg-4 px-5">
        <h2 className="text-center text-md-start">Testimonials</h2>
        <div className="testimonial-wrapper row flex-row-reverse">
          <div className="image-col col-12 col-md-6 d-flex justify-content-center">
            <div className="image-wrapper position-relative">
              <img
                className="user-image"
                src={testimonialImage}
                alt="testimonial user pict"
              />
              <div className="navigation position-absolute">
                <a className="link-light disabled" href="#">
                  <img
                    className="prev-image disabled"
                    src={navigationIcon}
                    alt="prev-user"
                  />
                </a>
                <a className="link-light" href="#">
                  <img
                    className="next-image"
                    src={navigationIcon}
                    alt="next-user"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="feedback-col col-12 col-md-6 mt-5 mt-md-0">
            <div className="feedback d-flex flex-column justify-content-center h-100">
              <div className="stars text-center text-md-start">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="desc text-center text-md-start">
                <p>
                  ”It was the right decision to rent vehicle here, I spent less
                  money and enjoy the trip. It was an amazing experience to have a
                  ride for wildlife trip!”
                </p>
              </div>
              <div className="user text-center text-md-start">
                <p className="name">Edward Newgate</p>
                <p className="occupation">Founder Circle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      </Layout>
    </>
  )
}
