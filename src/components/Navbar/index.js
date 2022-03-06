import { Link, useNavigate } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../components/Spinner';
import logo from '../../assets/img/car-wheel.png';
import profilePict from '../../assets/img/profile-picture/samantha-doe.png';
import msgIcon from '../../assets/img/msg-icon.svg';
import './style.css';
import { logout } from '../../redux/actions/auth';
import { getUserData, logoutUser } from '../../redux/actions/user';
import { useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, user } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (userToken && !user.profile) {
      dispatch(getUserData(userToken));
    }
  }, []);

  const onSearchHandler = (e) => {
    e.preventDefault();
    const keyword = e.target.querySelector('input').value;
    if (keyword.length > 0) {
      navigate(`/search?name=${keyword}`);
    }
  };

  const onLogoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    dispatch(logout());
    navigate('/login');
  };

  const renderNavbar = () => {
    return (
      <>
        <div className="d-flex">
          {
            auth.user
              ? (
              <div
                className="profile d-flex d-lg-none justify-content-between align-items-center"
              >
                {
                  user.profile
                    ? <>
                    <div className="dropdown">
                      <div className="profile-dropdown dropdown-toggle" aria-labelledby="dropdownMenuButton1" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img
                          src={user.profile.image || profilePict}
                          alt="profile-img"
                          className="profile-pict rounded-circle"
                        />
                      </div>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link to='/profile' className="dropdown-item">Edit Profile</Link></li>
                        <li><a className="dropdown-item" href="#">Help</a></li>
                        <li><div onClick={onLogoutHandler} className="dropdown-item" href="#">Log Out</div></li>
                      </ul>
                    </div>
                    <div className="message-notif position-relative ms-4 me-2">
                      <img
                        src={msgIcon}
                        alt="message"
                        className="message"
                      />
                      <div
                        className="count position-absolute rounded-circle d-flex justify-content-center align-items-center"
                      >
                        1
                      </div>
                    </div>
                  </>
                    : <Spinner variant='primary' style={{ width: '2rem', height: '2rem' }} />
                }
              </div>
                )
              : <Spinner variant='primary' style={{ width: '2rem', height: '2rem' }} />
          }

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse justify-content-lg-end" id="navbarNavAltMarkup">
          <div className="navbar-nav d-flex me-lg-5 justify-content-end flex-fill">
            <Link to='/' className="nav-link" aria-current="page" >Home</Link>
            <Link to='/vehicles' className="nav-link" >Vehicle Type</Link>
            <Link to='/histories' className="nav-link active" >History</Link>
            <Link to='/' className="nav-link" >About</Link>
            {
              auth.user
                ? <form onSubmit={onSearchHandler} className="input-group my-3 my-lg-0 ms-lg-5 me-lg-3">
                <input type="text" className="form-control border-end-0" placeholder="Search vehicle" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button type="submit" className="search-btn btn btn-outline-secondary" id="button-addon2">
                  <HiSearch className='search-icon text-secondary' />
                </button>
              </form>
                : <Spinner variant='primary' style={{ width: '2rem', height: '2rem' }} />
            }
          </div>
          {
            (auth.user && user.profile)
              ? (
              <div className="profile d-none d-lg-flex justify-content-between align-items-center" >
                {
                  user.isLoading
                    ? <div className="spinner-border text-custom-primary" style={{ width: '2rem', height: '2rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                    : <>
                  <div className="message-notif position-relative">
                    <img
                      src={msgIcon}
                      alt="message"
                      className="message"
                    />
                    <div
                      className="count position-absolute rounded-circle d-flex justify-content-center align-items-center"
                    >
                      1
                    </div>
                  </div>
                  <div className="dropdown">
                    <div className="profile-dropdown dropdown-toggle" aria-labelledby="dropdownMenuButton1" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <img
                        src={user.profile.image || profilePict}
                        alt="profile-img"
                        className="profile-pict rounded-circle"
                      />
                    </div>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link to='/profile' className="dropdown-item">Edit Profile</Link></li>
                      <li><a className="dropdown-item" href="#">Help</a></li>
                      <li><div onClick={onLogoutHandler} className="dropdown-item" href="#">Log Out</div></li>
                    </ul>
                  </div>
                  </>
                }
              </div>
                )
              : <Spinner variant='primary' style={{ width: '2rem', height: '2rem' }} />
          }
          {
            !auth.user && (
              <div className="auth d-flex flex-column flex-lg-row">
                <Link to="/login" className="login-btn fw-normal btn rounded-3 mb-3 mb-lg-0" >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="register-btn fw-normal btn rounded-3 mb-3 mb-lg-0"

                >
                  Register
                </Link>
              </div>
            )
          }
        </div>
      </>
    );
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white position-fixed top-0 w-100 py-lg-4"
    >
      <div className="container d-flex align-items-center">
        <Link to='/' className="navbar-brand">
          <img
            className="logo"
            src={logo}
            alt="vehicle-rent-logo"
          />
        </Link>
        {/* {
          auth.user && user.profile
            ? renderNavbar()
            : <Spinner />
        } */}
        {renderNavbar()}
      </div>
    </nav>
  );
};

export default Navbar;
