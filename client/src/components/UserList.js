import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getAllUsers, clearSelectedUser, deleteUser} from '../actions';

import Loading from './Loading';
import UserListItem from './UserListItem';
import EmptyUserList from './EmptyUserList';
import ConfirmationModal from './ConfirmationModal';

const UserList = () => {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.listOfUsers);
    const selectedUser = useSelector(state => state.selectedUser);
    const deletedUser = useSelector(state => state.deletedUser);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);
    
    useEffect(() => {
        if(deletedUser.status === "success"){
            dispatch(clearSelectedUser());
            dispatch(getAllUsers());
        }
    }, [deletedUser.status, dispatch])

    const handleModalClose = () => {
        dispatch(clearSelectedUser());
    }

    const handleModalConfirm = () => {
        dispatch(deleteUser(selectedUser.data.id));
    }

    const renderTableHeading = () => {
        return (
            <thead>
                <tr>
                    <td>Full Name</td>
                    <td>Age</td>
                    <td>Gender</td>
                    <td>Mail</td>
                    <td>#id</td>
                    <td>Actions</td>
                </tr>
            </thead>
        )
    }

    return (
        <div className="student-list">
            <h1>Student List</h1>
            <table>
                {renderTableHeading()}
                {
                    userList.status === "success"
                    //  redundant check && userList.data.length
                    && userList.data.map(user => <UserListItem user={user} key={user.id}/>)}
            </table>
            {userList.status === "pending" && <Loading />}
            {
                userList.status === "success"
                && !userList.data.length
                && <EmptyUserList />
            }
            <ConfirmationModal 
                isModalOpen={Boolean(selectedUser) && selectedUser.actionType === "delete"}
                handleModalClose={handleModalClose}
                message={`Are you sure to delete ${selectedUser?.data.name} ${selectedUser?.data.surname}?`}
                handleConfirm={handleModalConfirm}
                isLoading={deletedUser.status === "pending"}
                data={selectedUser?.data.id}
            />
        </div>
    )
}

export default UserList;