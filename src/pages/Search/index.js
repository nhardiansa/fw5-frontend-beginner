import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

import constants from '../../config/constants'
import Layout from '../../components/Layout'
import VehicleImage from '../../components/VehicleImage/VehicleImage';
import {capitalize} from '../../helpers/stringFormat'
import imgPlaceholder from '../../assets/img/placeholder.png';

import './style.css';

export default function Search() {
  const {baseURL} = constants
  const [searchParams, setSearchParams] = useSearchParams()
  const [pageInfo, setPageInfo] = useState({})
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    const queries = Object.fromEntries([...searchParams]);
    console.log(queries);
    getVehicles(queries)
  }, [searchParams])

  const getVehicles = async (queries, replace=true) => {
    try {
      let url

      if (replace) {
        url = generateEndpoint(queries)
      } else {
        url = pageInfo.nextPage
      }

      const {data} = await axios.get(url)
      setPageInfo(data.pageInfo)

      if (replace) {
        setVehicles(data.results)
      } else {
        setVehicles([
          ...vehicles,
          ...data.results
        ])
      }
    } catch (error) {
      console.error(error);
    }
  }

  const generateEndpoint = (query) => {
    let uri = baseURL + '/vehicles/filter?'
    const arr = []
    
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        if (query[key] !== '') {
          arr.push(`${key}=${query[key]}`)
        }
      }
    }

    return uri + arr.join('&')
  }

  return (
    <Layout>
      <main className={`container ${vehicles.length < 1 ? 'vh-100' : ''}`}>
        <h1 className='ps-lg-4 mt-lg-5 text-center text-lg-start fs-1'>Search results</h1>
        <div className="filter-bar container mt-4 mt-lg-5">
          <div className="row container mt-3 g-2">
            <div className="col-6 col-md">
              <select className="filter-input form-select" aria-label="Default select example">
                <option defaultValue>Location</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-6 col-md">
              <select className="filter-input form-select" aria-label="Default select example">
                <option defaultValue>Type</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-6 col-md">
              <select className="filter-input form-select" aria-label="Default select example">
                <option defaultValue>Payment</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-6 col-md">
              <select className="filter-input form-select" aria-label="Default select example">
                <option defaultValue>Date</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>
        <div className="results container row m-0 mt-4 mt-md-5">
          {
            vehicles.map(vehicle => {
              const img = vehicle.image ? vehicle.image : imgPlaceholder
              return (
                <VehicleImage
                  key={vehicle.id}
                  src={img}
                  to={`/vehicles/${vehicle.id}`}
                  name={capitalize(vehicle.name)}
                  location={capitalize(vehicle.location)}
                  className='result-item col-12 col-md-4 col-lg-3 p-0 pe-3'
                />
              )
            })
          }
        </div>
        {
          vehicles.length < 1 &&
          <div className="empty-results h-100 d-flex align-items-center justify-content-center">
            <h2 className="text-center text-secondary">No results found</h2>
          </div>
        }
        {
          pageInfo.nextPage &&
          <div className="pagination d-flex justify-content-center mt-5">
            <button onClick={() => getVehicles(null, false)} className='btn btn-primary'>Load More</button>
          </div>
        }
      </main>
    </Layout>
  )
}
