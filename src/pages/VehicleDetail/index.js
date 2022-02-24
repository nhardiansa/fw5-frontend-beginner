import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {  FaChevronLeft, FaHeart, FaMinus, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import Layout from '../../components/Layout'

import pict from '../../assets/img/bike/image-banner.png'
import './style.css'
import { priceFormat, queryFormat } from '../../helpers/stringFormat'

export const VehicleDetail = () => {
  const {id} = useParams()
  const [vehicle, setVehicle] = useState({})

  useEffect(() => {
    getVehicleData(id)
  }, [id])

  const getVehicleData = async (id) => {
    try {
      const {data} = await axios.get(`http://localhost:5000/vehicles/${id}`)
      setVehicle(data.results)
    } catch (error) {
      console.error(error);
      setVehicle({})
    }
  }

  const detailDisplay = (data) => {
    const {
      name,
      location,
      qty,
      booked,
      capacity,
      prepayment,
      category_name,
      price,
      image
    } = data

    const vehicleImg = image || `https://via.placeholder.com/261x333?text=${queryFormat(name)}`

    const capitalize = (str) => {
      return str.split(' ').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
    }

    const availability = qty - booked
    return (
      <>
        <div className="back-section">
          <Link to='/vehicles' href="/vehicle-type.html" className="back-btn d-flex align-items-center">
            <FaChevronLeft className="back-icon" />
            Detail
          </Link>
        </div>
        <div className="detail-section w-100">
          <div className="banner">
            <img src={vehicleImg} alt="bike" />
          </div>
          <div
            className="image-slider mt-4 mt-md-0 d-flex justify-content-between align-items-center"
          >
            <button className="btn rounded-circle slide-control slide-next">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <img src={pict} alt="bike" />
            <img src={pict} alt="bike" />
            <button className="btn rounded-circle slide-control slide-prev">
              <i className="fa-solid fa-chevron-right"></i>
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
              (availability < 3 && availability > 0) && <p className="availability text-warning"> {availability} {capitalize(category_name)} left </p>
            }
            {
              Number(prepayment) > 0 && <p className="prepayment text-success">Has prepayment</p>
            }
            {
              Number(prepayment) < 1 && <p className="prepayment text-danger">No prepayment</p>
            }
            
            <p className="vehicle-desc">
              Capacity : {capacity} person <br />
              Type : {capitalize(category_name)} <br />
              Reservation before 2 PM
            </p>
            <p className="price mb-0 text-lg-end">Rp. {priceFormat(price)}/day</p>
          </div>
          <div className="counter mt-5 mt-md-0 d-lg-flex justify-content-start">
            <div className="d-flex justify-content-around align-items-center w-100">
              <button className="qty-control btn minus">
                <FaMinus />
              </button>
              <span className="qty-number">2</span>
              <button className="qty-control btn plus">
                <FaPlus />
              </button>
            </div>
          </div>
          <div
            className="action-group mt-5 mt-md-0 d-flex flex-column flex-md-row justify-content-between"
          >
            <button className="btn chat mb-3 mb-md-0">Chat Admin</button>
            <a href="/reservation.html" className="reservation btn mb-3 mb-md-0 mx-md-5"
              >Reservation</a
            >
            <button className="btn like d-flex justify-content-center align-items-center">
              <FaHeart className="heart-icon mb-1 me-2 me-lg-3" /> <span>Like</span>
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <Layout>
      <main className="container px-5 px-lg-0">
        {
          Object.keys(vehicle).length && detailDisplay(vehicle)
        }
      </main>
    </Layout>
  )
}
