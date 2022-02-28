import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import constants from '../../config/constants'
import {capitalize} from '../../helpers/stringFormat'
import Layout from '../../components/Layout'
import VehicleImage from '../../components/VehicleImage/VehicleImage'

import './style.css'

export const VehicleType = () => {
  const {baseURL} = constants
  const [popular, setPopular] = useState([])
  const [motorbike, setMotorbike] = useState([])
  const [car, setCar] = useState([])
  const [bike, setBike] = useState([])

  useEffect(() => {
    getVehicle('/vehicles/popular?limit=4', setPopular)
    getVehicle('/vehicles/filter?limit=4&category_id=3', setMotorbike)
    getVehicle('/vehicles/filter?limit=4&category_id=2', setCar)
    getVehicle('/vehicles/filter?limit=4&category_id=4', setBike)
    console.log('getVehicle');
  },[])

  const getVehicle = async (uri, stateReducer) => {
    try {
      const {data} = await axios.get(`${baseURL}${uri}`)
      stateReducer(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout isLogged={true}>
      <main className="container px-lg-4 px-5">
        {/* <!-- Popular in town --> */}
        <section className="popular vehicle-list">
          <div
            className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
          >
            <h2>Popular in town</h2>
            <Link to='more?popular=1' className="d-md-block d-none"
              >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
            ></Link>
          </div>
          <div
            className="popular-vehicles row justify-content-center justify-content-md-start"
          >
            {
              popular.map((el, i) => {
                const img = el.image || 'https://via.placeholder.com/261x333?text=Popular+in+town'
                return(
                  <VehicleImage
                    to={`/vehicles/${el.id}`}
                    key={i}
                    src={img}
                    name={capitalize(el.name)}
                    location={capitalize(el.location)}
                    className='p-0 pe-md-4 col-12 col-md-3'
                  />
                )
              })
            }
          </div>
          <Link to='more?popular=1' className="d-block d-md-none text-center mt-4" href="/"
            >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
          ></Link>
        </section>

        {/* <!-- Cars --> */}
        <section className="cars vehicle-list">
          <div
            className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
          >
            <h2>Cars</h2>
            <Link to='more?category_id=2' className="d-md-block d-none" href="/"
              >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
            ></Link>
          </div>
          <div
            className="popular-vehicles row justify-content-center justify-content-md-start"
          >
            {
              car.map((el, i) => {
                const img = el.image || 'https://via.placeholder.com/261x333?text=Cars'
                return(
                  <VehicleImage
                    to={`/vehicles/${el.id}`}
                    key={i}
                    src={img}
                    name={capitalize(el.name)}
                    location={capitalize(el.location)}
                    className='p-0 pe-md-4 col-12 col-md-3'
                  />
                )
              })
            }
          </div>
          <Link to='more?category_id=2' className="d-block d-md-none text-center mt-4" href="/"
            >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
          ></Link>
        </section>

        {/* <!-- Motorbike --> */}
        <section className="motorbike vehicle-list">
          <div
            className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
          >
            <h2>Motorbike</h2>
            <Link to='more?category_id=3' className="d-md-block d-none" href="/"
              >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
            ></Link>
          </div>
          <div
            className="popular-vehicles row justify-content-center justify-content-md-start"
          >
            {
              motorbike.map((el, i) => {
                const img = el.image || 'https://via.placeholder.com/261?text=Motorbike'
                return(
                  <VehicleImage
                    to={`/vehicles/${el.id}`}
                    key={i}
                    src={img}
                    name={capitalize(el.name)}
                    location={capitalize(el.location)}
                    className='p-0 pe-md-4 col-12 col-md-3'
                  />
                )
              })
            }
          </div>
          <Link to='more?category_id=3' className="d-block d-md-none text-center mt-4" href="/"
            >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
          ></Link>
        </section>

        {/* <!-- Bike --> */}
        <section className="bike vehicle-list">
          <div
            className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
          >
            <h2>Bikes</h2>
            <Link to='more?category_id=4' className="d-md-block d-none" href="/"
              >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
            ></Link>
          </div>
          <div
            className="popular-vehicles row justify-content-center justify-content-md-start"
          >
            {
              bike.map((el, i) => {
                const img = el.image || 'https://via.placeholder.com/261x333?text=Bike'
                return(
                  <VehicleImage
                    to={`/vehicles/${el.id}`}
                    key={i}
                    src={img}
                    name={capitalize(el.name)}
                    location={capitalize(el.location)}
                    className='p-0 pe-md-4 col-12 col-md-3'
                  />
                )
              })
            }
          </div>
          <Link to='more?category_id=4' className="d-block d-md-none text-center mt-4" href="/"
            >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
          ></Link>
        </section>
      </main>
    </Layout>
  )
}