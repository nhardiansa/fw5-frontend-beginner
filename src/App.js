import React, { Component } from 'react'
import {Route, Routes} from 'react-router-dom'

import {Login} from "./pages/Login";
import {Home} from "./pages/Home";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Reservation from "./pages/Reservation";
import {VehicleType} from "./pages/VehicleType";
import {ViewMore} from "./pages/ViewMore";
import {VehicleDetail} from "./pages/VehicleDetail";

export default class App extends Component {
  state = {
    isLogged: false
  }

  setLoginHandler = (value) => {
    this.setState({
      isLogged: value
    })
  }

  render() {
    return (
      <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setLogin={this.setLoginHandler} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/histories" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/vehicles" element={<VehicleType />} />
        <Route path='/viewMore/:type' element={<ViewMore />} />
        <Route path='/vehicles/:id' element={<VehicleDetail />} />
      </Routes>
      </>
    );
  }
}