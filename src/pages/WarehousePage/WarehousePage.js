import { Component } from 'react';
import "./WarehousePage.scss";
import WarehouseListItem from '../../components/WarehouseListItem/WarehouseListItem';

class WarehousePage extends Component {

  state = {  } 

  render() { 
    return (
      <section className='warehouses'>
        <div className='warehouses__container'>
          <h1 className='warehouses__title'>Warehouses</h1>
          <input className='warehouses__search' placeholder='Search...'/>
          <button className='warehouses__button'>+Add New Warehouse</button>
        </div>
        <ul className='warehouses__list'>
          <WarehouseListItem />
        </ul>
      </section>
    );
  }
}
 
export default WarehousePage;