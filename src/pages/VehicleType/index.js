import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'

import VehicleImage from '../../components/VehicleImage/VehicleImage'
import pict from '../../assets/img/popular/eric-muhr.png'
import './style.css'

export const VehicleType = () => {
  const [popular, setPopular] = useState([])
  const [motorBike, setMotorBike] = useState([])
  const [car, setCar] = useState([])
  const [bike, setBike] = useState([])

  useEffect(() => {
    getVehicle('/vehicles/popular', setPopular)
    getVehicle('/vehicles/filter?limit=4&category_id=3', setMotorBike)
    getVehicle('/vehicles/filter?limit=4&category_id=2', setCar)
    getVehicle('/vehicles/filter?limit=4&category_id=4', setBike)
    console.log('getVehicle');
  },[])

  const getVehicle = async (uri, stateReducer) => {
    try {
      const {data} = await axios.get('http://localhost:5000' + uri)
      stateReducer(data.results.slice(0,4))
      // console.log(data.results);
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
            <a className="d-md-block d-none" href="/"
              >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
            ></a>
          </div>
          <div
            className="popular-vehicles row justify-content-center justify-content-md-start"
          >
            {
              popular.map((el, i) => {
                const img = el.images || 'https://via.placeholder.com/261x333?text=Popular+in+town'
                return(
                  <VehicleImage
                    to={`/vehicles/${el.id}`}
                    key={i}
                    src={img}
                    name={el.name}
                    location={el.location}
                    className='image-wrapper p-0 me-md-3 col-12 col-md'
                  />
                )
              })
            }
          </div>
          <a className="d-block d-md-none text-center mt-4" href="/"
            >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
          ></a>
        </section>

        {/* <!-- Cars --> */}
        <section className="cars vehicle-list">
          <div
            className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
          >
            <h2>Cars</h2>
            <a className="d-md-block d-none" href="/"
              >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
            ></a>
          </div>
          <div
            className="popular-vehicles row justify-content-center justify-content-md-start"
          >
            {
              car.map((el, i) => {
                const img = el.images || 'https://via.placeholder.com/261x333?text=Popular+in+town'
                return(
                  <VehicleImage
                    to={`/vehicles/${el.id}`}
                    key={i}
                    src={img}
                    name={el.name}
                    location={el.location}
                    className='image-wrapper p-0 me-md-3 col-12 col-md'
                  />
                )
              })
            }
          </div>
          <a className="d-block d-md-none text-center mt-4" href="/"
            >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
          ></a>
        </section>

        {/* <!-- Motorbike --> */}
        <section className="motorbike vehicle-list">
          <div
            className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
          >
            <h2>Motorbike</h2>
            <a className="d-md-block d-none" href="/"
              >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
            ></a>
          </div>
          <div
            className="popular-vehicles row justify-content-center justify-content-md-start"
          >
            {
              motorBike.map((el, i) => {
                const img = el.images || 'https://via.placeholder.com/261?text=Popular+in+town'
                return(
                  <VehicleImage
                    to={`/vehicles/${el.id}`}
                    key={i}
                    src={img}
                    name={el.name}
                    location={el.location}
                    className='image-wrapper p-0 me-md-3 col-12 col-md'
                  />
                )
              })
            }
          </div>
          <a className="d-block d-md-none text-center mt-4" href="/"
            >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
          ></a>
        </section>

        {/* <!-- Bike --> */}
        <section className="bike vehicle-list">
          <div
            className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
          >
            <h2>Bikes</h2>
            <a className="d-md-block d-none" href="/"
              >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
            ></a>
          </div>
          <div
            className="popular-vehicles row justify-content-center justify-content-md-start"
          >
            {
              bike.map((el, i) => {
                const img = el.images || 'https://via.placeholder.com/261x333?text=Popular+in+town'
                return(
                  <VehicleImage
                    to={`/vehicles/${el.id}`}
                    key={i}
                    src={img}
                    name={el.name}
                    location={el.location}
                    className='image-wrapper p-0 me-md-3 col-12 col-md'
                  />
                )
              })
            }
          </div>
          <a className="d-block d-md-none text-center mt-4" href="/"
            >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
          ></a>
        </section>
      </main>
    </Layout>
  )
}