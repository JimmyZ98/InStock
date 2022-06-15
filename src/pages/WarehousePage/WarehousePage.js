import { Component } from 'react';
import "./WarehousePage.scss";
import WarehouseListItem from '../../components/WarehouseListItem/WarehouseListItem';
import sortIcon from '../../assets/Icons/sort-24px.svg';
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
      <div className='page__background'>
        <section className='warehouses'>
          <div className='warehouses__container'>
            <h1 className='warehouses__title'>Warehouses</h1>
            <div>
              <input className='warehouses__search' placeholder='Search...'/>
              <button className='warehouses__button'>+Add New Warehouse</button>
            </div>
          </div>
          <div className='warehouses__sort-bar'>
            <div className='warehouses__sort-info-wrapper'>
              <div className='warehouses__sort-text-container'>
                <p className='warehouses__sort-text'>WAREHOUSE</p>
                <img className='warehouses__sort-icon' src={sortIcon} alt='sort'/>
              </div>
              <div className='warehouses__sort-text-container'>
                <p className='warehouses__sort-text'>ADDRESS</p>
                <img className='warehouses__sort-icon' src={sortIcon} alt='sort'/>
              </div>
              <div className='warehouses__sort-text-container'>
                <p className='warehouses__sort-text'>CONTACT NAME</p>
                <img className='warehouses__sort-icon' src={sortIcon} alt='sort'/>
              </div>
              <div className='warehouses__sort-text-container'>
                <p className='warehouses__sort-text'>CONTACT INFORMATION</p>
                <img className='warehouses__sort-icon' src={sortIcon} alt='sort'/>
              </div>
            </div>
            <p className='warehouses__sort-text'>ACTIONS</p>
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
      </div>
    );
  }
}
 
export default WarehousePage;