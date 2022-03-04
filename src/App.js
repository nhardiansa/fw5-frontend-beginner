import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from './redux/actions/auth';

import { Login } from './pages/Login';
import { Home } from './pages/Home';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import History from './pages/History';
import Profile from './pages/Profile';
import Payment from './pages/Payment';
import { Reservation } from './pages/Reservation';
import { VehicleType } from './pages/VehicleType';
import { VehicleDetail } from './pages/VehicleDetail';
import Search from './pages/Search';

import { PrivateRoute, PublicRoute } from './components/Routes';
import { getSelectData } from './redux/actions/selectData';

export default function App () {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(auth, 'app');
    const user = getUserData();
    if (user) {
      dispatch(login(user));
    }

    dispatch(getSelectData());
  }, []);

  const getUserData = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  return (
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute restricted={true} page={<Login />} />} />
          <Route path="/register" element={<PublicRoute restricted={true} page={<Register />} />} />
          <Route path="/forgotPassword" element={<PublicRoute restricted={true} page={<ForgotPassword />} />} />
          <Route path="/forgotPassword" element={<PublicRoute restricted={true} page={<ForgotPassword />} />} />

          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<VehicleType />} />
          <Route path="/vehicles/more" element={<Search viewMore={true} />} />
          <Route path='/vehicles/:id' element={<VehicleDetail />} />
          <Route path='/search' element={<Search />} />

          <Route path="/profile" element={<PrivateRoute restricted={true} page={<Profile />} />} />

          <Route path="/histories" element={<History />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/payment" element={<Payment />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>
      </>
  );
}

// const mapStateToProps = (state) => ({ auth: state.auth });

// const mapDispatchToProps = { login };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
