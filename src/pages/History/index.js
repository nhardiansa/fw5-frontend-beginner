import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { HiSearch } from 'react-icons/hi';
import Button from '../../components/Button';
import qs from 'qs';

// import VehicleImage from '../../components/VehicleImage/VehicleImage';
import Layout from '../../components/Layout';
import './style.css';
import HistoryItem from '../../components/HistoryItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDeletedPaymentData, deleteVehiclePayment, getVehiclePaymentDetails, getVehiclePaymentList, loadMoreVehiclePaymentList } from '../../redux/actions/vehicle';
import Spinner from '../../components/Spinner';
import { imagePlaceholder } from '../../helpers/media';
import { capitalize, dateFormatter } from '../../helpers/stringFormat';
import { Link, useNavigate } from 'react-router-dom';
import { clearEmptyObject } from '../../helpers/dataFilter';
import { axiosInstance } from '../../helpers/http';

export default function History () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vehicleReducer } = useSelector(state => state);
  const { paymentList, paymentData, paymentDeleteSuccess, listPagination } = vehicleReducer;

  const [changePage, setChangePage] = useState(true);
  const [filterInput, setFilterInput] = useState({});
  const [newArrivals, setNewArrivals] = useState([]);

  // const newArrivals = [
  //   {
  //     src: vespa,
  //     name: 'Lamborghini',
  //     location: 'Yogyakarta'
  //   },
  //   {
  //     src: vespa,
  //     name: 'White Jeep',
  //     location: 'Kalimantan'
  //   }
  // ];

  useEffect(() => {
    if (paymentDeleteSuccess !== null || changePage) {
      if (paymentDeleteSuccess !== null) {
        alert('Delete Success');
      }
      getNewArrivals();
      dispatch(getVehiclePaymentList({
        created: 'desc'
      }));
    }

    return () => {
      dispatch(clearDeletedPaymentData());
    };
  }, [paymentDeleteSuccess]);

  useEffect(() => {
    if (paymentData && !changePage) {
      navigate('/payment');
    }
    setChangePage(false);
  }, [paymentData]);

  const detailHandler = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    dispatch(getVehiclePaymentDetails(Number(e.target.id)));
  };

  const getNewArrivals = async () => {
    try {
      const query = qs.stringify({ created: 'desc', limit: 2 });

      const response = await axiosInstance().get(`/vehicles/filter?${query}`);
      setNewArrivals(response.data.results);
    } catch (error) {
      console.error(error);
      setNewArrivals([]);
    }
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    const doIt = window.confirm('Are you sure you want to delete this payment?');
    if (doIt) {
      dispatch(deleteVehiclePayment(Number(e.target.id)));
    }
  };

  const filterHandler = (e) => {
    e.preventDefault();
    setFilterInput({
      ...filterInput,
      [e.target.name]: e.target.value
    });
  };

  const loadMoreHandler = () => {
    const queryString = listPagination.nextPage.split('?')[1];
    const data = qs.parse(queryString);
    dispatch(loadMoreVehiclePaymentList(data));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = clearEmptyObject(filterInput);

    if (Object.keys(data).length > 0) {
      dispatch(getVehiclePaymentList({
        ...data,
        created: 'desc'
      }));
    }
  };

  const displayPage = (data) => {
    return (
      <>
        <h2 className="a-week-ago-title mb-4 mt-lg-5">A week ago</h2>
        <div>
        {
          data.map((item) => {
            const image = item.image || imagePlaceholder(item.name);
            return (
              <HistoryItem
              key={item.id}
              image={image}
              name={item.name}
              startRent={dateFormatter(item.start_rent)}
              endRent={dateFormatter(item.end_rent)}
              prepayment={item.prepayment}
              payment={Number(item.payment)}
              returned={Number(item.returned)}
              detailClicked={detailHandler}
              deleteClicked={deleteHandler}
              classNameContainer='mb-4'
              historyId={item.id}
              />
            );
          })
        }
        {
          listPagination.nextPage &&
          <Button onClick={loadMoreHandler} >Load more</Button>
        }
        </div>
      </>
    );
  };

  return (
      <>
        <Layout>
          <main className='histories container px-3 px-lg-0'>
            <div className="history-wrapper container pe-0 me-0 row mt-lg-5">
              <div className="col-lg-9 p-0 pe-lg-5">
                <div className="search-filter">
                  <form onSubmit={submitHandler} className="d-flex">
                    <div className="search-field d-flex me-3">
                      <input
                        type="text"
                        className="search-input form-control"
                        placeholder="Search history"
                        aria-label="Search history"
                        aria-describedby="button-addon2"
                        name="vehicle_name"
                        onChange={filterHandler}
                      />
                      <button type='submit' className="search-btn btn" id="button-addon2">
                        <HiSearch className='search-icon' />
                      </button>
                    </div>
                    <div className="select-input flex-fill position-relative">
                      <select
                        className="select-field form-select"
                        aria-label="Default select example"
                      >
                        <option defaultValue>Filter</option>
                        <option value="Type">Type</option>
                        <option value="Date Added">Date Added</option>
                        <option value="Name">Name</option>
                        <option value="Favorite Product">Favorite Product</option>
                      </select>
                      <FaChevronDown className="dropdown-icon position-absolute" />
                    </div>
                  </form>
                </div>
                <div className="today-list-nav mt-5 mt-lg-0">
                  <h2 className="today-title mt-lg-5 mb-4">Today</h2>
                  <ul className="link-list list-group">
                    <li
                      className="link-list-item list-group-item d-flex align-items-center justify-content-between pb-3"
                    >
                      <a className="link-nav" href="/"
                        >Please finish your payment for vespa for Vespa Rental Jogja</a
                      >
                      <FaChevronRight className='link-nav-icon ms-5' />
                    </li>
                    <li
                      className="link-list-item list-group-item d-flex align-items-center justify-content-between pb-3"
                    >
                      <a className="link-nav" href="/">Your payment has been confirmed!</a>
                      <FaChevronRight className='link-nav-icon ms-5' />
                    </li>
                  </ul>
                </div>
                <div className="a-week-ago mt-5 mt-lg-0">
                  {
                    (paymentList)
                      ? displayPage(paymentList)
                      : <div className='w-100'>
                      <Spinner className='' />
                    </div>
                  }
                </div>
              </div>
              <div className="col">
                <div
                  className="new-arrival d-none d-lg-flex flex-column align-items-center px-4"
                >
                  <h2 className="new-arrival-title mb-5">New Arrival</h2>
                  { newArrivals.length > 0
                    ? newArrivals.map((item) => {
                      const image = item.image || imagePlaceholder(item.name);
                      return (
                        <Link to={`/vehicles/${item.id}`} className='position-relative mb-lg-5' key={item.id}>
                          <img
                            className='new-arrival-image w-100'
                            src={image}
                            alt={capitalize(item.name)}
                          />
                          <div className="desc position-absolute bottom-0 bg-white ps-2 pe-3 pt-3">
                            <h3 className="fs-6 fw-bold text-dark">{capitalize(item.name)}</h3>
                            <p className='fs-6 text-dark'>{capitalize(item.location)}</p>
                          </div>
                        </Link>
                      );
                    })
                    : <Spinner />
                  }
                  <a
                    href="/vehicle-type.html"
                    className="view-more-link d-flex flex-column align-items-center"
                  >
                    View more
                    <FaChevronDown className='view-more-icon mt-3' />
                  </a>
                </div>
              </div>
            </div>
          </main>
        </Layout>

        {/* <Footer /> */}
      </>
  );
}
