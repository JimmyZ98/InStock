import { Component } from "react";
import "./InventoryPage.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import sort from "../../assets/Icons/sort-24px.svg";
import chevron from "../../assets/Icons/chevron_right-24px.svg";
import edit from "../../assets/Icons/edit-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import InventoryListItem from "../../components/InventoryListItem/InventoryListItem";

class InventoryPage extends Component {
  state = {
    inventoryList: null,
  };

  componentDidMount() {
    axios
      .get(`https://apps-server-instock.herokuapp.com/inventory`)
      .then((response) => {
        this.setState({
          inventoryList: response.data,
        });
      });
  }

  render() {
    const { inventoryList } = this.state;

    if (!inventoryList) {
      return <main>Loading, please wait...</main>;
    }

    return (
      <main className="inventory">
        <div className="inventory__container">
          <div className="inventory__heading">
            <h1 className="inventory__title">Inventory</h1>
            <div className="inventory__controls">
              <input
                className="inventory__search"
                type="text"
                placeholder="Search..."
              />
              <NavLink to="/inventory/add" className="inventory__add-link">
                <button className="inventory__add">+ Add New Item</button>
              </NavLink>
            </div>
          </div>
          <div className="inventory__sort-headings">
            <div
              className="inventory__sort-headings__container"
              id="inventory-item"
            >
              <p className="inventory__sort-headings__title">INVENTORY ITEM</p>
              <img
                className="inventory__sort-headings__icon"
                src={sort}
                alt="sort"
              />
            </div>
            <div className="inventory__sort-headings__container" id="category">
              <p className="inventory__sort-headings__title">CATEGORY</p>
              <img
                className="inventory__sort-headings__icon"
                src={sort}
                alt="sort"
              />
            </div>
            <div className="inventory__sort-headings__container" id="status">
              <p className="inventory__sort-headings__title">STATUS</p>
              <img
                className="inventory__sort-headings__icon"
                src={sort}
                alt="sort"
              />
            </div>
            <div className="inventory__sort-headings__container" id="quantity">
              <p className="inventory__sort-headings__title">QTY</p>
              <img
                className="inventory__sort-headings__icon"
                src={sort}
                alt="sort"
              />
            </div>
            <div className="inventory__sort-headings__container" id="warehouse">
              <p className="inventory__sort-headings__title">WAREHOUSE</p>
              <img
                className="inventory__sort-headings__icon"
                src={sort}
                alt="sort"
              />
            </div>
            <div className="inventory__sort-headings__container" id="actions">
              <p className="inventory__sort-headings__title">ACTIONS</p>
            </div>
          </div>
          <ul className="inventory__list">
            {inventoryList.map((item) => (
              <InventoryListItem key={item.id} {...item} />
            ))}
          </ul>
        </div>
      </main>
    );
  }
}

export default InventoryPage;
