import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import NewQuestionPage from "./NewQuestionPage";
import QuestionPage from "./QuestionPage";
import Nav from "./Nav";
import LoginPage from "./LoginPage"
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import FourOFour from "./404"

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
        <div className="container">
          { props.loading ? null : <Nav />}
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/questions/:id" element={<QuestionPage />} />
              <Route path="/new" element={<NewQuestionPage />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/404" element={<FourOFour />} />
          </Routes>
        </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);