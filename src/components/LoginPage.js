import * as React from 'react';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthedUser } from '../actions/authedUser';

const LoginPage = ({ users, dispatch }) => {
  const navigate = useNavigate();

  const handleSelect = e => {
    if(e.target.value !== ""){
      dispatch(setAuthedUser(e.target.value));
      navigate("/")
    }
  }

  return (
    <div className='pageContainer loginContainer'>
      <h1 className=''>Employee Polls</h1>
      <img alt="Login Img" className='loginImg' src='employee.jpeg'/>
      <p>Please select your username:</p>
      <select onChange={handleSelect} name="pets" id="pet-select">
          <option value="">--Please choose your username--</option>
          {users.map(user => {
            return <option value={user}>{user}</option>
          })
          }
      </select>


    </div>
  );
}

const mapStateToProps = ({ users, dispatch }) => {
  return {users: Object.keys(users), dispatch}
}

export default connect(mapStateToProps)(LoginPage);