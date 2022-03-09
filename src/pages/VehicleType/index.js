import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { capitalize } from '../../helpers/stringFormat';
import Layout from '../../components/Layout';
import VehicleImage from '../../components/VehicleImage/VehicleImage';
import imagePlaceholder from '../../assets/img/vehicle-placeholder.png';

import './style.css';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';

export const VehicleType = () => {
  // const { baseURL } = constants;
  const { vehicleReducer } = useSelector(state => state);
  const { listVehiclesOfEveryTypes } = vehicleReducer;
  const [vehicles, setVehicles] = useState([]);

  // const [motorbike, setMotorbike] = useState([]);
  // const [car, setCar] = useState([]);
  // const [bike, setBike] = useState([]);

  useEffect(() => {
    console.log(vehicles);
    // console.log(listVehiclesOfEveryTypes, searchVehicleLoading);
    // getVehicle('/vehicles/filter?limit=4&category_id=3', setMotorbike);
    // getVehicle('/vehicles/filter?limit=4&category_id=2', setCar);
    // getVehicle('/vehicles/filter?limit=4&category_id=4', setBike);
    // console.log('getVehicle');
  }, [vehicles]);

  // const getVehicle = async (uri, stateReducer) => {
  //   try {
  //     const { data } = await axios.get(`${baseURL}${uri}`);
  //     stateReducer(data.results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (listVehiclesOfEveryTypes.length > 0) {
      const sectionData = types.map((type, i) => {
        return {
          title: type.title,
          vehicles: listVehiclesOfEveryTypes[i],
          link: `/vehicles/more/${type.endpoint}`
        };
      });
      setVehicles(sectionData);
    }
  }, [listVehiclesOfEveryTypes]);

  const types = [
    {
      title: 'Popular in town',
      endpoint: 'popular'
    },
    {
      title: 'Cars',
      endpoint: 'cars'
    },
    {
      title: 'Motorbikes',
      endpoint: 'motorbikes'
    },
    {
      title: 'Bikes',
      endpoint: 'bikes'
    }
  ];

  const itemsDisplay = (items) => {
    return items.map((el, i) => {
      const img = el.image || imagePlaceholder;
      return (
        <VehicleImage
          to={`/vehicles/${el.id}`}
          alt={el.name}
          key={i}
          src={img}
          name={capitalize(el.name)}
          location={capitalize(el.location)}
          className='p-0 pe-md-4 col-12 col-md-3'
        />
      );
    });
  };

  const renderSections = (sectionData) => {
    return sectionData.map((el, i) => (
      <section key={i} className="cars vehicle-list">
        <div
          className="head-section d-flex justify-content-center justify-content-md-start justify-content-md-between w-100 mb-5 mb-lg-0 align-items-center"
        >
          <h2>{el.title}</h2>
          <Link to={el.link} className="d-md-block d-none"
            >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
          ></Link>
        </div>
        <div
          className="popular-vehicles row justify-content-center justify-content-md-start"
        >
          {
          el.vehicles.length > 0
            ? itemsDisplay(el.vehicles)
            : <div className="col-12 text-center">
              <Spinner />
            </div>
          }
        </div>
        <Link to={el.link} className="d-block d-md-none text-center mt-4"
          >View all <span><i className="icon fa-solid fa-chevron-right"></i></span
        ></Link>
      </section>
    )
    );
  };

  return (
    <Layout isLogged={true}>
      <main className={`${listVehiclesOfEveryTypes.length > 1 ? '' : 'vh-75 d-flex justify-content-center align-items-center'} vehicle-type container px-lg-4 px-5`}>
        {
          listVehiclesOfEveryTypes.length > 1
            ? renderSections(vehicles)
            : <Spinner variant={'primary'} style={{ width: '8rem', height: '8rem' }} />
        }
      </main>
    </Layout>
  );
};
