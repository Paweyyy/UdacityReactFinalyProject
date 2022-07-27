import * as React from 'react';
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setAuthedUser } from '../actions/authedUser';

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const LoginPage = ({ users, questions, dispatch }) => {
  const navigate = useNavigate();
  const search = new URLSearchParams(useLocation().search);
  const routerqid = search.get("id")

  const handleSelect = e => {
    if(e.target.value !== ""){
      dispatch(setAuthedUser(e.target.value));
      console.log(routerqid)
      if(routerqid === null || typeof(routerqid) === "undefined"){
        navigate("/")
      }else if(Object.keys(questions).includes(routerqid)){
          navigate(`/questions/${routerqid}`)
      }else{
          navigate(`/404`)
      }
    }
  }

  return (
    <div className='pageContainer loginContainer'>
      <h1 className=''>Employee Polls</h1>
      <img alt="Login Img" className='loginImg' src='employee.jpeg'/>
      <p>Please select your username:</p>
      <select data-testid={"username-selection"} onChange={handleSelect} name="pets" id="pet-select">
          <option value="">--Please choose your username--</option>
          {users.map(user => {
            return <option key={user} value={user}>{user}</option>
          })
          }
      </select>


    </div>
  );
}

const mapStateToProps = ({ questions, users, dispatch }, props) => {
  return { 
    users: Object.keys(users), 
    dispatch,
    questions,
  }
}

export default withRouter(connect(mapStateToProps)(LoginPage));