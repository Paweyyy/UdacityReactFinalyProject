import * as React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/shared";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = ({ id, author, avatarUrl, optionOne, optionTwo, dispatch, answeredQuestion, authedUser }) => {
    const navigate = useNavigate();
    
    if(!id){
        navigate("/404")
    }

    return (
        <div className="pagecontainer">
            <h3>{`Poll by ${author}`}</h3>
            <img src={avatarUrl} alt="Avatar Img" className="questionImg" />
            <h3>Would you rather</h3>
            {
                answeredQuestion ? <p className="info">You already voted on this poll</p> : null
            }
            <div className="answerContainer" style={{"marginTop":  answeredQuestion ? "30px" : "75px" }}>
                <QuestionAnswerOption 
                    id={id}
                    oid={1}
                    option={optionOne}
                    voters={optionOne.votes.length} 
                    percVoters={optionOne.votes.length / (optionOne.votes.length + optionTwo.votes.length)*100}
                    authedUser={authedUser}
                    dispatch={dispatch}
                    answeredQuestion={answeredQuestion}  />
                <QuestionAnswerOption 
                    id={id}
                    oid={2}
                    option={optionTwo} 
                    voters={optionTwo.votes.length} 
                    percVoters={optionTwo.votes.length / (optionOne.votes.length + optionTwo.votes.length)*100}
                    authedUser={authedUser}
                    dispatch={dispatch} 
                    answeredQuestion={answeredQuestion} />
            </div>
        </div>
    )
}

const QuestionAnswerOption = ({ id, oid, option, voters, percVoters, authedUser, dispatch, answeredQuestion }) => {
    
    const question_id = id;

    const handleClick = e => {
        e.preventDefault();

        dispatch(
            handleAnswerQuestion({
                qid: question_id,
                authedUser: authedUser,
                "answer": oid === 1 ? "optionOne" : "optionTwo"
            })
        );
    };

    return(
        <div className="answerBlock">
            {
                option.votes.includes(authedUser) ? <p className="info">You have chosen this option:</p> : null
            }
            <div className="answerWrapper" style={{"border": option.votes.includes(authedUser) ? "3px solid green" : null}}>
                <div className="answerText">{option.text}</div>
                <button disabled={answeredQuestion} onClick={handleClick} className="answerButton">Click</button>
            </div>
            {
                answeredQuestion ? <p className="info">{`${voters} Voted for this option. This is ${percVoters}%`}</p> : null
            }
        </div>
    )
}

const mapStateToProps = ({ questions, users, authedUser, dispatch }, props) => {
    const { id } = props.router.params;

    if(!Object.keys(questions).includes(id)){
        return{
            id: null,
            author: null,
            avatarURL: null,
            optionOne: null,
            optionTwo: null,
            dispatch: null,
            answeredQuestion: null,
            authedUser: null
        }
    }else{
        const { author, optionOne, optionTwo } = questions[id];

        const answeredQuestion = optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser);
    
        return {
            id,
            author,
            avatarUrl: users[author].avatarURL,
            optionOne,
            optionTwo,
            dispatch,
            answeredQuestion,
            authedUser
        };
    }
  };
  
export default withRouter(connect(mapStateToProps)(QuestionPage));