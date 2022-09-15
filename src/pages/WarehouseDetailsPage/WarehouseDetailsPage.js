import { Component } from "react";
import "./WarehouseDetailsPage.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import sort from "../../assets/Icons/sort-24px.svg";
import edit from "../../assets/Icons/edit-24px.svg";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import DetailsListItem from "../../components/DetailsListItem/DetailsListItem";

class WarehouseDetailsPage extends Component {
  state = {
    warehouseDetails: null,
    inventoryList: null,
  };

  componentDidMount() {
    axios
      .get(
        `https://apps-server-instock.herokuapp.com/warehouses/${this.props.match.params.warehouseId}`
      )
      .then((response) => {
        this.setState({
          warehouseDetails: response.data,
        });
      });
    axios
      .get(
        `https://apps-server-instock.herokuapp.com/inventory/warehouse/${this.props.match.params.warehouseId}`
      )
      .then((response) => {
        this.setState({
          inventoryList: response.data,
        });
      });
  }

  render() {
    const { warehouseDetails, inventoryList } = this.state;

    if (!inventoryList) {
      return <main>Loading, please wait...</main>;
    }

    return (
      <main className="warehouse-details">
        <div className="warehouse-details__container">
          <div className="warehouse-details__heading">
            <div className="warehouse-details__title-container">
              <NavLink
                to="/warehouse"
                className="warehouse-details__return-link"
              >
                <img
                  className="warehouse-details__return"
                  src={backArrow}
                  alt="back arrow"
                />
              </NavLink>
              <h1 className="warehouse-details__title">
                {warehouseDetails?.name}
              </h1>
            </div>
            <div className="warehouse-details__controls">
              <NavLink
                to="/warehouse/edit/:warehouseId"
                className="warehouse-details__edit-link"
              >
                <button className="warehouse-details__edit">
                  <img
                    className="warehouse-details__edit-icon"
                    src={edit}
                    alt="edit"
                  />
                  <p className="warehouse-details__edit-text">Edit</p>
                </button>
              </NavLink>
            </div>
          </div>
          <div className="warehouse-details__info">
            <div className="warehouse-details__address">
              <p className="warehouse-details__sub-heading">
                WAREHOUSE ADDRESS:
              </p>
              <p
                className="warehouse-details__info-text"
                id="address"
              >{`${warehouseDetails?.address}, ${warehouseDetails?.city}, ${warehouseDetails?.country}`}</p>
            </div>
            <div className="warehouse-details__contact">
              <div className="warehouse-details__contact-name">
                <p className="warehouse-details__sub-heading">CONTACT NAME:</p>
                <p className="warehouse-details__info-text">
                  {warehouseDetails?.contact.name}
                </p>
                <p className="warehouse-details__info-text">
                  {warehouseDetails?.contact.position}
                </p>
              </div>
              <div className="warehouse-details__contact-info">
                <p className="warehouse-details__sub-heading">
                  CONTACT INFORMATION:
                </p>
                <p className="warehouse-details__info-text">
                  {warehouseDetails?.contact.phone}
                </p>
                <p className="warehouse-details__info-text">
                  {warehouseDetails?.contact.email}
                </p>
              </div>
            </div>
          </div>
          <div className="inventory__sort-headings">
            <div
              className="inventory__sort-headings__container"
              id="item-heading"
            >
              <p className="inventory__sort-headings__title">INVENTORY ITEM</p>
              <img
                className="inventory__sort-headings__icon"
                src={sort}
                alt="sort"
              />
            </div>
            <div
              className="inventory__sort-headings__container"
              id="category-heading"
            >
              <p className="inventory__sort-headings__title">CATEGORY</p>
              <img
                className="inventory__sort-headings__icon"
                src={sort}
                alt="sort"
              />
            </div>
            <div
              className="inventory__sort-headings__container"
              id="status-heading"
            >
              <p className="inventory__sort-headings__title">STATUS</p>
              <img
                className="inventory__sort-headings__icon"
                src={sort}
                alt="sort"
              />
            </div>
            <div
              className="inventory__sort-headings__container"
              id="quantity-heading"
            >
              <p className="inventory__sort-headings__title">QUANTITY</p>
              <img
                className="inventory__sort-headings__icon"
                src={sort}
                alt="sort"
              />
            </div>
            <div
              className="inventory__sort-headings__container"
              id="actions-heading"
            >
              <p className="inventory__sort-headings__title">ACTIONS</p>
            </div>
          </div>
          <ul className="inventory__list">
            {inventoryList.map((item) => (
              <DetailsListItem key={item.id} {...item} />
            ))}
          </ul>
        </div>
      </main>
    );
  }
}

export default WarehouseDetailsPage;
