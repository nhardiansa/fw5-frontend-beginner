import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from './redux/actions/auth';
import { getUserData } from './redux/actions/user';

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
import { getVehicleListEveryType } from './redux/actions/vehicle';

export default function App () {
  const { selectData } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user) {
      dispatch(login(user));
      dispatch(getUserData(user));
    }
  }, []);

  useEffect(() => {
    const { locations, types } = selectData;
    if (!locations.length || !types.length) {
      dispatch(getSelectData());
    }

    if (types.length > 0) {
      dispatch(getVehicleListEveryType(types));
    }
  }, [selectData.types]);

  return (
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute restricted={true} page={<Login />} />} />
          <Route path="/register" element={<PublicRoute restricted={true} page={<Register />} />} />
          <Route path="/forgotPassword" element={<PublicRoute restricted={true} page={<ForgotPassword />} />} />
          <Route path="/verify" element={<PublicRoute restricted={true} page={<ForgotPassword />} />} />

          <Route path="/" element={<PublicRoute page={<Home /> }/>} />
          <Route path="/vehicles" element={ <PublicRoute page={<VehicleType />} /> } />
          <Route path="/vehicles/more/:type" element={ <PublicRoute page={<Search />} /> } />
          <Route path='/vehicles/:id' element={ <PublicRoute page={<VehicleDetail />} /> } />
          <Route path='/search' element={ <PublicRoute page={<Search />} /> } />

          <Route path="/profile" element={<PrivateRoute restricted={true} page={<Profile />} />} />
          <Route path="/changePassword" element={<PrivateRoute restricted={true} page={<ForgotPassword />} />} />

          <Route path="/histories" element={ <PrivateRoute restricted={true} page={<History />} /> } />
          <Route path="/reservation" element={ <PrivateRoute restricted={true} page={<Reservation />} /> } />
          <Route path="/payment" element={ <PrivateRoute restricted={true} page={<Payment />} /> } />
          <Route path='*' element={<PublicRoute page={<Home /> } />} />
        </Routes>
      </BrowserRouter>
      </>
  );
}
