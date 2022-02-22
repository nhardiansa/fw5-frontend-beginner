import React, { Component } from 'react'
import {FaChevronDown} from 'react-icons/fa'
import {HiSearch} from 'react-icons/hi'

import Footer from '../../components/Footer/Footer'
import NavbarLogged from '../../components/NavbarLogged'

import vespa from '../../assets/img/motorbike/vespa.png'
import './style.css'
import VehicleImage from '../../components/VehicleImage/VehicleImage'

export default class History extends Component {
  render() {
    const newArrivals = [
      {
        src: vespa,
        name: 'Lamborghini',
        location: 'Yogyakarta',
      },
      {
        src: vespa,
        name: 'White Jeep',
        location: 'Kalimantan',
      }
    ]
    return (
      <>
        <NavbarLogged />

        <main>
          <div class="history-wrapper container d-lg-grid">
            <div class="search-filter">
              <form class="d-flex">
                <div class="search-field d-flex me-3">
                  <input
                    type="text"
                    class="search-input form-control"
                    placeholder="Search history"
                    aria-label="Search history"
                    aria-describedby="button-addon2"
                  />
                  <button class="search-btn btn" type="button" id="button-addon2">
                    {/* <i class="fa-solid fa-magnifying-glass"></i> */}
                    <HiSearch className='search-icon' />
                  </button>
                </div>
                <div class="select-input flex-fill position-relative">
                  <select
                    class="select-field form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Filter</option>
                    <option value="Type">Type</option>
                    <option value="Date Added">Date Added</option>
                    <option value="Name">Name</option>
                    <option value="Favorite Product">Favorite Product</option>
                  </select>
                  <FaChevronDown className="dropdown-icon position-absolute" />
                </div>
              </form>
            </div>
            <div class="today-list-nav mt-5 mt-lg-0">
              <h2 class="today-title mt-lg-4 mb-4">Today</h2>
              <ul class="link-list list-group">
                <li
                  class="link-list-item list-group-item d-flex align-items-center justify-content-between pb-3"
                >
                  <a class="link-nav" href="/"
                    >Please finish your payment for vespa for Vespa Rental Jogja</a
                  >
                  <i class="link-nav-icon fa-solid fa-chevron-right ms-5"></i>
                </li>
                <li
                  class="link-list-item list-group-item d-flex align-items-center justify-content-between pb-3"
                >
                  <a class="link-nav" href="/">Your payment has been confirmed!</a>
                  <i class="link-nav-icon fa-solid fa-chevron-right ms-5"></i>
                </li>
              </ul>
            </div>
            <div class="a-week-ago mt-5 mt-lg-0">
              <h2 class="a-week-ago-title mb-4">A week ago</h2>
              <div
                class="history-item mb-4 d-flex align-items-center justify-content-between"
              >
                <div class="desc-wrapper d-flex align-items-center">
                  <img
                    src={vespa}
                    alt="vespa"
                    class="vehicle-image me-4 me-md-5"
                  />
                  <div class="history-item-desc">
                    <h3 class="vehicle-name">Vespa Matic</h3>
                    <p class="booking-date">Jan 18 to 21 2021</p>
                    <p class="prepayment">Prepayment : Rp. 245.000</p>
                    <p class="return-status">Has been returned</p>
                  </div>
                </div>
                <button class="delete-history-btn btn d-none ms-5">Delete</button>
              </div>
              <div
                class="history-item mb-4 d-flex align-items-center justify-content-between"
              >
                <div class="desc-wrapper d-flex align-items-center w-100">
                  <img
                    src={vespa}
                    alt="vespa"
                    class="vehicle-image me-4 me-md-5"
                  />
                  <div class="history-item-desc">
                    <h3 class="vehicle-name">Vespa Matic</h3>
                    <p class="booking-date">Jan 18 to 21 2021</p>
                    <p class="prepayment">Prepayment : Rp. 245.000</p>
                    <p class="return-status">Has been returned</p>
                  </div>
                </div>
                <button class="delete-history-btn btn d-none ms-5">Delete</button>
              </div>
            </div>
            <div
              class="new-arrival d-none d-lg-flex flex-column align-items-center"
            >
              <h2 class="new-arrival-title mb-5">New Arrival</h2>
              {newArrivals.map((item, index) => (
                <VehicleImage key={index} src={item.src} name={item.name} location={item.location} className='mb-5' />
              ))}
              
              <a
                href="/vehicle-type.html"
                class="view-more-link d-flex flex-column align-items-center"
              >
                View more 
                <FaChevronDown className='view-more-icon mt-3' />
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </>
    )
  }
}
