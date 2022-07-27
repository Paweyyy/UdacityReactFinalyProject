import { connect } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom'
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} router={{ location, navigate, params }} />;
    };
  
    return ComponentWithRouterProp;
  };

export const ProtectedRoute = ({ authedUser, id }) => {
    return authedUser ? <Outlet/> : id ? <Navigate to={`/login?id=${id}`}/> : <Navigate to='/login'/>
}

const mapStateToProps = ({ authedUser }, props) => {
    const { id } = props.router.params;

    return(
        { "authedUser": authedUser, "id": id }
    );
};

export default withRouter(connect(mapStateToProps)(ProtectedRoute));


