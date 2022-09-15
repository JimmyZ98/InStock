import { Component } from "react";
import "./DetailsListItem.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import chevron from "../../assets/Icons/chevron_right-24px.svg";
import edit from "../../assets/Icons/edit-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import closeIcon from "../../assets/Icons/close-24px.svg";
import Modal from "react-modal";

class DetailsListItem extends Component {
  state = {
    showModal: false,
  };

  handleOpenModal = () => {
    this.setState({
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  deleteRequest = (id) => {
    axios
      .delete(`https://apps-server-instock.herokuapp.com/inventory/${id}`)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleDeleteClick = () => {
    this.deleteRequest(this.props.id);
  };

  render() {
    return (
      <div className="inventory__item" key={this.props.id}>
        <Modal
          isOpen={this.state.showModal}
          ariaHideApp={false}
          className="delete-modal"
          overlayClassName="delete-modal__container"
        >
          <div>
            <div className="delete-modal__icon-container">
              <img
                className="delete-modal__icon"
                src={closeIcon}
                alt="cancel"
                onClick={this.handleCloseModal.bind(this)}
              />
            </div>
            <div className="delete-modal__text-container">
              <h2 className="delete-modal__title">
                Delete {this.props.itemName} inventory item?
              </h2>
              <p className="delete-modal__text">
                Please confirm that you’d like to delete {this.props.itemName}{" "}
                from the inventory list. You won’t be able to undo this action.
              </p>
            </div>
          </div>
          <div className="delete-modal__button-container">
            <button
              className="delete-modal__button delete-modal__button--cancel"
              onClick={this.handleCloseModal.bind(this)}
            >
              Cancel
            </button>
            <button
              className="delete-modal__button"
              onClick={this.handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </Modal>
        <div className="inventory__info inventory__info--left-container">
          <div className="inventory__info__item-container">
            <h6 className="inventory__info__heading">INVENTORY ITEM</h6>
            <div className="inventory__info__name-container">
              <NavLink
                to={`/inventory/${this.props.id}`}
                className="inventory__item-link"
              >
                <p className="inventory__name">{this.props.itemName}</p>
              </NavLink>
              <img className="inventory__chevron" src={chevron} alt="chevron" />
            </div>
          </div>
          <div className="inventory__info__category-container">
            <h6 className="inventory__info__heading">CATEGORY</h6>
            <p className="inventory__category">{this.props.category}</p>
          </div>
        </div>
        <div className="inventory__info inventory__info--right-container">
          <div className="inventory__info__status-container">
            <h6 className="inventory__info__heading">STATUS</h6>
            <p
              className={
                this.props.status === "In Stock"
                  ? "inventory__status inventory__status-in"
                  : "inventory__status inventory__status-out"
              }
            >
              {this.props.status.toUpperCase()}
            </p>
          </div>
          <div className="inventory__info__qty-container">
            <h6 className="inventory__info__heading">QTY</h6>
            <p className="inventory__quantity">{this.props.quantity}</p>
          </div>
        </div>
        <div className="inventory__actions-container">
          <img
            className="inventory__delete"
            src={deleteIcon}
            alt="delete"
            onClick={this.handleOpenModal.bind(this)}
          />
          <NavLink
            to={`/inventory/edit/${this.props.id}`}
            className="inventory__edit-link"
          >
            <img className="inventory__edit" src={edit} alt="edit" />
          </NavLink>
        </div>
      </div>
    );
  }
}

export default DetailsListItem;
