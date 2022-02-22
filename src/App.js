import Login from "./pages/Login";
import Home from "./pages/Home";
import Counter from './Counter'

import React, { Component } from 'react'

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
        { this.state.isLogged ? <Home setLogin={(value) => this.setLoginHandler(value)} /> : <Login setLogin={(value) => this.setLoginHandler(value)} /> }
        {/* <Counter /> */}
      </>
    );
  }
}