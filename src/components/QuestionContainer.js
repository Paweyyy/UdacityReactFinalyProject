import { connect } from "react-redux"
import * as React from "react";
import { formatDate } from "../utils/helpers";
import { Link } from "react-router-dom";

const QuestionContainer = ({ author, timestamp, id }) => {
    return(
        <div className="question" data-testid="question">
            <div className="questionWrapper">
                <h5>{author}</h5>
                <p className="datetime">{timestamp}</p>
            </div>
            <div className="buttonWrapper">
                <Link className="questionButton" to={`/questions/${id}`}>Show</Link>
            </div>
        </div>
    )
}

const mapStateToProps = ({questions},{id}) => (
    {
        author: questions[id].author,
        timestamp: formatDate(questions[id].timestamp),
        id: id
    }
)

export default connect(mapStateToProps)(QuestionContainer)