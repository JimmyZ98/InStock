import { Component } from "react";
import { Link } from "react-router-dom";
import "./WarehousePage.scss";
import WarehouseListItem from "../../components/WarehouseListItem/WarehouseListItem";
import sortIcon from "../../assets/Icons/sort-24px.svg";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class WarehousePage extends Component {
  state = {
    warehouseList: null,
  };

  componentDidMount() {
    axios.get(`${API_URL}warehouses`).then((response) => {
      this.setState({
        warehouseList: response.data,
      });
    });
  }

  render() {
    const { warehouseList } = this.state;

    if (!warehouseList) {
      return <main>Loading, please wait...</main>;
    }

    return (
      <div className="page__background">
        <section className="warehouses">
          <div className="warehouses__container">
            <h1 className="warehouses__title">Warehouses</h1>
            <div>
              <input className="warehouses__search" placeholder="Search..." />
              <Link to={"/warehouse/add"}>
                <button className="warehouses__button">
                  +Add New Warehouse
                </button>
              </Link>
            </div>
          </div>
          <div className="warehouses__sort-bar">
            <div className="warehouses__sort-info-wrapper">
              <div className="warehouses__sort-text-container">
                <p className="warehouses__sort-text">WAREHOUSE</p>
                <img
                  className="warehouses__sort-icon"
                  src={sortIcon}
                  alt="sort"
                />
              </div>
              <div className="warehouses__sort-text-container">
                <p className="warehouses__sort-text">ADDRESS</p>
                <img
                  className="warehouses__sort-icon"
                  src={sortIcon}
                  alt="sort"
                />
              </div>
              <div className="warehouses__sort-text-container">
                <p className="warehouses__sort-text">CONTACT NAME</p>
                <img
                  className="warehouses__sort-icon"
                  src={sortIcon}
                  alt="sort"
                />
              </div>
              <div className="warehouses__sort-text-container">
                <p className="warehouses__sort-text">CONTACT INFORMATION</p>
                <img
                  className="warehouses__sort-icon"
                  src={sortIcon}
                  alt="sort"
                />
              </div>
            </div>
            <p className="warehouses__sort-text">ACTIONS</p>
          </div>
          <ul className="warehouses__list">
            {warehouseList.map((warehouse) => (
              <WarehouseListItem key={warehouse.id} {...warehouse} />
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

export default WarehousePage;
