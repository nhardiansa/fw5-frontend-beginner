import { FaChevronLeft, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../../components/Layout';
import Button from '../../components/Button';

import './style.css';
import { useEffect, useState } from 'react';
import { clearVehicleDetails, clearVehicleReservation, makeVehiclePayment, reservationQtyDecrease, reservationQtyIncrease } from '../../redux/actions/vehicle';
import { capitalize, dateFormatter, priceFormat, queryFormat } from '../../helpers/stringFormat';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';

export const Reservation = () => {
  const navigate = useNavigate();
  const { vehicleReducer } = useSelector(state => state);
  const { reservationData, vehicleDetails, paymentLoading, paymentError, paymentData } = vehicleReducer;
  const dispatch = useDispatch();

  const [countDay, setCountDay] = useState(1);
  const [dateRent, setDateRent] = useState('');
  const [errorCountDay, setErrorCountDay] = useState('');
  const [errorDate, setErrorDate] = useState('');

  useEffect(() => {
    if (!vehicleDetails || !reservationData) {
      console.log('data null');
      navigate('/vehicles');
    }

    setDateRent(dateFormatter(new Date()));
    return () => {
      clearData();
    };
  }, []);

  useEffect(() => {
    if (paymentData) {
      navigate('/payment');
    }

    if (paymentError) {
      console.log('payment error');
      alert(paymentError);
    }
  }, [paymentLoading]);

  const goBack = () => {
    window.history.back();
  };

  const clearData = () => {
    dispatch(clearVehicleDetails());
    dispatch(clearVehicleReservation());
  };

  const handleDecrease = () => {
    dispatch(reservationQtyDecrease());
  };

  const handleIncrease = () => {
    dispatch(reservationQtyIncrease());
  };

  const countDayHandler = (e) => {
    if (!(e.target.type === 'number')) {
      return 0;
    }

    if (e.target.value < 1) {
      setCountDay(1);
      return 0;
    }

    if (e.target.value >= 1 && e.target.value <= 30) {
      setErrorCountDay('');
    } else {
      setErrorCountDay('Booking date must be between 1 - 30 days');
    }
    setCountDay(e.target.value);
  };

  const datePickerHandler = (e) => {
    if (e.target.type === 'date') {
      const startRent = new Date(e.target.value);
      const today = new Date();

      const checkNow = Math.ceil((startRent - today) / (1000 * 60 * 60 * 24));

      if (checkNow < 0) {
        setErrorDate('Booking date must be today or greater than today');
        return 0;
      }

      setErrorDate('');
      setDateRent(dateFormatter(e.target.value));
    }
  };

  const goToPaymentHandler = () => {
    const startRent = new Date(dateRent);
    const endRent = new Date(startRent.setDate(startRent.getDate() + Number(countDay)));
    const totalPayment = priceFormat((vehicleDetails.price * reservationData.qty) * countDay);

    if (errorCountDay || errorDate) {
      return 0;
    }

    const dataToSend = {
      vehicle_id: vehicleDetails.id,
      payment: 0,
      returned: 0,
      prepayment: 0,
      qty: reservationData.qty,
      start_rent: dateFormatter(dateRent),
      end_rent: dateFormatter(endRent)
    };
    console.log(dataToSend);

    const goToPaid = confirm(`If you click OK, you will be redirected to payment page.
    \n
    Vehicle: ${capitalize(vehicleDetails.name)}
    Total Payment: ${totalPayment}
    Start Rent: ${dateFormatter(dateRent)}
    End Rent: ${dateFormatter(endRent)}
    Total Day: ${countDay}
    Payment: not yet
    `
    );

    if (!goToPaid) {
      return 0;
    }

    dispatch(makeVehiclePayment(dataToSend));
  };

  const pageDisplay = (data) => {
    const {
      image,
      name,
      location,
      price
    } = data;
    const prepayment = Number(data.prepayment);
    const imgPlaceholder = `https://via.placeholder.com/261x333?text=${queryFormat(name)}`;
    return (
      <>
        <div className="back-section">
            <div
              onClick={goBack}
              className="back-btn d-flex fs-2 fw-bold align-items-center"
            >
              <FaChevronLeft className="back-icon" />
              Reservartion
            </div>
          </div>
          <div className="row justify-content-center m-0 mt-4 p-0 w-100 mt-5">
            <div className="row p-0 justify-content-center justify-content-md-between">
              <div className="image-wrapper col-12 col-md-8 p-0">
                <img className="img-fluid w-100 h-100"
                  src={image || imgPlaceholder}
                  alt="bike"
                />
              </div>
              <div className="col-12 col-md-4 row px-0 ps-md-4">
                <div className="mt-4">
                  <h1 className='fw-bold text-center text-md-start fs-1 text-capitalize'>
                    {(name)} <br />
                    <span className="fw-normal fs-2 text-capitalize">{(location)}</span>
                  </h1>
                  {
                    prepayment
                      ? <p className="text-center text-md-start text-success fw-bold fs-5 mt-lg-4 text-capitalize">Can prepayment</p>
                      : <p className="text-center text-md-start text-danger fw-bold fs-5 mt-lg-4">Can&apos;t prepayment</p>
                  }
                </div>
                <div className="counter d-flex justify-content-between align-items-center px-0 mt-4">
                  <Button onClick={handleDecrease} className="py-3 minus px-md-4 fs-2" variant='secondaryBtn'>
                    <FaMinus />
                  </Button>
                    <span className="fs-1 fw-black">{reservationData.qty}</span>
                  <Button onClick={handleIncrease} className="plus py-3 px-md-4 fs-2">
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
                      className="w-100 px-3 mt-2 py-3 py-lg-4 text-uppercase"
                      placeholder="Start Date"
                      onChange={datePickerHandler}
                      defaultValue={dateRent}
                    />
                    {
                      errorDate && <p className="text-danger my-2">{errorDate}</p>
                    }
                    <Input
                      type="number"
                      value={countDay}
                      onChange={countDayHandler}
                      name="count_day"
                      id="count-day"
                      className={'test w-100 px-3 mt-2 text-uppercase'}
                      placeholder="Count Day"
                    />
                    {
                      errorCountDay &&
                      <p className='text-danger mt-2'>{errorCountDay}</p>
                    }
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={goToPaymentHandler} className={`${errorCountDay || errorDate ? 'disabled' : ''} py-3 py-lg-4 mt-4 fs-5`}>
              {
                paymentLoading
                  ? <Spinner className='secondary' />
                  : `Pay now : Rp. ${priceFormat((price * reservationData.qty) * (errorCountDay ? 1 : countDay))}`
              }
            </Button>
          </div>
        </>
    );
  };

  return (
    <Layout isLogged={true}>
      <main className={`${reservationData && vehicleDetails ? '' : 'd-flex justify-content-center align-items-center vh-100'} reservation-wrapper container px-4 px-lg-0 mt-5 mt-md-3`}>
        {
          (reservationData && vehicleDetails)
            ? pageDisplay(vehicleDetails)
            : <div className="spinner-border text-custom-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
        }
      </main>
    </Layout>
  );
};
