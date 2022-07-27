import { connect } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ authedUser }) => {
    return authedUser ? <Outlet/> : <Navigate to='/login'/>
}

const mapStateToProps = ({ authedUser }) => {
    return(
        { "authedUser": authedUser }
    );
};

export default connect(mapStateToProps)(ProtectedRoute);


