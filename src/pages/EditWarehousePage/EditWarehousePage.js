import React from "react";
import "./EditWarehousePage.scss";
import { Link } from "react-router-dom";
import icon from "../../assets/Icons/arrow_back-24px.svg";
import axios from "axios";

const regexPhone = new RegExp(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  "im"
);
const regexEmail = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  "i"
);

function EditWarehousePage() {
  const handleSubmit = (e) => {
    e.preventDefault();

    let name = e.target.name.value;
    let address = e.target.address.value;
    let city = e.target.city.value;
    let country = e.target.country.value;
    let contactName = e.target.contactName.value;
    let position = e.target.position.value;
    let phone = e.target.phone.value;
    let email = e.target.email.value;

    if (
      !name ||
      !address ||
      !city ||
      !country ||
      !contactName ||
      !position ||
      !phone ||
      !email
    ) {
      alert("Please fill missing field(s)");
      return 0;
    } else if (!regexPhone.test(phone)) {
      alert("Please enter a valid phone number");
      return 0;
    } else if (!regexEmail.test(email)) {
      alert("Please enter a valid email address");
      return 0;
    } else {
      const warehouseID = window.location.pathname.substring(15);
      axios.put(
        `https://apps-server-instock.herokuapp.com/warehouses${warehouseID}`,
        {
          name,
          address,
          city,
          country,
          contact: {
            name: contactName,
            position,
            phone,
            email,
          },
        }
      );
      window.location.assign(`/warehouse`);
    }
  };

  return (
    <div className="edit-wh__outer">
      <div className="edit-wh__inner">
        <div className="edit-wh__title">
          <Link to="/warehouse" className="edit-wh__return-link">
            <img src={icon} alt="back arrow" />
          </Link>
          <h1 className="edit-wh__title--text">Edit Warehouse</h1>
        </div>
        <form
          className="edit-wh__forms"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="edit-wh__form-fields">
            <div className="edit-wh__wh-details-outer edit-wh__form-block-outer">
              <div className="edit-wh__wh-details edit-wh__form-block">
                <h2 className="edit-wh__form-title">Warehouse Details</h2>
                <div className="edit-wh__form-group">
                  <label className="edit-wh__label" htmlFor="name">
                    Warehouse Name
                  </label>
                  <input
                    className="edit-wh__input"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Warehouse Name"
                  />
                </div>
                <div className="edit-wh__form-group">
                  <label className="edit-wh__label" htmlFor="address">
                    Street Address
                  </label>
                  <input
                    className="edit-wh__input"
                    name="address"
                    type="text"
                    placeholder="Street Address"
                  />
                </div>
                <div className="edit-wh__form-group">
                  <label className="edit-wh__label" htmlFor="city">
                    City
                  </label>
                  <input
                    className="edit-wh__input"
                    id="city"
                    name="city"
                    type="text"
                    placeholder="City"
                  />
                </div>
                <div className="edit-wh__form-group">
                  <label className="edit-wh__label" htmlFor="country">
                    Country
                  </label>
                  <input
                    className="edit-wh__input"
                    id="country"
                    name="country"
                    type="text"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>
            <div className="edit-wh__contact-details-outer edit-wh__form-block-outer">
              <div className="edit-wh__contact-details edit-wh__form-block">
                <h2 className="edit-wh__form-title">Contact Details</h2>
                <div className="edit-wh__form-group">
                  <label className="edit-wh__label" htmlFor="contactName">
                    Contact Name
                  </label>
                  <input
                    className="edit-wh__input"
                    id="contactName"
                    name="contactName"
                    type="text"
                    placeholder="Contact Name"
                  />
                </div>
                <div className="edit-wh__form-group">
                  <label className="edit-wh__label" htmlFor="position">
                    Position
                  </label>
                  <input
                    className="edit-wh__input"
                    id="position"
                    name="position"
                    type="text"
                    placeholder="Position"
                  />
                </div>
                <div className="edit-wh__form-group">
                  <label className="edit-wh__label" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    className="edit-wh__input"
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="edit-wh__form-group">
                  <label className="edit-wh__label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="edit-wh__input"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="edit-wh__form-submit">
            <Link to="/warehouse" className="edit-wh__cancel">
              Cancel
            </Link>
            <button type="submit" className="edit-wh__save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditWarehousePage;
