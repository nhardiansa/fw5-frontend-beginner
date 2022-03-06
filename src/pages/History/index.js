import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { HiSearch } from 'react-icons/hi';

import vespa from '../../assets/img/motorbike/vespa.png';
import VehicleImage from '../../components/VehicleImage/VehicleImage';
import Layout from '../../components/Layout';
import './style.css';
import HistoryItem from '../../components/HistoryItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVehiclePayment, getVehiclePaymentDetails, getVehiclePaymentList } from '../../redux/actions/vehicle';
import Spinner from '../../components/Spinner';
import { imagePlaceholder } from '../../helpers/media';
import { dateFormatter } from '../../helpers/stringFormat';
import { useNavigate } from 'react-router-dom';

export default function History () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vehicleReducer } = useSelector(state => state);
  const { paymentList, paymentData, paymentDeleteSuccess } = vehicleReducer;

  const [changePage, setChangePage] = useState(true);

  const detailHandler = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    dispatch(getVehiclePaymentDetails(Number(e.target.id)));
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    const doIt = window.confirm('Are you sure you want to delete this payment?');
    if (doIt) {
      dispatch(deleteVehiclePayment(Number(e.target.id)));
    }
  };

  useEffect(() => {
    if (paymentDeleteSuccess !== null || changePage) {
      if (paymentDeleteSuccess !== null) {
        alert('Delete Success');
      }
      dispatch(getVehiclePaymentList());
    }
  }, [paymentDeleteSuccess]);

  useEffect(() => {
    if (paymentData && !changePage) {
      navigate('/payment');
    }
    setChangePage(false);
  }, [paymentData]);

  const newArrivals = [
    {
      src: vespa,
      name: 'Lamborghini',
      location: 'Yogyakarta'
    },
    {
      src: vespa,
      name: 'White Jeep',
      location: 'Kalimantan'
    }
  ];

  const displayPage = (data) => {
    return (
      <div className="a-week-ago mt-5 mt-lg-0">
        <h2 className="a-week-ago-title mb-4">A week ago</h2>
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
      </div>
    );
  };

  return (
      <>
        <Layout>
          <main className='histories container px-2'>
            <div className="history-wrapper container mt-lg-5 d-lg-grid">
              <div className="search-filter">
                <form className="d-flex">
                  <div className="search-field d-flex me-3">
                    <input
                      type="text"
                      className="search-input form-control"
                      placeholder="Search history"
                      aria-label="Search history"
                      aria-describedby="button-addon2"
                    />
                    <button className="search-btn btn" type="button" id="button-addon2">
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
                <h2 className="today-title mt-lg-4 mb-4">Today</h2>
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
              {
                (paymentList)
                  ? displayPage(paymentList)
                  : <div className='w-100'>
                  <Spinner className='' />
                </div>
              }
              <div
                className="new-arrival d-none d-lg-flex flex-column align-items-center"
              >
                <h2 className="new-arrival-title mb-5">New Arrival</h2>
                {newArrivals.map((item, index) => (
                  <VehicleImage
                    to={`/vehicles/${index}`}
                    key={index}
                    src={item.src}
                    name={item.name}
                    location={item.location}
                    className='mb-5'
                  />
                ))}

                <a
                  href="/vehicle-type.html"
                  className="view-more-link d-flex flex-column align-items-center"
                >
                  View more
                  <FaChevronDown className='view-more-icon mt-3' />
                </a>
              </div>
            </div>
          </main>
        </Layout>

        {/* <Footer /> */}
      </>
  );
}
