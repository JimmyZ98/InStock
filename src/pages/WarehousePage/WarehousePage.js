import { Component } from 'react';
import "./WarehousePage.scss";
import WarehouseListItem from '../../components/WarehouseListItem/WarehouseListItem';
import axios from 'axios';

class WarehousePage extends Component {

  state = { 
    warehouseList: null
  };

  componentDidMount() {
    axios.get('http://localhost:8080/warehouses')
      .then(response => {
        this.setState({
          warehouseList: response.data
        })
      })
  };

  render() { 
    const { warehouseList } = this.state;

    if(!warehouseList) {
      return <main>Loading, please wait...</main>
    }

    return (
      <section className='warehouses'>
        <div className='warehouses__container'>
          <h1 className='warehouses__title'>Warehouses</h1>
          <input className='warehouses__search' placeholder='Search...'/>
          <button className='warehouses__button'>+Add New Warehouse</button>
        </div>
        <ul className='warehouses__list'>
          {
            warehouseList.map(warehouse => (
              <WarehouseListItem 
                key={warehouse.id}
                {...warehouse}
              />
            ))
          }
        </ul>
      </section>
    );
  }
}
 
export default WarehousePage;