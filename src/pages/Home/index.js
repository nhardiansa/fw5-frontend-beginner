import { useEffect, useState } from 'react';
import { FaChevronDown, FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import VehicleImage from '../../components/VehicleImage/VehicleImage';
import Layout from '../../components/Layout';
import { capitalize } from '../../helpers/stringFormat';

import testimonialImage from '../../assets/img/testimonial-user-pict/edward-newgate.png';
import navigationIcon from '../../assets/img/circle-chevron-arrow.svg';

import './style.css';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { changeDataToSearchVehicle, searchVehicle } from '../../redux/actions/vehicle';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectData, vehicleReducer } = useSelector(state => state);
  const { dataToSearchVehicle, listVehiclesOfEveryTypes } = vehicleReducer;

  const [types, setTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (types.length === 0) {
      setTypes(selectData.types);
    }

    if (locations.length === 0) {
      setLocations(selectData.locations);
    }
  }, [selectData]);

  const selectHandler = (e) => {
    const { name, value } = e.target;
    const selectedElement = e.target.querySelector(`option[value="${value}"]`);
    if (selectedElement === null) {
      dispatch(changeDataToSearchVehicle({
        ...dataToSearchVehicle,
        [name]: ''
      }));
    } else {
      dispatch(changeDataToSearchVehicle({
        ...dataToSearchVehicle,
        [name]: value
      }));
    }
  };

  const goToFilterPage = (e) => {
    e.preventDefault();

    const dataToSearchLength = Object.keys(dataToSearchVehicle).length;
    if (dataToSearchLength) {
      dispatch(searchVehicle(dataToSearchVehicle));
      navigate('/search');
    }
  };

  const displayPopular = (popular) => {
    return (
      <div className="popular-vehicles row">
        {
          popular.map((vehicle, idx) => (
            <VehicleImage
              to={`/vehicles/${vehicle.id}`}
              key={idx}
              src={vehicle.image || 'https://via.placeholder.com/300x200?text=Popular+Vehicle'}
              name={capitalize(vehicle.name)}
              location={capitalize(vehicle.location)}
              className='p-0 pe-md-4 col-12 col-md-3'
            />
          ))
        }
      </div>
    );
  };

  return (
    <>
      <Layout>

      {/* =============== Jumbotron =============== */}
      <section className="jumbotron container-fluid pt-5">
        <div className="hero-content container">
          <h1>Explore and Travel</h1>
          <p>Vehicle Finder</p>
          <div className="aesthetic-line rounded"></div>
          <form onSubmit={goToFilterPage} className="vehicle-finder-form mt-5" action="#">
            {
              !selectData.isLoading &&
              <>
                <div className="row select-group">
                  <div className="my-2 col-6 position-relative">
                    <select
                      className="filter-input form-select"
                      aria-label="Default select example"
                      name='location'
                      onChange={selectHandler}
                    >
                      <option id='default-opt' defaultValue>Location</option>
                      {
                        locations.length > 0
                          ? locations.map((data, idx) => (
                          <option key={idx} value={data.location}>{capitalize(data.location)}</option>
                          ))
                          : <option defaultValue>Location not found</option>
                      }
                    </select>
                    <FaChevronDown />
                  </div>

                  <div className="my-2 col-6 position-relative">
                    <select
                      className="filter-input form-select"
                      aria-label="Default select example"
                      name='category_id'
                      onChange={selectHandler}
                    >
                      <option defaultValue>Type</option>
                      {
                        types.length > 0
                          ? types.map((category, idx) => (
                          <option key={idx} value={category.id}>{capitalize(category.name)}</option>
                          ))
                          : <option defaultValue>Types not found</option>
                      }
                    </select>
                    <FaChevronDown />
                  </div>
                  <div className="my-2 col-6 position-relative">
                    <select
                      className="filter-input form-select"
                      aria-label="Default select example"
                      name='prepayment'
                      onChange={selectHandler}
                    >
                      <option defaultValue>Payment</option>
                      <option value={0}>Cash only</option>
                      <option value={1}>Has prepayment</option>
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
                <Button type='submit' className='mt-4 px-4 py-2'>Explore</Button>
              </>
            }
            {
              selectData.isLoading &&
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            }
          </form>
        </div>
      </section>

      {/* =============== Popular =============== */}
      <section className="popular container px-lg-4 px-5">
        <div className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
        >
          <h2>Popular in town</h2>
          <Link to='/vehicles/more/popular' className="d-md-block d-none" href="/vehicle-type.html"
            >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
          ></Link>
        </div>
        { listVehiclesOfEveryTypes.length > 0
          ? displayPopular(listVehiclesOfEveryTypes[0])
          : <Skeleton
              count={4}
              height={250}
              containerClassName='popular-vehicles row h-100'
              wrapper={({ children }) => (<div className='mb-3 m-md-0 pe-md-4 col-12 col-md-3'>{children}</div>)}
            />
        }
        <Link to='/vehicles/more/popular' className="d-block d-md-none text-center mt-4" href="/"
          >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
        ></Link>
      </section>

      {/* =============== Testimonials =============== */}
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
                <a className="link-light disabled" href="/">
                  <img
                    className="prev-image disabled"
                    src={navigationIcon}
                    alt="prev-user"
                  />
                </a>
                <a className="link-light" href="/">
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
  );
};
