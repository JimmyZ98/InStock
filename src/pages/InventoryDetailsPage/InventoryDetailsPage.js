import { Component } from "react";
import axios from "axios";
import "./InventoryDetailsPage.scss";
import backArrowIcon from "../../assets/Icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080";

class InventoryDetailsPage extends Component {
  state = {
    invetoryDetails: null,
  };

  componentDidMount() {
    const inventoryID = window.location.pathname.substring(10);
    axios.get(`${API_URL}/inventory${inventoryID}`).then((res) => {
      this.setState({ inventoryDetails: res.data });
      console.log(res.data);
    });
  }

  render() {
    const { inventoryDetails } = this.state;

    return (
      <main className="inv-details">
        <div className="inv-details__container">
          <section className="inv-details__title-container">
            <Link to={"/inventory"}>
              <img
                className="inv-details__icon"
                src={backArrowIcon}
                alt="back arrow"
              />
            </Link>
            <h1 className="inv-details__title">{inventoryDetails?.itemName}</h1>
          </section>
          <section className="inv-details__body-container">
            <div className="inv-details__left">
              <div className="inv-details__details">
                <p className="inv-details__sub-heading">ITEM DESCRIPTION:</p>
                <p className="inv-details__text">
                  {inventoryDetails?.description}
                </p>
              </div>
              <div className="inv-details__details">
                <p className="inv-details__sub-heading">CATEGORY:</p>
                <p className="inv-details__text">
                  {inventoryDetails?.category}
                </p>
              </div>
            </div>
            <div className="inv-details__right">
              <div className="inv-details__status-quantity">
                <div className="inv-details__details">
                  <p className="inv-details__sub-heading">STATUS:</p>
                  <p className="inv-details__text">
                    {inventoryDetails?.status.toUpperCase()}
                  </p>
                </div>
                <div className="inv-details__details">
                  <p className="inv-details__sub-heading">QUANTITY:</p>
                  <p className="inv-details__text">
                    {inventoryDetails?.quantity}
                  </p>
                </div>
              </div>
              <div className="inv-details__details">
                <p className="inv-details__sub-heading">WAREHOUSE:</p>
                <p className="inv-details__text">
                  {inventoryDetails?.warehouseName}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }
}
export default InventoryDetailsPage;
