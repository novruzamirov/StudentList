import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addUser, getAllUsers, editUser, showUserDataInfoPanel} from '../actions'
import Loading from './Loading';

const UserInfoPanel = () => {
    const userInfoPanelVisibility = useSelector(state => state.showUserDataInfoPanel);
    const addedUser = useSelector(state => state.addedUser);
    const selectedUser = useSelector(state => state.selectedUser);
    const editedUser = useSelector(state => state.editedUser);
    const dispatch = useDispatch();

    const resetForm = () => {
        setName("");
        setSurname("");
        setAge("");
        setMail("");
        setGender("M");
        setImageUrl("");
    }

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState("");
    const [mail, setMail] = useState("");
    const [gender, setGender] = useState("M");
    const [imgUrl, setImageUrl] = useState("");


    const isEditButtonDisabled = () => 
        selectedUser.data.name === name
        && selectedUser.data.surname === surname
        && selectedUser.data.age === age
        && selectedUser.data.mail === mail
        && selectedUser.data.gender === gender
    

    const isAddButtonDisabled = () => 
            Boolean(name)
            && Boolean(surname)
            && Boolean(age)
            && Boolean(mail)
            && Boolean(imgUrl)

    useEffect(() => {   
        if(editedUser.status === "success"){
            dispatch(getAllUsers());
            resetForm();
            dispatch(showUserDataInfoPanel(false))
        }

    }, [editedUser, dispatch])

    useEffect(() => {
        if(selectedUser?.actionType === "edit"){
            setName(selectedUser.data.name);
            setSurname(selectedUser.data.surname);
            setAge(selectedUser.data.age);
            setMail(selectedUser.data.mail);
            setGender(selectedUser.data.gender);
            setImageUrl(selectedUser.data.imgUrl);
        }
    }, [selectedUser, dispatch])

    useEffect(() => {
        if(!userInfoPanelVisibility){
            resetForm();
        }
    }, [userInfoPanelVisibility])

    useEffect(() => {
        if(addedUser.status === "success"){
            resetForm();
            dispatch(getAllUsers());
        }
    }, [addedUser, dispatch])

    return(
        userInfoPanelVisibility ?
        <div className="infopanel-wrapper">
            <div className="user-data">
                <h1>User Data</h1>
                {addedUser.status === "pending" ? <Loading /> : (
          <form className="form">
          <div>
              <label htmlFor="name">Student's name: </label><br />
              <input type="text" id="name" value={name} onChange={(e) => {setName(e.target.value)}}/>
          </div>

          <div>
              <label htmlFor="surname">Student's surname: </label><br />
              <input type="text" id="surname" value={surname} onChange={(e) => {setSurname(e.target.value)}} />
          </div>

          <div>
              <label htmlFor="age">Student's age: </label><br />
              <input type="number" id="age" value={age} onChange={(e) => {setAge(e.target.value)}} />
          </div>

          <div>
              <label htmlFor="mail">Student's mail: </label><br />
              <input type="text" id="mail" value={mail} onChange={(e) => {setMail(e.target.value)}} />
          </div>

          <div>
              <p>Gender</p>
              <label htmlFor="gender-m">Male</label>
              <input type="radio" name="gender" id="gender-m" defaultChecked value={gender} onChange={(e) => {setGender("M")}}/>

              <label htmlFor="gender-f">Female</label>
              <input type="radio" name="gender" id="gender-f" value={gender} onChange={(e) => {setGender("F")}}/>
          </div>

          <div>
          <label htmlFor="url">Image Url: </label>
              <input type="text" id="url" value={imgUrl} onChange={(e) => {setImageUrl(e.target.value)}}/>
          </div>

          <div>
              {
                  selectedUser?.actionType === "edit" ? 
                  (
                    <button disabled={isEditButtonDisabled()} onClick={(e) => {
                        e.preventDefault();
                        const userData = {
                            id: selectedUser.data.id,
                            name,
                            surname,
                            age,
                            gender,
                            imgUrl,
                            mail
                        }
                        dispatch(editUser(userData));
                    }}>
                        EDIT USER DATA
                    </button>
                  ) :
                  (
                        <button disabled={!isAddButtonDisabled()} 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const userData = {
                                            name,
                                            surname,
                                            age,
                                            gender,
                                            imgUrl,
                                            mail
                                        };
                                        dispatch(addUser(userData))
                                    }}
                                >
                                    Add User
                                </button>
                  )
            
              }
              
          </div>
      </form>
                )}
            </div>
  

           

        </div>
        : null
    )
}

export default UserInfoPanel;