import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { setAuthedUser } from "../actions/authedUser";

const Nav = ({ authedUser, dispatch }) => {
  const location = useLocation();

  useEffect(() => {
    console.log(authedUser);
  },[authedUser])

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(setAuthedUser(null))
  }

  return (
    <nav className="nav">
        <ul>
          <li className={location.pathname === "/" ? "active" : "inactive"}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === "/new" ? "active" : "inactive"}>
            <Link to="/new">New</Link>
          </li>
          <li className={location.pathname === "/leaderboard" ? "active" : "inactive"}>
              <Link to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
        <ul>
          <li className="profile">
              <img src={authedUser.avatarURL} alt="Profile img" className="avatar" />
              <Link to="/" style={{ "paddingLeft": "10px" }}>{authedUser.id}</Link>
          </li>
          <li>
            <p className="logout" onClick={handleLogout}>Logout</p>
          </li>
        </ul>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users, dispatch }) => {
  return{
    "authedUser": users[authedUser],
    "dispatch": dispatch
  }
}

export default connect(mapStateToProps)(Nav);