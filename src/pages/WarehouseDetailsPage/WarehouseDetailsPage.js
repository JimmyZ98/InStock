import { Component } from "react";
import "./WarehouseDetailsPage.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import sort from "../../assets/Icons/sort-24px.svg";
import chevron from "../../assets/Icons/chevron_right-24px.svg";
import edit from "../../assets/Icons/edit-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";


const API_URL = "http://localhost:8080";

class WarehouseDetailsPage extends Component {

  state = {
    warehouseDetails: null,
    inventoryList: null
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/warehouses/${this.props.match.params.warehouseId}`)
      .then((response) => {
        this.setState({
          warehouseDetails: response.data
        })
      })
    axios
      .get(`${API_URL}/inventory`)
      .then((response) => {
        this.setState({
          inventoryList: response.data.filter((inventory) => inventory.warehouseID === this.props.match.params.warehouseId)
        })
      })
  }

  render() {
    const { warehouseDetails, inventoryList } = this.state;

    return <main className="warehouse-details">
      <div className="warehouse-details__container">
        <div className="warehouse-details__heading">
          <div className="warehouse-details__title-container">
            <NavLink to="/warehouse" className="warehouse-details__return-link">
              <img className="warehouse-details__return" src={backArrow} alt="back arrow" />
            </NavLink>
            <h1 className="warehouse-details__title">{warehouseDetails?.name}</h1>
          </div>
          <div className="warehouse-details__controls">
            <NavLink to="/warehouse/edit/:warehouseId" className="warehouse-details__edit-link">
              <button className="warehouse-details__edit">
                <img className="warehouse-details__edit-icon" src={edit} alt="edit" />
                <p className="warehouse-details__edit-text">Edit</p>
              </button>
            </NavLink>
          </div>
        </div>
        <div className="warehouse-details__info">
          <div className="warehouse-details__address">
            <p className="warehouse-details__sub-heading">WAREHOUSE ADDRESS:</p>
            <p className="warehouse-details__info-text" id="address">{`${warehouseDetails?.address}, ${warehouseDetails?.city}, ${warehouseDetails?.country}`}</p>
          </div>
          <div className="warehouse-details__contact">
            <div className="warehouse-details__contact-name">
              <p className="warehouse-details__sub-heading">CONTACT NAME:</p>
              <p className="warehouse-details__info-text">{warehouseDetails?.contact.name}</p>
              <p className="warehouse-details__info-text">{warehouseDetails?.contact.position}</p>
            </div>
            <div className="warehouse-details__contact-info">
              <p className="warehouse-details__sub-heading">CONTACT INFORMATION:</p>
              <p className="warehouse-details__info-text">{warehouseDetails?.contact.phone}</p>
              <p className="warehouse-details__info-text">{warehouseDetails?.contact.email}</p>
            </div>
          </div>
        </div>
        <div className="inventory__sort-headings">
          <div className="inventory__sort-headings__container" id="item-heading">
            <p className="inventory__sort-headings__title">INVENTORY ITEM</p>
            <img className="inventory__sort-headings__icon" src={sort} alt="sort" />
          </div>
          <div className="inventory__sort-headings__container" id="category-heading">
            <p className="inventory__sort-headings__title">CATEGORY</p>
            <img className="inventory__sort-headings__icon" src={sort} alt="sort" />
          </div>
          <div className="inventory__sort-headings__container" id="status-heading">
            <p className="inventory__sort-headings__title">STATUS</p>
            <img className="inventory__sort-headings__icon" src={sort} alt="sort" />
          </div>
          <div className="inventory__sort-headings__container" id="quantity-heading">
            <p className="inventory__sort-headings__title">QUANTITY</p>
            <img className="inventory__sort-headings__icon" src={sort} alt="sort" />
          </div>
          <div className="inventory__sort-headings__container" id="actions-heading">
            <p className="inventory__sort-headings__title">ACTIONS</p>
          </div>
        </div>
        <ul className="inventory__list">
          {inventoryList?.map((inventory) => {
            return (
              <div className="inventory__item" key={inventory.id}>
                <div className="inventory__info inventory__info--left-container">
                  <div className="inventory__info__item-container">
                    <h6 className="inventory__info__heading">INVENTORY ITEM</h6>
                    <div className="inventory__info__name-container">
                      <NavLink to={`/inventory/${inventory.id}`} className="inventory__item-link">
                        <p className="inventory__name">{inventory.itemName}</p>
                      </NavLink>
                      <img className="inventory__chevron" src={chevron} alt="chevron" />
                    </div>
                  </div>
                  <div className="inventory__info__category-container">
                    <h6 className="inventory__info__heading">CATEGORY</h6>
                    <p className="inventory__category">{inventory.category}</p>
                  </div>
                </div>
                <div className="inventory__info inventory__info--right-container">
                  <div className="inventory__info__status-container">
                    <h6 className="inventory__info__heading">STATUS</h6>
                    <p className=
                      {
                        inventory.status === "In Stock"
                          ?
                          "inventory__status inventory__status-in"
                          :
                          "inventory__status inventory__status-out"
                      }>{inventory.status.toUpperCase()}
                    </p>
                  </div>
                  <div className="inventory__info__qty-container">
                    <h6 className="inventory__info__heading">QTY</h6>
                    <p className="inventory__quantity">{inventory.quantity}</p>
                  </div>
                </div>
                <div className="inventory__actions-container">
                  <img className="inventory__delete" src={deleteIcon} alt="delete" />
                  <NavLink to={`/inventory/edit/${inventory.id}`} className="inventory__edit-link">
                    <img className="inventory__edit" src={edit} alt="edit" />
                  </NavLink>
                </div>
              </div>
            )
          })}
        </ul>
      </div>
    </main>;
  }
}

export default WarehouseDetailsPage;
