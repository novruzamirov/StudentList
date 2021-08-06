import React from 'react';
import emptyUserListIcon from '../images/note.svg';

const EmptyUserList = () => {
    return (
        <div className="empty-list">
            <img src={emptyUserListIcon} alt="list" />
            <h5>No users yet</h5>
        </div>
    )
}

export default EmptyUserList;