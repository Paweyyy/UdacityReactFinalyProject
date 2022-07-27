import * as React from "react";
import { connect } from "react-redux"
import QuestionContainer from "./QuestionContainer"

const Dashboard = ({ openQuestionsId, doneQuestionsId }) => {
    return(
       <div className="pagecontainer" data-testid="success-screen">
            <QuestionsContainer questions={openQuestionsId} containerType={"New Questions"} />
            <QuestionsContainer questions={doneQuestionsId} containerType={"Done"} />
       </div>
    )
}

const QuestionsContainer = ({ containerType, questions }) => {
    return(
        <div className="questionContainer">
            <div className="headlineWrapper">
                <h3>{containerType}</h3>
            </div>
            <div className="questionsWrapper">
                {questions.map(question => {
                    return <QuestionContainer key={question} id={question}/>
                })}
            </div>
        </div>
    )
}


const mapStateToProps = ({ authedUser, questions }) => (
    {
        openQuestionsId: Object.keys(questions).filter(id => !questions[id].optionOne.votes.includes(authedUser) && !questions[id].optionTwo.votes.includes(authedUser)),
        doneQuestionsId: Object.keys(questions).filter(id => questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser)),
    }
);

export default connect(mapStateToProps)(Dashboard);