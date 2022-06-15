import './WarehouseListItem.scss';
import deleteIcon from '../../assets/Icons/delete_outline-24px.svg';
import editIcon from '../../assets/Icons/edit-24px.svg';
import chevronRight from '../../assets/Icons/chevron_right-24px.svg';

const WarehouseListItem = ({ id, name, address, city, country, contactName, contactPhone, contactEmail }) => {
  return ( 
    <li className='warehouse'>
      <div className='warehouse__container'>
        <div className='warehouse__grouping'>
          <div className='warehouse__info-container'>
            <p className='warehouse__sub-header'>WAREHOUSE</p>
            <div className='warehouse__link'>
            <p className='warehouse__info warehouse__info--link'>{name}</p>
            <img className='warehouse__icon' src={chevronRight} alt='link'/>
            </div>
          </div>
          <div className='warehouse__info-container'>
            <p className='warehouse__sub-header'>ADDRESS</p>
            <p className='warehouse__info'>{address}, {city}, {country}</p>
          </div>
        </div>
        <div className='warehouse__grouping'>
          <div className='warehouse__info-container'>
            <p className='warehouse__sub-header'>CONTACT NAME</p>
            <p className='warehouse__info'>{contactName}</p>
          </div>
          <div className='warehouse__info-container'>
            <p className='warehouse__sub-header'>CONTACT INFORMATION</p>
            <p className='warehouse__info'>{contactPhone} {contactEmail}</p>
          </div>
        </div>
      </div>
      <div className='warehouse__icon-container'>
        <img className='warehouse__icon' src={deleteIcon} alt='delete'/>
        <img className='warehouse__icon' src={editIcon} alt='edit'/>
      </div>
    </li>
   );
}
 
export default WarehouseListItem;