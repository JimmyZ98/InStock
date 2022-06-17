import { Component } from "react";
import "./AddInventoryPage.scss";
import backArrowIcon from '../../assets/Icons/arrow_back-24px.svg';

class AddInventoryPage extends Component {

  state = { 

   } 

  render() { 

    return (
      <main className="new-inventory">
      <section className="new-inventory__container">
        <div className="new-inventory__title-container">
          <img className="new-inventory__icon" src={backArrowIcon} alt='back'/>
          <h1 className="new-inventory__title">Add New Inventory Item</h1>
        </div>
        <form className="new-inventory__form">
          <div className="new-inventory__details-container">
            <h2 className="new-inventory__sub-title">Item Details</h2>
            <label className="new-inventory__label" htmlFor="name">Item Name</label>
            <input className="new-inventory__input" id="name" placeholder="Item Name"/>
            <label className="new-inventory__label" htmlFor="description">Description</label>
            <input className="new-inventory__input new-inventory__input--description" id="description" placeholder="Please enter a brief item description..."/>
            <label className="new-inventory__label" htmlFor="category">Category</label>
            <select className="new-inventory__select" required id="category">
              <option value=''>Please select</option>
            </select>
          </div>
          <div className="new-inventory__availability-container">
            <h2 className="new-inventory__sub-title">Item Availability</h2>
            <p className="new-inventory__label">Status</p>
            <div className="new-inventory__radio-container">
              <div className="new-inventory__radio">
                <input type="radio" id="in_stock" name="status" value="In Stock" checked/>
                <label for="in_stock">In stock</label>
              </div>
              <div className="new-inventory__radio">
                <input type="radio" id="out_of_stock" name="status" value="Out of Stock"/>
                <label for="out_of_stock">Out of stock</label>
              </div>
            </div>
            <label className="new-inventory__label" htmlFor="quantity">Quantity</label>
            <input className="new-inventory__input" id="quantity" value='0'/>
            <label className="new-inventory__label" htmlFor="warehouse">Warehouse</label>
            <select className="new-inventory__select" required id="warehouse">
              <option value=''>Please select</option>
            </select>
            <div className="new-inventory__button-container">
              <button className="new-inventory__button new-inventory__button--cancel">Cancel</button>
              <button className="new-inventory__button">+ Add Item</button>
            </div>
          </div>
        </form>
      </section>
    </main>
    );
  }
}
 
export default AddInventoryPage;