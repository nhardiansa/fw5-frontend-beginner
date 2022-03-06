import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight, FaHeart, FaMinus, FaPlus } from 'react-icons/fa';

import Layout from '../../components/Layout';
import Button from '../../components/Button';

import './style.css';
import { priceFormat, queryFormat } from '../../helpers/stringFormat';
import { useDispatch, useSelector } from 'react-redux';
import { bookVehicle, bookVehicleDecreaseQty, bookVehicleIncreaseQty, clearBookedVehicle, makeVehicleReservation, saveVehicleDetails } from '../../redux/actions/vehicle';

export const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { vehicleReducer } = useSelector(state => state);
  const { bookedVehicle } = vehicleReducer;

  const [vehicle, setVehicle] = useState({});

  useEffect(() => {
    getVehicleData(id);
  }, [id]);

  useEffect(() => {
    if (vehicle.id) {
      dispatch(bookVehicle(vehicle));
    }
  }, [vehicle]);

  useEffect(() => {
    return () => {
      dispatch(clearBookedVehicle());
    };
  }, []);

  const getVehicleData = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/vehicles/${id}`);
      setVehicle(data.results);
    } catch (error) {
      console.error(error);
      setVehicle({});
    }
  };

  const increaseQtyHandler = () => {
    dispatch(bookVehicleIncreaseQty());
  };

  const decreaseQtyHandler = () => {
    if (bookedVehicle.qty > 1) {
      dispatch(bookVehicleDecreaseQty());
    }
  };

  const goToReservation = () => {
    if (bookedVehicle.qty > 0) {
      dispatch(saveVehicleDetails(vehicle));
      dispatch(makeVehicleReservation(bookedVehicle));
      navigate('/reservation');
    }
  };

  const pageDisplay = (data) => {
    const {
      name,
      location,
      qty,
      booked,
      capacity,
      prepayment,
      category_name: categoryName,
      price,
      image
    } = data;

    const vehicleImg = image || `https://via.placeholder.com/261x333?text=${queryFormat(name)}`;

    const capitalize = (str) => {
      return str.split(' ').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ');
    };

    const goBack = () => {
      window.history.back();
    };

    const availability = qty - booked;
    return (
      <>
        <div className="back-section">
          {/* <Link to='/vehicles' className="back-btn d-flex align-items-center">
            <FaChevronLeft className="back-icon" />
            Detail
          </Link> */}
          <div onClick={goBack} className="back-btn d-flex align-items-center fs-2">
            <FaChevronLeft className="back-icon fs-1" />
            Detail
          </div>
        </div>
        <div className="detail-section w-100">
          <div className="banner">
            <img src={vehicleImg} className='w-100 h-100' alt="bike" />
          </div>
          <div
            className="image-slider mt-4 mt-md-0 d-flex justify-content-between align-items-center"
          >
            <button className="btn rounded-circle slide-control p-0 slide-next">
              <FaChevronLeft className='fs-2' />
            </button>
            <div className="w-100 h-75 d-flex justify-content-evenly">
              <img src={vehicleImg} className='img-fluid h-100' alt="bike" />
              <img src={vehicleImg} className='img-fluid h-100' alt="bike" />
            </div>
            <button className="btn rounded-circle slide-control p-0 slide-prev">
              <FaChevronRight className='fs-2' />
            </button>
          </div>
          <div
            className="desc-price text-center text-md-start mt-4 mt-md-0 d-lg-flex flex-column justify-content-between"
          >
            <h1>
              {capitalize(name)} <br />
              <span className="location">{capitalize(location)}</span>
            </h1>
            {
              availability > 3 && <p className="availability">Available</p>
            }
            {
              availability < 1 && <p className="availability text-danger">Full Booked</p>
            }
            {
              (availability < 3 && availability > 0) && <p className="availability text-warning"> {availability} {capitalize(categoryName)} left </p>
            }
            {
              Number(prepayment) > 0 && <p className="prepayment text-success">Can prepayment</p>
            }
            {
              Number(prepayment) < 1 && <p className="prepayment text-danger">Can&apos;t prepayment</p>
            }

            <p className="vehicle-desc">
              Capacity : {capacity} person <br />
              Type : {capitalize(categoryName)} <br />
              Reservation before 2 PM
            </p>
            <p className="price mb-0 text-lg-end">Rp. {priceFormat(price * (bookedVehicle.qty || 1))}/day</p>
          </div>
          <div className="counter mt-5 mt-md-0 d-lg-flex justify-content-start">
            <div className="d-flex justify-content-around align-items-center w-100 h-100">
              <Button onClick={decreaseQtyHandler} className="qty-control minus">
                <FaMinus className='fs-2' />
              </Button>
              <span className="qty-number fs-1">{bookedVehicle.qty || 0}</span>
              <Button onClick={increaseQtyHandler} className="qty-control plus">
                <FaPlus className='fs-2' />
              </Button>
            </div>
          </div>
          <div className="action-group mt-5 mt-md-0 d-flex flex-column flex-md-row justify-content-between">
            <Button className="mb-3 mb-md-0">Chat Admin</Button>

            <Button onClick={goToReservation} className={`${availability ? '' : 'disabled'} reservation btn mb-3 mb-md-0 mx-md-5`}>
              Reservation
            </Button>
            <Button className="btn like d-flex justify-content-center align-items-center">
              <FaHeart className="heart-icon mb-1 me-2 me-lg-3" /> <span>Like</span>
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <Layout>
      <main className={`${bookedVehicle ? '' : 'd-flex justify-content-center align-items-center vh-100'} detail container mt-lg-4 px-4 px-md-5 px-lg-0`}>
        {
          (Object.keys(vehicle).length && bookedVehicle)
            ? pageDisplay(vehicle)
            : <div className="spinner-border text-custom-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
        }
      </main>
    </Layout>
  );
};
