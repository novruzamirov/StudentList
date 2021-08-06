import React from 'react';
import cancelIcon from '../images/cancel.svg';
import Loading from './Loading';

const ConfirmationModal = ({
    handleConfirm, 
    isModalOpen, 
    message, 
    handleModalClose,  
    isLoading
}) => {
    return(
        <div className={`confirmation-modal-bg ${!isModalOpen && "hidden"}`}>
            <div className="confirmation-modal">
                <p>{message}</p>
                {
                    isLoading
                    ? <div style={{position: "relative", textAlign: "center"}}><Loading /></div>
                    : (
                        <div className="modal-buttons">
                            <button onClick={handleModalClose}>Reject</button>
                            <button onClick={handleConfirm}>Confirm</button>
                        </div>
                    )
                }
                <img src={cancelIcon} alt="cancel" className="close-icon" onClick={handleModalClose}/>
            </div>
        </div>  
    )
}

export default ConfirmationModal;