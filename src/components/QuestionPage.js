import * as React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/questions";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = ({ id, author, avatarUrl, option_1, option_2, voted_option_1, voted_option_2, questionAnswered, dispatch, authedUser }) => {
    return (
        <div className="pagecontainer">
            <h3>{`Poll by ${author}`}</h3>
            <img src={avatarUrl} alt="Avatar Img" className="questionImg" />
            <h3>Would you rather</h3>
            {
                questionAnswered ? <p className="info">You already voted on this poll</p> : null
            }
            <div className="answerContainer" style={{"marginTop": questionAnswered ? "30px" : "75px" }}>
                <QuestionAnswerOption 
                    id={id}
                    oid={1}
                    answered={questionAnswered} 
                    option={option_1} 
                    voters={voted_option_1.length} 
                    percVoters={voted_option_1.length / (voted_option_1.length + voted_option_2.length)*100}
                    authedUser={authedUser}
                    dispatch={dispatch}  />
                <QuestionAnswerOption 
                    id={id}
                    oid={2}
                    answered={questionAnswered} 
                    option={option_2} 
                    voters={voted_option_2.length} 
                    percVoters={voted_option_2.length / (voted_option_1.length + voted_option_2.length)*100}
                    authedUser={authedUser}
                    dispatch={dispatch}  />
            </div>
        </div>
    )
}

const QuestionAnswerOption = ({ id, oid, option, answered, voters, percVoters, authedUser, dispatch }) => {
    
    const question_id = id;

    const handleClick = e => {
        e.preventDefault();

        dispatch(
            handleAnswerQuestion({
                id: question_id,
                authedUser: authedUser,
                "optionChosen": option
            })
        );
    };

    React.useEffect(() => console.log(answered, oid),[answered, oid])

    return(
        <div className="answerBlock">
            {
                answered && answered === oid ? <p className="info">You have chosen this option:</p> : null
            }
            <div className="answerWrapper" style={{"border": answered && answered === oid ? "3px solid green" : null}}>
                <div className="answerText">{option}</div>
                <button disabled={answered ? true : false} onClick={handleClick} className="answerButton">Click</button>
            </div>
            {
                answered ? <p className="info">{`${voters} Voted for this option. This is ${percVoters}%`}</p> : null
            }
        </div>
    )
}

const mapStateToProps = ({ questions, users, authedUser, dispatch }, props) => {
    const { id } = props.router.params;

    const { author, option_1, option_2, voted_option_1, voted_option_2 } = questions[id];

    const questionAnswered = voted_option_1.includes(authedUser) ? 1 : voted_option_2.includes(authedUser) ? 2 : null;

    return {
        id,
        author,
        avatarUrl: users[author].avatarURL,
        option_1,
        option_2,
        voted_option_1,
        voted_option_2,
        questionAnswered,
        dispatch,
        authedUser
    };
  };
  
export default withRouter(connect(mapStateToProps)(QuestionPage));