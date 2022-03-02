import { Component } from 'react';
import { FaPencilAlt } from 'react-icons/fa';

import Button from '../../components/Button';
import profilePicture from '../../assets/img/profile-picture/samantha-doe.png';
import Layout from '../../components/Layout';
import './style.css';

export default class Profile extends Component {
  render () {
    return (
      <Layout isLogged={true} >
        <main className="container">
          {/* <!-- Header title --> */}
          <h1 className="edit-title text-center text-lg-start mt-lg-5">Profile</h1>
          {/* <!-- Tumbhnail profile start --> */}
          <div
            className="contact text-center d-flex flex-column align-items-center mt-5"
          >
            <div className="img-wrapper d-inline-block position-relative">
              <img
                src={profilePicture}
                alt="samantha-doe"
                className="contact-img img-thumbnail rounded-circle"
              />
              <Button
                className="edit-btn rounded-circle btn position-absolute"
              >
                {/* <i className="fa-solid fa-pencil"></i> */}
                <FaPencilAlt />
              </Button>
            </div>
            <div className="contact-info mt-5">
              <h2 className="">Samantha Doe</h2>
              <p className="email mt-4">
                samanthadoe@mail.com <br />
                +62833467823 <br />
                Has been active since 2013
              </p>
            </div>
            <div className="gender d-flex justify-content-center">
              <form className="d-flex w-100 justify-content-between">
                <div className="male gender-option">
                    <div className="radio-input  d-flex align-items-center">
                      <input type="radio" name="gender" id="male" />
                      <div className="checkmark me-3"></div>
                      <label htmlFor="male">Male</label>
                    </div>
                </div>
                <div className="female gender-option">
                    <div className="radio-input d-flex align-items-center">
                      <input type="radio" name="gender" id="female" />
                      <div className="checkmark me-3"></div>
                      <label htmlFor="female">Female</label>
                    </div>
                </div>
              </form>
            </div>
          </div>
          {/* <!-- Tumbhnail profile end --> */}

          {/* <!-- Edit contact & identity form start --> */}
          <div className="form-section mt-5 px-3">
            <form>
              <h2 className="text-center mb-3 text-md-start">Contacts</h2>
              <div className="email mt-5">
                <label className="input-lable" htmlFor="email">Email</label>
                <input
                  className="text-input d-block"
                  type="text"
                  name="email"
                  id="email"
                  value="zulaikha17@gmail.com"
                  placeholder="example@mail.com"
                />
              </div>
              <div className="address mt-5">
                <label className="input-lable" htmlFor="address">Address</label>
                {/* <!-- <input
                  className="text-input d-block"
                  type="text"
                  name="address"
                  id="address"
                  value="Iskandar Street no. 67 Block A Near Bus Stop"
                  placeholder="example street no.1"
                /> --> */}
                <textarea
                  placeholder="example street no.1"
                  className="text-input"
                  name="address"
                  id="address"
                  defaultValue='Iskandar Street no. 67 Block A Near Bus Stop'
                ></textarea>
              </div>
              <div className="phone mt-5 mb-5">
                <label className="input-lable" htmlFor="phone">Mobile number</label>
                <input
                  className="text-input d-block"
                  type="text"
                  name="phone"
                  id="phone"
                  value="(+62)813456782"
                  placeholder="(+62)1234567"
                />
              </div>
              <h2 className="text-center mt-5 mb-3 text-md-start">Identity</h2>
              <div
                className="identity-form d-flex flex-column flex-md-row justify-content-md-between"
              >
                <div className="name mt-5 w-100 me-md-5">
                  <label className="input-lable" htmlFor="name">Name</label>
                  <input
                    className="text-input d-block"
                    type="text"
                    name="name"
                    id="name"
                    value="zulaikha"
                    placeholder="Jhon Doe"
                  />
                </div>
                <div className="birthdate mt-5 mb-5 w-100 ms-md-5">
                  <label className="input-lable" htmlFor="birthdate">DD/MM/YY</label>
                  <input
                    className="text-input d-block"
                    type="text"
                    name="birthdate"
                    id="birthdate"
                    value="03/09/2003"
                    placeholder="03/09/2003"
                  />
                </div>
              </div>
              <div
                className="button-groups d-flex justify-content-between flex-column flex-md-row mt-5"
              >
                <Button className="save btn">Save Change</Button>
                <Button className="edit-password btn">Edit Password</Button>
                <Button className="cancel btn">Cancel</Button>
              </div>
            </form>
          </div>
          {/* <!-- Edit contact & identity form end --> */}
        </main>
      </Layout>
    );
  }
}
