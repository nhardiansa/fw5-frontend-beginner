import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";

import Button from "../../components/Button";
import Layout from "../../components/Layout";
import VehicleImage from "../../components/VehicleImage/VehicleImage";
import { capitalize } from "../../helpers/stringFormat";

import "./style.css";
import Spinner from "../../components/Spinner";
import { imagePlaceholder } from "../../helpers/media";
import { clearEmptyObject } from "../../helpers/dataFilter";
import { useDispatch, useSelector } from "react-redux";
import { searchVehicle, changeDataToSearchVehicle } from "../../redux/actions/vehicle";

export default function Search() {
  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();

  const dispatch = useDispatch();
  const { vehicleReducer, selectData } = useSelector(state => state);
  const { searchVehicleList, searchVehicleListPagination, dataToSearchVehicle, searchVehicleLoading, loadMoreLoading } = vehicleReducer;
  const { locations, types } = selectData;

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (types.length > 0) {
      defaultDataPage(type);
    }

    const queryParams = getQueryParams();
    console.log(queryParams);
    dispatch(changeDataToSearchVehicle({
      ...queryParams
    }));
  }, [types]);

  useEffect(() => {
    const queryParamsLength = Object.keys(getQueryParams()).length;
    const dataToSearchLength = Object.keys(dataToSearchVehicle).length;

    if (!queryParamsLength && !dataToSearchLength) {
      console.log("no data");
    }

    if (!queryParamsLength && dataToSearchLength) {
      setSearchParams(clearEmptyObject(dataToSearchVehicle));
    }

    if (queryParamsLength) {
      dispatch(searchVehicle(getQueryParams()));
    } else if (dataToSearchLength) {
      dispatch(searchVehicle(dataToSearchVehicle));
    }

    return () => {
      dispatch(searchVehicle());
    };
  }, []);

  const selectHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const selectedElement = e.target.querySelector(`option[value="${value}"]`);
    if (selectedElement === null) {
      dispatch(changeDataToSearchVehicle({
        ...dataToSearchVehicle,
        [name]: ""
      }));
    } else {
      dispatch(changeDataToSearchVehicle({
        ...dataToSearchVehicle,
        [name]: value
      }));
    }
  };

  const getFilterData = () => {
    const filterBar = document.querySelector("#collapse-filter-sorter");
    filterBar.classList.toggle("show");
    setSearchParams(clearEmptyObject(dataToSearchVehicle));
    dispatch(searchVehicle(dataToSearchVehicle));
  };

  const getQueryParams = () => {
    return Object.fromEntries([...searchParams]);
  };

  const defaultDataPage = (type) => {
    switch (type) {
      case "popular": {
        setTitle("Popular in town");
        setSearchParams({
          popularity: "desc"
        });
        break;
      }
      case "motorbikes": {
        setTitle("Motorbikes");
        setSearchParams({
          category_id: types.find(el => el.name === "motorbike").id
        });
        break;
      }
      case "cars": {
        setTitle("Cars");
        setSearchParams({
          category_id: types.find(el => el.name === "car").id
        });
        break;
      }
      case "bikes": {
        setTitle("Bikes");
        setSearchParams({
          category_id: types.find(el => el.name === "bike").id
        });
        break;
      }
      default:
        setTitle("Search results");
        break;
    }
  };

  const loadMoreHandler = () => {
    dispatch(searchVehicle({}, searchVehicleListPagination.nextPage));
  };

  const openFilterHandler = () => {
    window.scrollTo(0, 0);
  };

  const displayResults = (vehicles) => {
    return (
      vehicles.map(vehicle => {
        const img = vehicle.image ? vehicle.image : imagePlaceholder(capitalize(vehicle.name));
        return (
                <VehicleImage
                  key={vehicle.id}
                  src={img}
                  to={`/vehicles/${vehicle.id}`}
                  name={capitalize(vehicle.name)}
                  location={capitalize(vehicle.location)}
                  className='result-item col-12 col-md-4 col-lg-3 p-0 pe-md-3'
                />
        );
      })
    );
  };

  return (
    <Layout>
      <main className={`view-more container ${searchVehicleList.length < 1 ? "vh-100" : ""}`}>
        {
          title
            ? <h1 className='ps-lg-4 mt-lg-5 mb-5 mb-lg-0 text-center text-lg-start fs-1 fw-bold d-lg-inline'>{title}</h1>
            : <h1 className='ps-lg-4 mt-lg-5 mb-5 mb-lg-0 text-center text-lg-start fs-1 fw-bold d-lg-inline'>Search results</h1>
        }
        <Button onClick={openFilterHandler} id='open-filter-btn' className="fs-5 ms-lg-4 mb-lg-3 rounded-circle" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-filter-sorter" aria-expanded="false" aria-controls="collapse-filter-sorter">
          <FaFilter />
        </Button>
        <div className="collapse" id="collapse-filter-sorter">
          <div className="filter-bar container mt-4 mt-lg-5">
            <h2 className='fs-6 lh-1 ms-2 mb-3'>Filter</h2>
            <div className="filter-input-group d-flex container mb-4 g-2">
              <div className="filter-input me-2 col-6 col-md">
                <select onChange={selectHandler} defaultValue={dataToSearchVehicle.location} name='location' className="filter-input form-select" aria-label="Default select example">
                  <option defaultValue>Location</option>
                  {
                    locations.map((data, idx) => (
                      <option key={idx} value={data.location} selected={dataToSearchVehicle.location === data.location} >{capitalize(data.location)}</option>
                    ))
                  }
                </select>
              </div>
              {
                (type === "popular" || !type) && (
                  <div className="filter-input me-2 col-6 col-md">
                    <select onChange={selectHandler} name='category_id' className="filter-input form-select" aria-label="Default select example">
                      <option defaultValue>Type</option>
                      {
                        types.map(type => (
                          <option key={type.id} selected={dataToSearchVehicle.category_id === `${type.id}`} value={type.id}>{capitalize(type.name)}</option>
                        ))
                      }
                    </select>
                  </div>
                )
              }
              <div className="filter-input me-2 col-6 col-md">
                <select onChange={selectHandler} name='prepayment' className="filter-input form-select" aria-label="Default select example">
                  <option defaultValue>Payment</option>
                  <option value="0" selected={dataToSearchVehicle.prepayment === "0"} >Only cash</option>
                  <option value="1" selected={dataToSearchVehicle.prepayment === "1"}>Can prepayment</option>
                </select>
              </div>
            </div>
            <h2 className='fs-6 lh-1 ms-2 mb-3'>Sorter</h2>
            <div className="sorter-input-group d-flex container mb-4 g-2">
              <div className="sorter-input me-2 col-6 col-md">
                <select onChange={selectHandler} name='created' className="filter-input form-select" aria-label="Default select example">
                  <option defaultValue>Date added</option>
                  <option selected={dataToSearchVehicle.created === "desc"} value="desc">Latest to added</option>
                  <option selected={dataToSearchVehicle.created === "asc"} value="asc">Old to added</option>
                </select>
              </div>
              <div className="sorter-input me-2 col-6 col-md">
                <select onChange={selectHandler} name='sort_price' className="sorter-input form-select" aria-label="Default select example">
                  <option defaultValue>Harga</option>
                  <option selected={dataToSearchVehicle.sort_price === "asc"} value="asc" >Cheapest</option>
                  <option selected={dataToSearchVehicle.sort_price === "desc"} value="desc" >Highest</option>
                </select>
              </div>
            </div>
            <Button onClick={getFilterData} className='filter-btn ms-2 mt-3 px-4 rounded-pill'>Filter</Button>
          </div>
        </div>
        <div className={`${searchVehicleLoading ? "justify-content-center align-items-center h-75" : ""} results container row m-0 mt-4 mt-md-5`}>
          {
            searchVehicleLoading ? <Spinner variant='secondary' style={{ width: "7rem", height: "7rem" }} /> : displayResults(searchVehicleList)
          }
        </div>
        {
          (searchVehicleList.length < 1 && !searchVehicleLoading) &&
          <div className="empty-results h-100 d-flex align-items-center justify-content-center">
            <h2 className="text-center text-secondary f-nunito fw-bold">No results found</h2>
          </div>
        }
        {
          searchVehicleListPagination.nextPage &&
          <div className="pagination d-flex justify-content-center mt-5">
            {
              loadMoreLoading
                ? <Spinner variant='secondary' />
                : <Button onClick={loadMoreHandler} className='filter-btn btn'>Load more</Button>
            }
          </div>
        }
      </main>
    </Layout>
  );
}
