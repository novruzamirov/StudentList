import {combineReducers} from 'redux';
import {getPayload} from '../utils';

const listOfUsersReducer = (listOfUsers = getPayload("idle", null), action) => {
    if(action.type === "LIST_OF_USERS") {
        return action.payload
    } else {
        return listOfUsers
    }
};


const selectedUserReducer = (selectedUser = null, action) => {
    return action.type === "SELECTED_FOR_ACTION" 
    ? action.payload
    : selectedUser
};

const deletedUserReducer = (deletedUser = getPayload("idle", null), action) => {
    return action.type === "DELETE_USER" 
    ? action.payload
    : deletedUser 
}

const showUserDataInfoPanelReducer = (visibility = false, action) => {
    return action.type === "USER_DATA_INFO_PANEL"
    ? action.payload
    : visibility
}

const addUserReducer = (addUser = getPayload("idle", null), action) => {
    return action.type === "ADD_USER"
    ? action.payload
    : addUser
}

const editUserReducer = (editUser = getPayload("idle", null), action) => {
    return action.type === "EDIT_USER"
    ? action.payload
    : editUser
} 

export default combineReducers({
    listOfUsers: listOfUsersReducer,
    selectedUser: selectedUserReducer,
    deletedUser: deletedUserReducer,
    showUserDataInfoPanel: showUserDataInfoPanelReducer,
    addedUser: addUserReducer,
    editedUser: editUserReducer
});


