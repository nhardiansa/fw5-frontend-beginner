/* eslint-disable multiline-ternary */
/* eslint-disable space-before-function-paren */
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import Button from "../../components/Button";
import qs from "qs";

// import VehicleImage from '../../components/VehicleImage/VehicleImage';
import Layout from "../../components/Layout";
import "./style.css";
import HistoryItem from "../../components/HistoryItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDeletedPaymentData,
  deleteVehiclePayment,
  getVehiclePaymentDetails,
  getVehiclePaymentList,
  loadMoreVehiclePaymentList,
} from "../../redux/actions/vehicle";
import Spinner from "../../components/Spinner";
import { imagePlaceholder } from "../../helpers/media";
import { capitalize, dateFormatter } from "../../helpers/stringFormat";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { clearEmptyObject } from "../../helpers/dataFilter";
import { axiosInstance } from "../../helpers/http";
import Swal from "sweetalert2";

export default function History() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { vehicleReducer, auth } = useSelector((state) => state);
  const { token } = auth.user;
  const { paymentList, paymentData, paymentDeleteSuccess, listPagination } =
    vehicleReducer;

  const [changePage, setChangePage] = useState(true);
  const [filterInput, setFilterInput] = useState({});
  const [newArrivals, setNewArrivals] = useState([]);

  const [trigger, setTrigger] = useState(false);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const data = Object.fromEntries([...searchParams]);
    dispatch(
      getVehiclePaymentList(
        {
          ...data,
          created: data.created || "desc",
        },
        token
      )
    );
  }, [searchParams, trigger]);

  useEffect(() => {
    const queries = Object.fromEntries([...searchParams]);
    setFilterInput(queries);
    // console.log(queries);

    if (paymentDeleteSuccess !== null || changePage) {
      if (paymentDeleteSuccess !== null) {
        Swal.fire({
          title: "Success",
          text: "Invoice deleted successfully",
          icon: "success",
        });
      }
      // setSearchParams(queries);
      setTrigger(!trigger);
      getNewArrivals();
    }

    return () => {
      dispatch(clearDeletedPaymentData());
    };
  }, [paymentDeleteSuccess]);

  useEffect(() => {
    getTypes();
  }, []);

  useEffect(() => {
    if (paymentData && !changePage) {
      navigate("/payment");
    }
    setChangePage(false);
  }, [paymentData]);

  const detailHandler = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    dispatch(getVehiclePaymentDetails(Number(e.target.id), token));
  };

  const getNewArrivals = async () => {
    try {
      const query = qs.stringify({ created: "desc", limit: 2 });

      const response = await axiosInstance().get(`/vehicles/filter?${query}`);
      setNewArrivals(response.data.results);
    } catch (error) {
      console.error(error);
      setNewArrivals([]);
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    const doIt = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this invoice?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });
    console.log(doIt);
    if (doIt.isConfirmed) {
      dispatch(deleteVehiclePayment(Number(e.target.id), token));
    }
  };

  const filterHandler = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;
    let elValue;

    if (type === "select-one") {
      elValue = e.target.querySelector(`option[value="${value}"]`);
      console.log(elValue);
    }

    if (elValue === null) {
      console.log(value);
      console.log("delete");
      delete filterInput[name];
    } else {
      console.log(name, "name");
      setFilterInput({
        ...filterInput,
        [name]: value,
      });
    }
  };

  const loadMoreHandler = () => {
    const queryString = listPagination.nextPage.split("?")[1];
    const data = qs.parse(queryString);
    dispatch(loadMoreVehiclePaymentList(data, token));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = clearEmptyObject(filterInput);

    if (Object.keys(data).length > 0) {
      console.log(filterInput.created);
    }
    setSearchParams({
      ...data,
      created: data.created || "desc",
    });
  };

  const getTypes = async () => {
    try {
      const { data } = await axiosInstance().get("/categories");

      if (data.success) {
        setTypes(data.results);
      } else {
        setTypes([]);
      }
    } catch (error) {
      console.error(error.response);
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
      });
      setTypes([]);
    }
  };

  const displayPage = (data) => {
    return (
      <>
        <h2 className="a-week-ago-title mb-4 mt-lg-5">A week ago</h2>
        <div>
          {data.map((item) => {
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
                classNameContainer="mb-4"
                historyId={item.id}
              />
            );
          })}
          {listPagination.nextPage && (
            <Button onClick={loadMoreHandler}>Load more</Button>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <Layout>
        <main className="histories container px-3 px-lg-0">
          <div className="history-wrapper container pe-0 me-0 row mt-lg-5">
            <div className="col-lg-9 p-0 pe-lg-5">
              <div className="search-filter">
                <form
                  onSubmit={submitHandler}
                  className="d-flex flex-column flex-md-row"
                >
                  <div className="search-field d-flex me-0 me-md-3 w-100">
                    <input
                      type="text"
                      className="search-input form-control"
                      placeholder="Search history"
                      aria-label="Search history"
                      aria-describedby="button-addon2"
                      name="vehicle_name"
                      onChange={filterHandler}
                      value={filterInput.vehicle_name}
                    />
                    <button
                      type="submit"
                      className="search-btn btn"
                      id="button-addon2"
                    >
                      <HiSearch className="search-icon" />
                    </button>
                  </div>
                  <div className="dropdown mt-3 mt-md-0">
                    <button
                      className="dropdown-toggle btn btn-secondary fw-normal  d-flex align-items-center w-100 h-100"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Filter & Sorter{" "}
                      <FaChevronDown className="dropdown-icon position-absolute" />
                    </button>
                    <ul
                      className="dropdown-menu list-group-flush"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <p className="fw-bold ms-3 f-nunito">Filter</p>
                      </li>
                      <li className="list-group-item">
                        {types.length > 0 ? (
                          <select
                            className="select-item-dropdown form-select"
                            aria-label="Default select example"
                            name="category_id"
                            onChange={filterHandler}
                          >
                            <option className="text-capitalize" defaultValue>
                              Type
                            </option>
                            {types.map((item) => {
                              return (
                                <option
                                  key={item.id}
                                  selected={filterInput.category_id === item.id}
                                  value={item.id}
                                >
                                  {capitalize(item.name)}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          "Notype"
                        )}
                      </li>
                      <li className="list-group-item">
                        <select
                          className="select-item-dropdown form-select"
                          aria-label="Default select example"
                          name="payment_status"
                          onChange={filterHandler}
                        >
                          <option className="text-capitalize" defaultValue>
                            Payment
                          </option>
                          <option
                            className="text-capitalize"
                            selected={filterInput.payment_status === "1"}
                            value="1"
                          >
                            Paid
                          </option>
                          <option
                            className="text-capitalize"
                            value="0"
                            selected={filterInput.payment_status === "0"}
                          >
                            Not Paid
                          </option>
                        </select>
                      </li>
                      <li className="list-group-item">
                        <select
                          className="select-item-dropdown form-select"
                          aria-label="Default select example"
                          name="returned_status"
                          onChange={filterHandler}
                        >
                          <option className="text-capitalize" defaultValue>
                            Return status
                          </option>
                          <option
                            className="text-capitalize"
                            selected={filterInput.returned_status === "1"}
                            value="1"
                          >
                            Has Returned
                          </option>
                          <option
                            className="text-capitalize"
                            selected={filterInput.returned_status === "0"}
                            value="0"
                          >
                            Not returned
                          </option>
                        </select>
                      </li>
                      <li>
                        <p className="fw-bold ms-3 mt-3 f-nunito">Sorter</p>
                      </li>
                      <li className="list-group-item">
                        <select
                          className="select-item-dropdown form-select"
                          aria-label="Default select example"
                          name="created"
                          onChange={filterHandler}
                        >
                          <option className="text-capitalize" defaultValue>
                            Date added
                          </option>
                          <option
                            className="text-capitalize"
                            selected={filterInput.created === "desc"}
                            value="desc"
                          >
                            Newest
                          </option>
                          <option
                            className="text-capitalize"
                            selected={filterInput.created === "asc"}
                            value="asc"
                          >
                            Oldest
                          </option>
                        </select>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
              <div className="today-list-nav mt-5 mt-lg-0">
                <h2 className="today-title mt-lg-5 mb-4">Today</h2>
                <ul className="link-list list-group">
                  <li className="link-list-item list-group-item d-flex align-items-center justify-content-between pb-3">
                    <p className="link-nav">
                      Please finish your payment for vespa for Vespa Rental
                      Jogja
                    </p>
                    <FaChevronRight className="link-nav-icon ms-5" />
                  </li>
                  <li className="link-list-item list-group-item d-flex align-items-center justify-content-between pb-3">
                    <p className="link-nav" href="/">
                      Your payment has been confirmed!
                    </p>
                    <FaChevronRight className="link-nav-icon ms-5" />
                  </li>
                </ul>
              </div>
              <div className="a-week-ago mt-5 mt-lg-0">
                {paymentList ? (
                  displayPage(paymentList)
                ) : (
                  <div className="w-100">
                    <Spinner className="" />
                  </div>
                )}
              </div>
            </div>
            <div className="col">
              <div className="new-arrival d-none d-lg-flex flex-column align-items-center px-4">
                <h2 className="new-arrival-title mb-5">New Arrival</h2>
                {newArrivals.length > 0 ? (
                  newArrivals.map((item) => {
                    const image = item.image || imagePlaceholder(item.name);
                    return (
                      <Link
                        to={`/vehicles/${item.id}`}
                        className="position-relative mb-lg-5"
                        key={item.id}
                      >
                        <img
                          className="new-arrival-image w-100"
                          src={image}
                          alt={capitalize(item.name)}
                        />
                        <div className="desc position-absolute bottom-0 bg-white ps-2 pe-3 pt-3">
                          <h3 className="fs-6 fw-bold text-dark">
                            {capitalize(item.name)}
                          </h3>
                          <p className="fs-6 text-dark">
                            {capitalize(item.location)}
                          </p>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <Spinner />
                )}
                <a
                  href="/vehicle-type.html"
                  className="view-more-link d-flex flex-column align-items-center"
                >
                  View more
                  <FaChevronDown className="view-more-icon mt-3" />
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
