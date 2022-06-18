import { Component } from "react";
import "./InventoryPage.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import sort from "../../assets/Icons/sort-24px.svg";
import chevron from "../../assets/Icons/chevron_right-24px.svg";
import edit from "../../assets/Icons/edit-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";


const API_URL = "http://localhost:8080";

class InventoryPage extends Component {

  state = {
    inventoryList: null
  }


  componentDidMount() {
    axios
      .get(`${API_URL}/inventory`)
      .then((response) => {
        this.setState({
          inventoryList: response.data
        })
      })
  }


  render() {
    const { inventoryList } = this.state;

    return <main className="inventory">
      <div className="inventory__container">
        <div className="inventory__heading">
          <h1 className="inventory__title">Inventory</h1>
          <div className="inventory__controls">
            <input className="inventory__search" type="text" placeholder="Search..." />
            <NavLink to="/inventory/add" className="inventory__add-link">
              <button className="inventory__add">+ Add New Item</button>
            </NavLink>
          </div>
        </div>
        <div className="inventory__sort-headings">
          <div className="inventory__sort-headings__container" id="inventory-item">
            <p className="inventory__sort-headings__title">INVENTORY ITEM</p>
            <img className="inventory__sort-headings__icon" src={sort} alt="sort" />
          </div>
          <div className="inventory__sort-headings__container" id="category">
            <p className="inventory__sort-headings__title">CATEGORY</p>
            <img className="inventory__sort-headings__icon" src={sort} alt="sort" />
          </div>
          <div className="inventory__sort-headings__container" id="status">
            <p className="inventory__sort-headings__title">STATUS</p>
            <img className="inventory__sort-headings__icon" src={sort} alt="sort" />
          </div>
          <div className="inventory__sort-headings__container" id="quantity">
            <p className="inventory__sort-headings__title">QTY</p>
            <img className="inventory__sort-headings__icon" src={sort} alt="sort" />
          </div>
          <div className="inventory__sort-headings__container" id="warehouse">
            <p className="inventory__sort-headings__title">WAREHOUSE</p>
            <img className="inventory__sort-headings__icon" src={sort} alt="sort" />
          </div>
          <div className="inventory__sort-headings__container" id="actions">
            <p className="inventory__sort-headings__title">ACTIONS</p>
          </div>
        </div>
        <ul className="inventory__list">
          {inventoryList?.slice(0, 8).map((inventory) => {
            return (
              <div className="inventory__item" key={inventory.id}>
                <div className="inventory__info inventory__info--left">
                  <div className="inventory__info__item">
                    <h6 className="inventory__info__heading">INVENTORY ITEM</h6>
                    <div className="inventory__info__name-container">
                      <NavLink to={`/inventory/${inventory.id}`} className="inventory__item-link">
                        <p className="inventory__name">{inventory.itemName}</p>
                      </NavLink>
                      <img className="inventory__chevron" src={chevron} alt="chevron" />
                    </div>
                  </div>
                  <div className="inventory__info__category">
                    <h6 className="inventory__info__heading">CATEGORY</h6>
                    <p className="inventory__category">{inventory.category}</p>
                  </div>
                </div>
                <div className="inventory__info inventory__info--right">
                  <div className="inventory__info__status">
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
                  <div className="inventory__info__quantity">
                    <h6 className="inventory__info__heading">QTY</h6>
                    <p className="inventory__quantity">{inventory.quantity}</p>
                  </div>
                  <div className="inventory__info__warehouse">
                    <h6 className="inventory__info__heading">WAREHOUSE</h6>
                    <p className="inventory__warehouse">{inventory.warehouseName}</p>
                  </div>
                </div>
                <div className="inventory__actions">
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

export default InventoryPage;
