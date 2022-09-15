import react from "react";
import "./AddWarehousePage.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import { NavLink } from "react-router-dom";
import axios from "axios";
const { v4: uuid } = require("uuid");

const API_URL = process.env.REACT_APP_API_URL;

const regexPhone = new RegExp(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  "im"
);
const regexEmail = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  "i"
);

function AddWarehousePage() {
  const handleSubmit = (e) => {
    e.preventDefault();

    let id = uuid();
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
      axios.post(`${API_URL}warehouses`, {
        id,
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
      });
      window.location.assign(`/warehouse`);
    }
  };

  return (
    <main className="addWarehouse">
      <div className="addWarehouse__container">
        <div className="addWarehouse__title-card">
          <NavLink to="/warehouse" className="addWarehouse__return-link">
            <img
              className="addWarehouse__return"
              src={backArrow}
              alt="back arrow"
            />
          </NavLink>
          <h1 className="addWarehouse__title">Add New Warehouse</h1>
        </div>
        <form
          className="addWarehouse__form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="addWarehouse__form-fields">
            <div className="addWarehouse__details">
              <h2 className="addWarehouse__details__title">
                Warehouse Details
              </h2>
              <label className="addWarehouse__details__label">
                Warehouse Name
              </label>
              <input
                className="addWarehouse__details__input"
                type="text"
                name="name"
                placeholder="Warehouse Name"
              ></input>
              <label className="addWarehouse__details__label">
                Street Address
              </label>
              <input
                className="addWarehouse__details__input"
                type="text"
                name="address"
                placeholder="Street Address"
              ></input>
              <label className="addWarehouse__details__label">City</label>
              <input
                className="addWarehouse__details__input"
                type="text"
                name="city"
                placeholder="City"
              ></input>
              <label className="addWarehouse__details__label">Country</label>
              <input
                className="addWarehouse__details__input"
                type="text"
                name="country"
                placeholder="Country"
              ></input>
            </div>
            <div className="addWarehouse__contact">
              <h2 className="addWarehouse__contact__title">Contact Details</h2>
              <label className="addWarehouse__contact__label">
                Contact Name
              </label>
              <input
                className="addWarehouse__contact__input"
                type="text"
                name="contactName"
                placeholder="Contact Name"
              ></input>
              <label className="addWarehouse__contact__label">Position</label>
              <input
                className="addWarehouse__contact__input"
                type="text"
                name="position"
                placeholder="Position"
              ></input>
              <label className="addWarehouse__contact__label">
                Phone Number
              </label>
              <input
                className="addWarehouse__contact__input"
                type="text"
                name="phone"
                placeholder="Phone Number"
              ></input>
              <label className="addWarehouse__contact__label">Email</label>
              <input
                className="addWarehouse__contact__input"
                type="text"
                name="email"
                placeholder="Email"
              ></input>
            </div>
          </div>
          <div className="addWarehouse__buttons">
            <NavLink to="/warehouse" className="addWarehouse__cancel-link">
              <button className="addWarehouse__cancel">Cancel</button>
            </NavLink>
            <button className="addWarehouse__add" type="submit">
              + Add Warehouse
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddWarehousePage;
