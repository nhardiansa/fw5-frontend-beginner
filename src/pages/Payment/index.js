/* eslint-disable multiline-ternary */
import Layout from "../../components/Layout";
import { FaChevronLeft } from "react-icons/fa";
import Button from "../../components/Button";

import "./style.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { priceFormat, queryFormat } from "../../helpers/stringFormat";
import Spinner from "../../components/Spinner";
import {
  clearVehicleDetails,
  clearVehiclePayment,
  finishPayment,
  getVehicleDetails,
} from "../../redux/actions/vehicle";
// import { useNavigate } from 'react-router-dom';

export default function Payment() {
  // const navigate = useNavigate();
  const { vehicleReducer, user, auth } = useSelector((state) => state);
  const { token } = auth.user;
  const dispatch = useDispatch();
  const {
    paymentData,
    vehicleDetails,
    paymentFinishSuccess,
    returningVehicleSuccess,
  } = vehicleReducer;
  const { profile } = user;

  useEffect(() => {
    if (!paymentData) {
      window.history.back();
    }

    if (!vehicleDetails && paymentData) {
      dispatch(getVehicleDetails(paymentData.vehicle_id));
    }

    return () => {
      if (paymentFinishSuccess && returningVehicleSuccess) {
        clearData();
      }
    };
  }, [paymentData]);

  const clearData = () => {
    dispatch(clearVehiclePayment());
    dispatch(clearVehicleDetails());
  };

  const onClick = () => {
    window.history.back();
  };

  const finishPaymentHanlder = () => {
    console.log("finish payment");
    dispatch(finishPayment(Number(paymentData.id), token));
  };

  // const returnVehicleHandler = () => {
  //   console.log("return vehicle");
  //   dispatch(returnVehicle(Number(paymentData.id), token));
  // };

  const pageDisplay = (paymentData, vehicleData, userData) => {
    const {
      payment_code: paymentCode,
      qty: vehicleQty,
      start_rent: startRent,
      total_paid: totalToPay,
      payment: paymentStatus,
      returned: returnedStatus,
    } = paymentData;
    const {
      image: vehicleImage,
      name: vehicleName,
      location: vehicleLocation,
      category_name: vehicleCategory,
      price: vehiclePrice,
    } = vehicleData;
    const { name: userName, email: userEmail, phone: userPhone } = userData;

    const image =
      vehicleImage ||
      `https://via.placeholder.com/500x335?text=${queryFormat(name)}`;

    return (
      <div className="payment-wrapper text-center text-md-start">
        <div className="back-btn mb-5">
          <div
            onClick={onClick}
            className="link-dark fw-bold fs-1 d-flex align-items-center"
          >
            <FaChevronLeft className="back-icon fs-1" />
            Payment
          </div>
        </div>
        <div className="vehicle-img">
          <img src={image} alt="example" className="img-product" />
        </div>
        <div className="invoice-head d-flex flex-column justify-content-between align-items-center align-items-md-start">
          <h1 className="invoice-vehicle-name fs-1 lh-base text-capitalize">
            {vehicleName} <br />
            <span className="location fs-2 text-capitalize">
              {vehicleLocation}
            </span>
          </h1>
          <p className="prepayment my-3 fw-bold">No prepayment</p>
          <p className="booking-code my-2">{paymentCode}</p>
          <Button className="px-4 fw-bold rounded-pill fs-6">
            Copy booking code
          </Button>
        </div>
        <div className="qty-detail">
          <p className="qty-text text-center">
            Quantity : {vehicleQty} {vehicleCategory}
          </p>
        </div>
        <div className="reservation-date d-flex justify-content-around align-items-center">
          <p className="reservation-title">Reservation Date :</p>
          <p className="reservation-text fw-normal">{startRent}</p>
        </div>
        <div className="order-details ps-md-5 py-4 py-lg-5">
          <p className="order-title">Order details :</p>
          <p className="order-text fw-normal mt-2">
            {vehicleQty} {vehicleCategory} : Rp. {priceFormat(vehiclePrice)}
          </p>
          <p className="order-total fw-bold mt-4">
            Total : {priceFormat(totalToPay)}
          </p>
        </div>
        <div className="identity d-flex flex-column justify-content-center py-4">
          <p className="identity-title">Identity :</p>
          <p className="user-data fw-normal">
            {userName || "unknown"} {userPhone || ""} <br />
            {userEmail}
          </p>
        </div>
        <div className="payment-method d-md-flex align-items-center">
          <p className="payment-title fw-bold">Payment code :</p>
          <div className="payment-code-copy d-flex align-items-center justify-content-evenly justify-content-md-between py-3">
            <p className="payment-code fw-bold fs-5">{paymentCode}</p>
            <Button className="px-4" variant="secondaryBtn">
              Copy
            </Button>
          </div>
          <select
            className="payment-method-select form-select h-100 py-3 fw-bold text-secondary"
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
        {!Number(paymentStatus) ? (
          <Button
            onClick={finishPaymentHanlder}
            className="payment-action py-3 py-md-4 fs-5 mt-2 mt-md-4 w-100"
            variant="secondaryBtn"
          >
            Finish payment :
            <span className="payment-time-limit text-danger">59:30</span>
          </Button>
        ) : (
          <></>
        )}
        {/* {Number(paymentStatus) && !Number(returnedStatus) ? (
          <Button
            onClick={returnVehicleHandler}
            className="payment-action py-3 py-md-4 fs-5 mt-2 mt-md-4 w-100"
            variant="secondaryBtn"
          >
            Return vehicle
          </Button>
        ) : (
          <></>
        )} */}
        <div className="payment-action py-3 py-md-4 mt-2 mt-md-4 w-100">
          {Number(paymentStatus) ? (
            <>
              {!Number(returnedStatus) ? (
                <h2 className="text-center fs-1 fw-bolder text-danger">
                  Vehicle not returned yet
                </h2>
              ) : (
                <h2 className="text-center fs-1 fw-bolder text-success">
                  Vehicle returned
                </h2>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <main
        className={`${
          paymentData && vehicleDetails && profile
            ? ""
            : "d-flex justify-content-center align-items-center vh-100"
        } payment container px-4 border-0`}
      >
        {paymentData && vehicleDetails && profile ? (
          pageDisplay(paymentData, vehicleDetails, profile)
        ) : (
          <Spinner
            variant="primary"
            style={{ width: "6rem", height: "6rem" }}
          />
        )}
      </main>
    </Layout>
  );
}
