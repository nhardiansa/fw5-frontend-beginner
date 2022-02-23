import React, { Component } from 'react'
import {FaPencilAlt} from 'react-icons/fa'

import profilePicture from '../../assets/img/profile-picture/samantha-doe.png'
import Layout from '../../components/Layout'
import './style.css'

export default class Profile extends Component {
  render() {
    return (
      <Layout isLogged={true} >
        <main class="container">
          {/* <!-- Header title --> */}
          <h1 class="edit-title text-center text-lg-start mt-lg-5">Profile</h1>
          {/* <!-- Tumbhnail profile start --> */}
          <div
            class="contact text-center d-flex flex-column align-items-center mt-5"
          >
            <div class="img-wrapper d-inline-block position-relative">
              <img
                src={profilePicture}
                alt="samantha-doe"
                class="contact-img img-thumbnail rounded-circle"
              />
              <button
                class="edit-btn rounded-circle btn position-absolute"
              >
                {/* <i class="fa-solid fa-pencil"></i> */}
                <FaPencilAlt />
              </button>
            </div>
            <div class="contact-info mt-5">
              <h2 class="">Samantha Doe</h2>
              <p class="email mt-4">
                samanthadoe@mail.com <br />
                +62833467823 <br />
                Has been active since 2013
              </p>
            </div>
            <div class="gender d-flex justify-content-center">
              <form class="d-flex w-100 justify-content-between">
                <div class="male gender-option">
                    <div class="radio-input  d-flex align-items-center">
                      <input type="radio" name="gender" id="male" />
                      <div class="checkmark me-3"></div>
                      <label for="male">Male</label>
                    </div>
                </div>
                <div class="female gender-option">
                    <div class="radio-input d-flex align-items-center">
                      <input type="radio" name="gender" id="female" />
                      <div class="checkmark me-3"></div>
                      <label for="female">Female</label>
                    </div>
                </div>
              </form>
            </div>
          </div>
          {/* <!-- Tumbhnail profile end --> */}

          {/* <!-- Edit contact & identity form start --> */}
          <div class="form-section mt-5 px-3">
            <form>
              <h2 class="text-center mb-3 text-md-start">Contacts</h2>
              <div class="email mt-5">
                <label class="input-lable" for="email">Email</label>
                <input
                  class="text-input d-block"
                  type="text"
                  name="email"
                  id="email"
                  value="zulaikha17@gmail.com"
                  placeholder="example@mail.com"
                />
              </div>
              <div class="address mt-5">
                <label class="input-lable" for="address">Address</label>
                {/* <!-- <input
                  class="text-input d-block"
                  type="text"
                  name="address"
                  id="address"
                  value="Iskandar Street no. 67 Block A Near Bus Stop"
                  placeholder="example street no.1"
                /> --> */}
                <textarea
                  placeholder="example street no.1"
                  class="text-input"
                  name="address"
                  id="address"
                >Iskandar Street no. 67 Block A Near Bus Stop</textarea
                >
              </div>
              <div class="phone mt-5 mb-5">
                <label class="input-lable" for="phone">Mobile number</label>
                <input
                  class="text-input d-block"
                  type="text"
                  name="phone"
                  id="phone"
                  value="(+62)813456782"
                  placeholder="(+62)1234567"
                />
              </div>
              <h2 class="text-center mt-5 mb-3 text-md-start">Identity</h2>
              <div
                class="identity-form d-flex flex-column flex-md-row justify-content-md-between"
              >
                <div class="name mt-5 w-100 me-md-5">
                  <label class="input-lable" for="name">Name</label>
                  <input
                    class="text-input d-block"
                    type="text"
                    name="name"
                    id="name"
                    value="zulaikha"
                    placeholder="Jhon Doe"
                  />
                </div>
                <div class="birthdate mt-5 mb-5 w-100 ms-md-5">
                  <label class="input-lable" for="birthdate">DD/MM/YY</label>
                  <input
                    class="text-input d-block"
                    type="text"
                    name="birthdate"
                    id="birthdate"
                    value="03/09/2003"
                    placeholder="03/09/2003"
                  />
                </div>
              </div>
              <div
                class="button-groups d-flex justify-content-between flex-column flex-md-row mt-5"
              >
                <button class="save btn">Save Change</button>
                <a href="/" class="edit-password btn">Edit Password</a>
                <button class="cancel btn">Cancel</button>
              </div>
            </form>
          </div>
          {/* <!-- Edit contact & identity form end --> */}
        </main>
      </Layout>
    )
  }
}
