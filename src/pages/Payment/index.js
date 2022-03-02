import Layout from '../../components/Layout';
import { FaChevronLeft } from 'react-icons/fa';
import { connect } from 'react-redux';

import vehiclePict from '../../assets/img/bike/image-banner.png';
import './style.css';
import { useEffect } from 'react';

const mapStateToProps = state => ({ counter: state.counter });

export const Payment = ({ counter }) => {
  useEffect(() => {
    console.log(counter);
  }, []);

  const onClick = () => {
    window.history.back();
  };

  return (
    <Layout isLogged={true}>
      <main className="container">
        <div className="payment-wrapper text-center text-md-start">
          <div className="back-btn mb-5">
            <div
              onClick={onClick}
              className="back-link link-dark d-flex align-items-center"
            >
              <FaChevronLeft className="back-icon" />
              Payment
            </div>
          </div>
          <div className="vehicle-img">
            <img
              src={vehiclePict}
              alt="example"
              className="img-product"
            />
          </div>
          <div
            className="invoice-head d-flex flex-column justify-content-between align-items-center align-items-md-start"
          >
            <h1 className="invoice-vehicle-name">
              Fixie - Gray Only <br />
              <span className="location">Yogyakarta</span>
            </h1>
            <p className="prepayment mb-3">No prepayment</p>
            <p className="booking-code mb-2">#FG1209878YZS</p>
            <button className="copy-btn btn">Copy booking code</button>
          </div>
          <div className="qty-detail">
            <p className="qty-text text-center">Quantity : {counter.value} bikes</p>
          </div>
          <div
            className="reservation-date d-flex justify-content-around align-items-center"
          >
            <p className="reservation-title">Reservation Date :</p>
            <p className="reservation-text fw-normal">Jan 18 - 20 2021</p>
          </div>
          <div className="order-details">
            <p className="order-title">Order details :</p>
            <p className="order-text fw-normal mt-2">1 bike : Rp. 78.000</p>
            <p className="order-text fw-normal">1 bike : Rp. 78.000</p>
            <p className="order-total fw-bold mt-4">Total : 178.000</p>
          </div>
          <div className="identity d-flex flex-column justify-content-center">
            <p className="identity-title">Identity :</p>
            <p className="user-data fw-normal">
              Samantha Doe (+6290987682) <br />
              samanthadoe@mail.com
            </p>
          </div>
          <div className="payment-method d-md-flex align-items-center">
            <p className="payment-title fw-bold">Payment code :</p>
            <div
              className="payment-code-copy d-flex align-items-center justify-content-evenly justify-content-md-between"
            >
              <p className="payment-code fw-bold">#FG1209878YZS</p>
              <button className="payment-code-copy-btn btn">Copy</button>
            </div>
            <select
              className="payment-method-select form-select"
              aria-label="Default select example"
            >
              <option defaultValue>
                {/* <span className="placeholder-select">Select payment methods</span> */}
                Select payment methods
              </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <button className="payment-action btn">
            Finish payment :
            <span className="payment-time-limit text-danger">59:30</span>
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default connect(mapStateToProps)(Payment);
