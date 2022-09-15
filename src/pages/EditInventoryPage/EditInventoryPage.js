import { Component } from "react";
import "./EditInventoryPage.scss";
import backArrowIcon from "../../assets/Icons/arrow_back-24px.svg";
import axios from "axios";
import { Link } from "react-router-dom";

class EditInventoryPage extends Component {
  state = {
    quantityStyle: "edit-inv__quantity-container",
    warehouseList: null,
    itemName: localStorage.itemName || "",
    description: localStorage.description || "",
    quantity: localStorage.quantity || 0,
    status: "In Stock",
    warehouseName: "",
    category: "",
    warehouseId: "",
  };

  handleStatusChange = (e) => {
    if (e.target.value === "Out of Stock") {
      this.setState({
        quantityStyle:
          "edit-inv__quantity-container edit-inv__quantity-container--display",
        status: "Out of Stock",
        quantity: 0,
      });
    } else if (e.target.value === "In Stock") {
      this.setState({
        quantityStyle: "edit-inv__quantity-container",
        status: "In Stock",
        quantity: localStorage.quantity,
      });
    }
  };

  populateWarehouseList = () => {
    let warehouseData = [];
    axios
      .get(`https://apps-server-instock.herokuapp.com/warehouses`)
      .then((response) => {
        response.data.map((warehouse) => {
          return warehouseData.push({
            warehouseName: warehouse.name,
            warehouseId: warehouse.id,
          });
        });
      });
    this.setState({
      warehouseList: warehouseData,
    });
  };

  handleNameChange = (e) => {
    this.setState({
      itemName: e.target.value,
    });
    localStorage.itemName = e.target.value;
  };

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
    localStorage.description = e.target.value;
  };

  handleQuantityChange = (e) => {
    this.setState({
      quantity: e.target.value,
    });
    localStorage.quantity = e.target.value;
  };

  handleWarehouseChange = (e) => {
    let selectedWarehouse = this.state.warehouseList.find((warehouse) => {
      return warehouse.warehouseName === e.target.value;
    });
    this.setState({
      warehouseName: e.target.value,
      warehouseId: selectedWarehouse.warehouseId,
    });
  };

  handleCategoryChange = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.itemName) {
      window.alert("Please give an item name!");
    } else if (!this.state.description) {
      window.alert("Please give an item description!");
    } else if (this.state.status === "In Stock" && this.state.quantity <= 0) {
      window.alert("Quantity can not be 0 or less for In Stock items!");
    } else if (!this.state.category) {
      window.alert("Please select an item category!");
    } else if (!this.state.warehouseName) {
      window.alert("Please select a warehouse!");
    } else {
      const inventoryID = window.location.pathname.substring(15);
      axios
        .put(
          `https://apps-server-instock.herokuapp.com/inventory${inventoryID}`,
          {
            warehouseID: this.state.warehouseId,
            warehouseName: this.state.warehouseName,
            itemName: this.state.itemName,
            description: this.state.description,
            category: this.state.category,
            status: this.state.status,
            quantity: this.state.quantity,
          }
        )
        .then((response) => {
          window.location.assign(`/inventory/`);
          localStorage.clear();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  componentDidMount = () => {
    this.populateWarehouseList();
  };

  render() {
    const { warehouseList } = this.state;

    if (!warehouseList) {
      return <main className="loading">Loading</main>;
    }

    return (
      <main className="edit-inv">
        <section className="edit-inv__container">
          <div className="edit-inv__title-container">
            <Link to={"/inventory"}>
              <img
                className="edit-inv__icon"
                src={backArrowIcon}
                alt="back arrow"
              />
            </Link>
            <h1 className="edit-inv__title">Edit Inventory Item</h1>
          </div>
          <form onSubmit={this.handleSubmit} className="edit-inv__form">
            <div className="edit-inv__details-container">
              <div className="edit-inv__details">
                <h2 className="edit-inv__sub-title">Item Details</h2>
                <label className="edit-inv__label" htmlFor="name">
                  Item Name
                </label>
                <input
                  className="edit-inv__input"
                  name="name"
                  placeholder="Item Name"
                  onChange={this.handleNameChange}
                  value={this.state.itemName}
                />
                <label className="edit-inv__label" htmlFor="description">
                  Description
                </label>
                <input
                  className="edit-inv__input edit-inv__input--description"
                  name="description"
                  placeholder="Please enter a brief item description..."
                  onChange={this.handleDescriptionChange}
                  value={this.state.description}
                />
                <label className="edit-inv__label" htmlFor="category">
                  Category
                </label>
                <select
                  className="edit-inv__select"
                  required
                  name="category"
                  onChange={this.handleCategoryChange}
                >
                  <option value="">Please select</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Gear">Gear</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Health">Health</option>
                </select>
              </div>
              <div className="edit-inv__details">
                <h2 className="edit-inv__sub-title">Item Availability</h2>
                <p className="edit-inv__label">Status</p>
                <div className="edit-inv__radio-container">
                  <div className="edit-inv__radio">
                    <input
                      className="edit-inv__option"
                      type="radio"
                      id="in_stock"
                      name="status"
                      value="In Stock"
                      defaultChecked
                      onChange={this.handleStatusChange}
                    />
                    <label className="edit-inv__radio-text" htmlFor="in_stock">
                      In stock
                    </label>
                  </div>
                  <div className="edit-inv__radio">
                    <input
                      className="edit-inv__option"
                      type="radio"
                      id="out_of_stock"
                      name="status"
                      value="Out of Stock"
                      onChange={this.handleStatusChange}
                    />
                    <label
                      className="edit-inv__radio-text"
                      htmlFor="out_of_stock"
                    >
                      Out of stock
                    </label>
                  </div>
                </div>
                <div className={this.state.quantityStyle}>
                  <label className="edit-inv__label" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    className="edit-inv__input"
                    name="quantity"
                    onChange={this.handleQuantityChange}
                    value={this.state.quantity}
                  />
                </div>
                <label className="edit-inv__label" htmlFor="warehouse">
                  Warehouse
                </label>
                <select
                  className="edit-inv__select"
                  required
                  name="warehouse"
                  onChange={this.handleWarehouseChange}
                >
                  <option value="">Please select</option>
                  {warehouseList.map((warehouse) => (
                    <option
                      key={warehouse.warehouseId}
                      value={warehouse.warehouseName}
                    >
                      {warehouse.warehouseName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="edit-inv__button-container">
              <Link to={"/inventory"} className="edit-inv__cancel-link">
                <button className="edit-inv__button edit-inv__button--cancel">
                  Cancel
                </button>
              </Link>
              <button type="submit" className="edit-inv__button">
                Save
              </button>
            </div>
          </form>
        </section>
      </main>
    );
  }
}

export default EditInventoryPage;
