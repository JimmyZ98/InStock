import { Component } from "react";
import axios from "axios";
import "./InventoryDetailsPage.scss";
import backArrowIcon from "../../assets/Icons/arrow_back-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080";

class InventoryDetailsPage extends Component {
  state = {
    invetoryDetails: null,
  };

  componentDidMount() {
    axios
      .get(`${API_URL}/inventory/${this.props.match.params.inventoryId}`)
      .then((res) => {
        this.setState({ inventoryDetails: res.data });
      });
  }

  render() {

    const { inventoryDetails } = this.state;

    return (
      <main className="inv-details">
        <div className="inv-details__container">
          <section className="inv-details__title-container">
            <div className="inv-details__title-container-left">
              <Link to={"/inventory"}>
                <img
                  className="inv-details__icon"
                  src={backArrowIcon}
                  alt="back arrow"
                />
              </Link>
              <h1 className="inv-details__title">
                {inventoryDetails?.itemName}
              </h1>
            </div>
            <div className="inv-details__title-container-right">
              <Link
                to={`/inventory/edit/${this.props.match.params.inventoryId}`}
                className="inv-details__edit-link"
              >
                <button className="inv-details__edit">
                  <img
                    className="inv-details__edit-icon"
                    src={editIcon}
                    alt="edit"
                  />
                  <p className="inv-details__edit-text">Edit</p>
                </button>
              </Link>
            </div>
          </section>
          <section className="inv-details__body-container">
            <div className="inv-details__left">
              <div className="inv-details__details">
                <p className="inv-details__sub-heading">ITEM DESCRIPTION:</p>
                <p className="inv-details__text">
                  {inventoryDetails?.description}
                </p>
              </div>
              <div className="inv-details__details inv-details__category">
                <p className="inv-details__sub-heading">CATEGORY:</p>
                <p className="inv-details__text">
                  {inventoryDetails?.category}
                </p>
              </div>
            </div>
            <div className="inv-details__right">
              <div className="inv-details__status-quantity">
                <div className="inv-details__details inv-details__status-container">
                  <p className="inv-details__sub-heading">STATUS:</p>
                  <p
                    className={
                      inventoryDetails?.status === "In Stock"
                        ? "inv-details__status inv-details__status-in"
                        : "inv-details__status inv-details__status-out"
                    }
                  >
                    {inventoryDetails?.status}
                  </p>
                </div>
                <div className="inv-details__details inv-details__quantity-container">
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
