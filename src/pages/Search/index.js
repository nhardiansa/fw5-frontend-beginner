import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import axios from 'axios'

import constants from '../../config/constants'
import Layout from '../../components/Layout'
import VehicleImage from '../../components/VehicleImage/VehicleImage';
import {capitalize} from '../../helpers/stringFormat'
import imgPlaceholder from '../../assets/img/placeholder.png';

import './style.css';

export default function Search({viewMore}) {
  const navigate = useNavigate()
  const {baseURL, itemLimit} = constants

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams()
  const [pageInfo, setPageInfo] = useState({})
  const [vehicles, setVehicles] = useState([])

  const [types, setTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filterInput, setFilterInput] = useState({});

  const [title, setTitle] = useState('');
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    if (trigger) {
      const queries = Object.fromEntries([...searchParams]);
      
      if (queries.popular !== '1') {
        if (Object.prototype.hasOwnProperty.call(queries, 'popular')) {
          delete queries.popular
        }
      }
      emptyQueriesHandler(queries)
      setFilterInput(queries);
      
      getTypes(setTypes)

      if (queries.popular === '1') {
        getVehicles(queries, true, false)
      } else {
        getVehicles(queries)
      }

      getLocations(setLocations)

      if (viewMore) {
        pageName(location);
      }

      setTrigger(false)
      console.log('useEffect');
    }
  }, [trigger])

  useEffect(() => {
    if (viewMore && types.length > 0) {
      pageName(location);
    }
  },[types])

  const getVehicles = async (queries, replace=true, filter=true) => {
    try {
      let url

      if (replace) {
        url = generateEndpoint(queries, filter)
      } else {
        url = pageInfo.nextPage
      }

      const {data} = await axios.get(url)
      setPageInfo(data.pageInfo)

      // decide if we need to replace or append
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

  const getTypes = async (cb=null) => {
    try {
      const {data} = await axios.get(`${baseURL}/categories`)
      cb && cb(data.results)
    } catch (error) {
      console.error(error);
    }
  }

  const generateEndpoint = (query, filter) => {
    let uri = `${baseURL}/vehicles/${filter ? 'filter' : 'popular'}?limit=${8}&`
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

  const emptyQueriesHandler = (queries, justNavigate=false) => {
    const keys = Object.keys(queries).length
    
    if (keys < 1  || justNavigate) {
      navigate('/');
    }
  }

  const selectHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    const selectedElement = e.target.querySelector(`option[value="${value}"]`)

    if (selectedElement === null) {
      setFilterInput({
        ...filterInput,
        [name]: ''
      })
      return 0;
    }

    if (name === 'category_id') {
      setFilterInput({
        ...filterInput,
        category_id: value
      })
    }

    if (name === 'prepayment') {
      setFilterInput({
        ...filterInput,
        prepayment: value
      })
    }

    if (name === 'location') {
      setFilterInput({
        ...filterInput,
        location: value
      })
    }
  }

  const getLocations = async (cb=null) => {
    try {
      const {data} = await axios.get(`${baseURL}/vehicles/location`)
      cb && cb(data.results)
    } catch (error) {
      console.error(error);
    }
  }

  const getFilterData = (e) => {
    const tempInput = filterInput
    Object.keys(tempInput).forEach(key => {
      if (tempInput[key] === '') {
        delete tempInput[key]
      }
    })
    setSearchParams(tempInput)
    setTrigger(true)
  }

  const pageName = (location) => {
    const {pathname, search} = location
    const page = pathname.split('/')[2]
    
    if (page === 'more') {
      if (search.includes('popular=1')) {
        setTitle('Popular in town')
      } else {
        if (search.includes('category_id')) {
          const category = search.split('&')[0].split('=')[1]
          const categoryName = types.find(type => type.id === Number(category))
          
          if (categoryName) {
            setTitle(capitalize(categoryName.name) + 's')
          }
        }
      }
    }
  }

  return (
    <Layout>
      <main className={`container ${vehicles.length < 1 ? 'vh-100' : ''}`}>
        {
          title ?
          <h1 className='ps-lg-4 mt-lg-5 text-center text-lg-start fs-1'>{title}</h1>
          :
          <h1 className='ps-lg-4 mt-lg-5 text-center text-lg-start fs-1'>Search results</h1>
        }
        <div className="filter-bar container mt-4 mt-lg-5">
          <div className="row container mt-3 g-2">
            <div className="col-6 col-md">
              <select onChange={selectHandler} name='location' className="filter-input form-select" aria-label="Default select example">
                <option defaultValue>Location</option>
                {
                  locations.map((data, idx) => (
                    <option key={idx} value={data.location}>{data.location}</option>
                  ))
                }
              </select>
            </div>
            <div className="col-6 col-md">
              <select onChange={selectHandler} name='category_id' className="filter-input form-select" aria-label="Default select example">
                <option defaultValue>Type</option>
                {
                  types.map(type => (
                    <option  key={type.id} value={type.id}>{type.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="col-6 col-md">
              <select onChange={selectHandler} name='prepayment' className="filter-input form-select" aria-label="Default select example">
                <option defaultValue>Payment</option>
                <option value="0">Only cash</option>
                <option value="1">Can prepayment</option>
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
            <button onClick={getFilterData} className='filter-btn btn col-12'>Filter</button>
            
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
            <button onClick={() => getVehicles(null, false)} className='filter-btn btn'>Load More</button>
          </div>
        }
      </main>
    </Layout>
  )
}
