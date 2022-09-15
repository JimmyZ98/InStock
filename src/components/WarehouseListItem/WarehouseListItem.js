import "./WarehouseListItem.scss";
import "../../styles/delete-modal.scss";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import chevronRight from "../../assets/Icons/chevron_right-24px.svg";
import closeIcon from "../../assets/Icons/close-24px.svg";
import { Component } from "react";
import Modal from "react-modal";
import axios from "axios";

class WarehouseListItem extends Component {
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
      .delete(`https://apps-server-instock.herokuapp.com/warehouses/${id}`)
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
      <li className="warehouse">
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
                Delete {this.props.name} warehouse?
              </h2>
              <p className="delete-modal__text">
                Please confirm that you’d like to delete the {this.props.name}{" "}
                warehouse from the list of warehouses. You won’t be able to undo
                this action.
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
        <div className="warehouse__container">
          <div className="warehouse__grouping">
            <div className="warehouse__info-container">
              <p className="warehouse__sub-header">WAREHOUSE</p>
              <div className="warehouse__link">
                <Link to={`/warehouse/${this.props.id}`}>
                  <p className="warehouse__info warehouse__info--link">
                    {this.props.name}
                  </p>
                </Link>
                <img
                  className="warehouse__chevron"
                  src={chevronRight}
                  alt="link"
                />
              </div>
            </div>
            <div className="warehouse__info-container">
              <p className="warehouse__sub-header">ADDRESS</p>
              <p className="warehouse__info warehouse__info--address">
                {this.props.address}, {this.props.city}, {this.props.country}
              </p>
            </div>
          </div>
          <div className="warehouse__grouping">
            <div className="warehouse__info-container">
              <p className="warehouse__sub-header">CONTACT NAME</p>
              <p className="warehouse__info">{this.props.contactName}</p>
            </div>
            <div className="warehouse__info-container">
              <p className="warehouse__sub-header">CONTACT INFORMATION</p>
              <p className="warehouse__info">
                {this.props.contactPhone} {this.props.contactEmail}
              </p>
            </div>
          </div>
        </div>
        <div className="warehouse__icon-container">
          <img
            className="warehouse__icon"
            src={deleteIcon}
            alt="delete"
            onClick={this.handleOpenModal.bind(this)}
          />
          <Link
            className="warehouse__icon-link"
            to={`/warehouse/edit/${this.props.id}`}
          >
            <img className="warehouse__icon" src={editIcon} alt="edit" />
          </Link>
        </div>
      </li>
    );
  }
}

export default WarehouseListItem;
