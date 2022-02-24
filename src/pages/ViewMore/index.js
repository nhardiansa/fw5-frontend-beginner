import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import VehicleImage from '../../components/VehicleImage/VehicleImage'

import Layout from '../../components/Layout'
import { getData } from '../../helpers/http'
import { capitalize } from '../../helpers/stringFormat'

import './style.css'

export const ViewMore = () =>  {
  const {type} = useParams()
  const [vehicles, setVehicle] = useState([])
  // const [category, setCategory] = useState([])

  useEffect(() => {
    if (vehicles.length === 0) {
      mapVehicleData(type)
    }
  }, [])

  const mapVehicleData = (type) => {
    switch (type) {
      case 'motorbike':
        getVehicle('/vehicles/filter?limit=16&category_id=3', setVehicle)
        break;
      case 'car':
        getVehicle('/vehicles/filter?limit=16&category_id=2', setVehicle)
        break;
      case 'bike':
        getVehicle('/vehicles/filter?limit=16&category_id=4', setVehicle)
        break;
      default:
        getVehicle('/vehicles/popular', setVehicle)
        break;
    }
  }

  const getVehicle = async (uri, stateReducer) => {
    try {
      const data = await getData(uri)
      stateReducer(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  const getCategory = async (uri, stateReducer) => {
    try {
      const categories = await getData(uri)
      stateReducer(categories.results)
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <Layout isLogged={true}>
      <main className={vehicles.length === 0 ? 'vh-100' : ''}>
        <div className={`view-more-wrapper container d-flex flex-column`}>
          {
            type === 'popular' &&
            <h1 className="view-more-title text-center text-md-start">Popular in town</h1>
          }
          {
            type !== 'popular' &&
            <h1 className="view-more-title text-center text-md-start">{capitalize(type) + 's'}</h1>
          }
          {
            vehicles.length > 0 && 
            <p className="click-suggestion mt-4 text-center fw-bold">
              Click item to see details and reservation
            </p>
          }
          <div
            className="view-more-container mt-5 row px-5 px-md-0"
          >
            {
              vehicles.length > 0 &&
                vehicles.map((el, i) => {
                  const img = el.image || 'https://via.placeholder.com/261x333?text=Popular+in+town'
                  return (
                    <VehicleImage
                      to={`/vehicles/${el.id}`}
                      key={i}
                      src={img}
                      name={capitalize(el.name)}
                      location={capitalize(el.location)}
                      className='view-more-item p-0 pe-md-3 col-12 col-md-4 col-lg-3'
                    />
                  )
                })  
            }
          </div>
          <p className={`no-items mt-5 justify-self-center align-self-center ${vehicles.length === 0 && 'h-100'} `}>There is no vehicle left</p>
        </div>
      </main>
    </Layout>
  )
}
