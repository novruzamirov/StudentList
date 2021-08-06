import React from 'react';
import deleteIcon from '../images/delete.svg';
import editIcon from '../images/pencil.svg';
import { selectUser } from '../actions';
import { useDispatch } from 'react-redux';
import faker from 'faker';

const UserListItem = ({user}) => {
    const dispatch = useDispatch();
    return (
        <tbody>
            <tr>
                <td>
                    <div className="initials">
                        <img className="avatar" src={faker.image.avatar()} alt="img" />
                        <div>
                            {user.name + " " + user.surname}
                        </div>
                    </div>
                </td>
                <td>{user.age}</td>
                <td>{user.gender === "M" ? "Male" : "Female"}</td>
                <td>{user.mail}</td>
                <td>{user.id}</td>
                <td>
                    <div className="icons">
                        <img src={deleteIcon} alt="delete" onClick={() => {
                            dispatch(selectUser(user, "delete"));
                        }}/>
                        <img src={editIcon} alt="editIcon" onClick={() => {
                            dispatch(selectUser(user, "edit"));
                        }}/>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default UserListItem;