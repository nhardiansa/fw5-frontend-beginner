import React, { Component } from 'react'
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedin, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import carWheel from '../../assets/img/car-wheel.png'
import './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="wrapper container px-5 px-lg-0">
          <div className="navigations d-flex flex-wrap">
            <div className="footer-nav destinations">
              <h3>Destinations</h3>
              <ul>
                <li><a href="#">Bali</a></li>
                <li><a href="#">Yogyakarta</a></li>
                <li><a href="#">Jakarta</a></li>
                <li><a href="#">Kalimantan</a></li>
                <li><a href="#">Malang</a></li>
              </ul>
            </div>
            <div className="footer-nav shop">
              <h3>Vehicle</h3>
              <ul>
                <li><a href="#">Bike</a></li>
                <li><a href="#">Cars</a></li>
                <li><a href="#">Motorbike</a></li>
                <li><a href="#">Return Times</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>
            </div>
            <div className="footer-nav interests">
              <h3>Interests</h3>
              <ul>
                <li><a href="#">Adventure Travel</a></li>
                <li><a href="#">Art And Culture</a></li>
                <li><a href="#">Wildlife And Nature</a></li>
                <li><a href="#">Family Holidays</a></li>
                <li><a href="#">Culinary Trip</a></li>
              </ul>
            </div>
          </div>
          <div className="ts text-center text-md-start">
            <img
              className="logo"
              src={carWheel}
              alt="vehicle rent logo"
            />
            <p className="copywriting">
              Plan and book your perfect trip with expert advice, travel tips for
              vehicle information from us
            </p>
            <p className="copyright">
              ©2020 Vehicle Rental Center. All rights reserved
            </p>
          </div>
        </div>
        <hr className="line-separator mx-auto rounded" />
        <div className="socmed d-flex justify-content-center">
          <FaTwitter />
          <FaFacebookF />
          <FaInstagram />
          <FaLinkedinIn />
          <FaYoutube />
        </div>
      </footer>
    )
  }
}
