import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedUser, showUserDataInfoPanel } from '../actions';
import addUserIcon from '../images/plus.svg';

const AddUser = () => {
    const dispatch = useDispatch();
    const userInfoPanelVisibility = useSelector(state => state.showUserDataInfoPanel)
    const selectedUser = useSelector(state => state.selectedUser);


    useEffect(() => {
        if(!userInfoPanelVisibility){
            dispatch(clearSelectedUser());
        }
    }, [userInfoPanelVisibility, dispatch])

    useEffect(() => {
        if(selectedUser?.actionType === "edit"){
            dispatch(showUserDataInfoPanel(true))
        }
    }, [selectedUser, dispatch])

    return (
        <div className={
                `add-user ${!userInfoPanelVisibility
                    ? "add-user-open"
                    : "add-user-closed"
                }
            `
            } onClick={
                () => {
                    dispatch(showUserDataInfoPanel(!userInfoPanelVisibility))
                }
            }
        >
            <img src={addUserIcon} alt="add" />
        </div>
    )
}

export default AddUser; 