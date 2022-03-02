import { Component } from 'react';
import { FaChevronLeft, FaMinus, FaPlus } from 'react-icons/fa';

import Layout from '../../components/Layout';
import Button from '../../components/Button';

import vehicle from '../../assets/img/bike/image-banner.png';
import './style.css';

export default class Reservation extends Component {
  focusHandler = (e) => {
    // e.target.type = 'date'
  };

  blurHandler = (e) => {
    // e.target.type = 'text'
  };

  goBack = () => {
    window.history.back();
  };

  render () {
    return (
      <Layout isLogged={true}>
        <main className="reservation-wrapper container px-4 px-lg-0">
          <div className="back-section">
            <div
              onClick={this.goBack}
              className="back-btn d-flex fs-2 align-items-center"
            >
              <FaChevronLeft className="back-icon" />
              Reservartion
            </div>
          </div>
          <div className="row justify-content-center m-0 mt-4 p-0 w-100 mt-5">
            <div className="row p-0 justify-content-center justify-content-md-between">
              <div className="image-wrapper col-12 col-md-8 p-0">
                <img className="img-fluid w-100 h-100"
                  src={vehicle}
                  alt="bike"
                />
              </div>
              <div className="col-12 col-md-4 row px-0 ps-md-4">
                <div className="mt-4">
                  <h1 className='fw-bold text-center text-md-start fs-1'>
                    Fixie - Gray Only <br />
                    <span className="fw-normal fs-2">Yogyakarta</span>
                  </h1>
                  <p className="text-center text-md-start text-danger fw-bold fs-5 mt-lg-4">No prepayment</p>
                </div>
                <div className="counter d-flex justify-content-between align-items-center px-0 mt-4">
                  <Button className="py-3 minus px-md-4 fs-2" variant='secondaryBtn'>
                    <FaMinus />
                  </Button>
                    <span className="fs-1 fw-bold">2</span>
                  <Button className="plus py-3 px-md-4 fs-2">
                    <FaPlus />
                  </Button>
                </div>
                <div className="mt-4 p-0">
                  <h2 className="fs-5 fw-bold">Reservation Date :</h2>
                  <div className="">
                    <input
                      type="date"
                      name="start_date"
                      id="start-date"
                      className="w-100 px-3 mt-2 py-3 py-lg-4"
                      onFocus={this.focusHandler}
                      onBlur={this.blurHandler}
                      placeholder="Start Date"
                    />
                    <div className="position-relative mt-3">
                      <select
                        className="form-select py-3 py-lg-4 ps-3"
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
              </div>
            </div>
            <Button className='py-3 py-lg-4 mt-4 fs-5'>Pay now : Rp. 178.000</Button>
          </div>
        </main>
      </Layout>
    );
  }
}
