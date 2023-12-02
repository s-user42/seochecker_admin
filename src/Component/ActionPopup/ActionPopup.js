import './actionPopup.scss';
import close_button from '../../images/icons/close_button.png';

const ActionPopup = ({unshowPopup}) => {

  return (
    <div className='popup--wrapper'>
        <div className="popup--contanier">
            <img 
            src={close_button} 
            alt="close button" 
            className='close-button' 
            onClick={() => unshowPopup()}/>
        </div>
    </div>
  )
}

export default ActionPopup