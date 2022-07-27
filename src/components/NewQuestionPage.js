import * as React from "react";
import { useState } from "react";
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/shared";

const NewQuestionPage = ({ authedUser, dispatch }) => {
    const navigate = useNavigate();
    const[optionOne, setoptionOne] = useState("")
    const[optionTwo, setoptionTwo] = useState("")

    const handleChange = e => {
        e.preventDefault();
        e.target.id === "optionOne" ? setoptionOne(e.target.value) : setoptionTwo(e.target.value)
    }

    const handleSubmit = e =>{
        e.preventDefault()

        dispatch(handleAddQuestion({optionOne, optionTwo, authedUser}))

        setoptionOne("");
        setoptionTwo("")

        navigate("/")
    } 


    return (
        <div className="pagecontainer">
            <h3 className="newHeadline">Would you rather</h3>
            <p className="newSubline">Create your own poll</p>
            <form onSubmit={handleSubmit} className="newQuestionForm">
                <label htmlFor="optionOne">First Option</label>
                <input 
                    id="optionOne"
                    className="newInput"
                    type="text"
                    onChange={handleChange}
                    />
                <label htmlFor="optionTwo">Second Option</label>
                <input 
                    id="optionTwo"
                    className="newInput"
                    type="text"
                    onChange={handleChange}
                />
                <button className="newQuestionButton" type="submit" disabled={optionOne === "" || optionTwo === ""}>Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = ( { authedUser, dispatch }) => {
    return {
        authedUser,
        dispatch
    }
}

export default connect(mapStateToProps)(NewQuestionPage);