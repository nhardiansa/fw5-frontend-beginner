/* eslint-disable multiline-ternary */
/* eslint-disable quotes */
import { FaPencilAlt } from "react-icons/fa";

import Button from "../../components/Button";
import profilePicture from "../../assets/img/profile-placeholder.png";
import Layout from "../../components/Layout";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { capitalize, dateFormatter } from "../../helpers/stringFormat";
import { updateUser } from "../../redux/actions/user";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, auth } = useSelector((state) => state);
  const userToken = auth.user?.token;

  const [updateProfile, setUpdateProfile] = useState({});
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (user.profile) {
      setGender(user.profile.gender);
    }
  }, [user.profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.type);
    setUpdateProfile({
      ...updateProfile,
      [name]: e.target.type === "radio" ? e.target.id : value,
    });
  };

  const genderChange = (e) => {
    const isRadio = e.target.type === "radio";

    if (isRadio) {
      setGender(e.target.id);
      if (gender === user.profile.gender) {
        setUpdateProfile({
          ...updateProfile,
          gender: e.target.id,
        });
      } else {
        setUpdateProfile({
          ...updateProfile,
          gender: "",
        });
      }
    }
  };

  const dateChange = (e) => {
    const isDate = e.target.type === "date";
    const { value } = e.target;

    if (!value) {
      setUpdateProfile({
        ...updateProfile,
        birthdate: "",
      });
    }

    if (isDate) {
      console.log(e.target.value);
      if (value) {
        if (value === dateFormatter(user.profile.birthdate)) {
          console.log("sama");
          setUpdateProfile({
            ...updateProfile,
            birthdate: "",
          });
        } else {
          setUpdateProfile({
            ...updateProfile,
            birthdate: value,
          });
        }
      }
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    setUpdateProfile({});
    console.log(e.target);
  };

  const changePasswordHandler = (e) => {
    e.preventDefault();
    const file = document.querySelector('input[type="file"]');
    if (file) {
      delete file.files[0];
    }
    console.log("change password");
  };

  const fileInputHandler = (e) => {
    const reader = new FileReader();
    const image = e.target.files[0];

    console.log(image);

    const imageProfile = document.querySelector(".contact-img");
    reader.readAsDataURL(image);

    reader.onload = (e) => {
      imageProfile.src = e.target.result;
    };

    setUpdateProfile({
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in updateProfile) {
      if (updateProfile[key] === "") {
        delete updateProfile[key];
      }

      if (updateProfile[key] === user.profile[key]) {
        delete updateProfile[key];
      }
    }

    if (Object.keys(updateProfile).length > 0) {
      if (updateProfile.birthdate) {
        updateProfile.birthdate = dateFormatter(updateProfile.birthdate, true);
      }
      dispatch(updateUser(user.profile, updateProfile, userToken));
      // console.log(user.profile, updateProfile);
      setUpdateProfile({});
    }
  };

  const renderProfile = (user) => {
    return (
      <>
        {/* <!-- Header title --> */}
        <h1 className="edit-title text-center text-lg-start mt-lg-5">
          Profile
        </h1>
        {/* <!-- Tumbhnail profile start --> */}
        <div className="contact text-center d-flex flex-column align-items-center mt-5">
          <div className="img-wrapper d-inline-block position-relative pe-auto">
            <img
              src={user.profile.image || profilePicture}
              alt="samantha-doe"
              className="contact-img img-thumbnail rounded-circle"
            />
            <Button className="edit-btn rounded-circle btn position-absolute pe-auto">
              <FaPencilAlt />
              <input
                type="file"
                name="image"
                onChange={fileInputHandler}
                className="image-input position-absolute pe-auto"
              />
            </Button>
          </div>
          <div className="contact-info mt-5">
            <h2 className="">{capitalize(user.profile.name || "not set")}</h2>
            <p className="email mt-4">
              {user.profile.email || "not set"} <br />
              {user.profile.phone || "not set"} <br />
              Has been active since {user.profile.created_at.slice(0, 4)}
            </p>
          </div>
          <div className="gender d-flex justify-content-center">
            <div className="d-flex w-100 justify-content-between">
              <div className="male gender-option">
                <div className="radio-input  d-flex align-items-center">
                  <input
                    type="radio"
                    name="gender"
                    onChange={genderChange}
                    id="male"
                    checked={gender === "male"}
                  />
                  <div className="checkmark me-3"></div>
                  <label htmlFor="male">Male</label>
                </div>
              </div>
              <div className="female gender-option">
                <div className="radio-input d-flex align-items-center">
                  <input
                    type="radio"
                    checked={gender === "female"}
                    name="gender"
                    onChange={genderChange}
                    id="female"
                  />
                  <div className="checkmark me-3"></div>
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Tumbhnail profile end --> */}

        {/* <!-- Edit contact & identity form start --> */}
        <div className="form-section mt-5 px-3">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center mb-3 text-md-start">Contacts</h2>
            <div className="email mt-5">
              <label className="input-lable" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="text-input d-block"
                name="email"
                id="email"
                value={updateProfile.email || user.profile.email || ""}
                placeholder="example@mail.com"
                disabled={true}
              />
            </div>
            <div className="address mt-5">
              <label className="input-lable" htmlFor="address">
                Address
              </label>
              <textarea
                onChange={handleChange}
                className="text-input"
                name="address"
                id="address"
                value={updateProfile.address || user.profile.address || ""}
              ></textarea>
            </div>
            <div className="phone mt-5 mb-5">
              <label className="input-lable" htmlFor="phone">
                Mobile number
              </label>
              <input
                onChange={handleChange}
                className="text-input d-block"
                type="text"
                name="phone"
                id="phone"
                value={updateProfile.phone || user.profile.phone || ""}
              />
            </div>
            <h2 className="text-center mt-5 mb-3 text-md-start">Identity</h2>
            <div className="identity-form d-flex flex-column flex-md-row justify-content-md-between">
              <div className="name mt-5 w-100 me-md-5">
                <label className="input-lable" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={handleChange}
                  className="text-input d-block"
                  type="text"
                  name="name"
                  id="name"
                  value={updateProfile.name || user.profile.name || ""}
                />
              </div>
              <div className="birthdate mt-5 mb-5 w-100 ms-md-5">
                <label className="input-lable" htmlFor="birthdate">
                  Birthdate
                </label>
                <input
                  onChange={dateChange}
                  className="text-input d-block text-uppercase"
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  value={
                    updateProfile.birthdate ||
                    dateFormatter(user.profile.birthdate) ||
                    ""
                  }
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>
            {user.error && (
              <div
                className="alert alert-danger d-flex justify-content-center"
                role="alert"
              >
                {user.error}
              </div>
            )}
            <div className="button-groups d-flex justify-content-between flex-column flex-md-row mt-5">
              <Button type="submit" className="save btn">
                Save Change
              </Button>
              <Button
                onClick={changePasswordHandler}
                className="edit-password btn"
              >
                Edit Password
              </Button>
              <Button onClick={cancelHandler} className="cancel btn">
                Cancel
              </Button>
            </div>
          </form>
        </div>
        {/* <!-- Edit contact & identity form end --> */}
      </>
    );
  };

  return (
    <Layout>
      <main
        className={
          "profile container" +
          (!user.isLoading && user.profile
            ? ""
            : " vh-100 d-flex justify-content-center align-items-center")
        }
      >
        {!user.isLoading && user.profile ? (
          renderProfile(user)
        ) : (
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </main>
    </Layout>
  );
}
