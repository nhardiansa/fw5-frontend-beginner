import { Component } from 'react';
import Footer from './Footer/Footer';
import { Navbar } from './Navbar';

export default class Layout extends Component {
  render () {
    return (
      <>
        <Navbar isLogged={this.props.isLogged} />
          {this.props.children}
        <Footer />
      </>
    );
  }
}
