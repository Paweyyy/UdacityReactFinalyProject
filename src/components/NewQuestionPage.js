import * as React from "react";
import { useState } from "react";
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";

const NewQuestionPage = ({ dispatch }) => {
    const navigate = useNavigate();
    const[option1, setOption1] = useState("")
    const[option2, setOption2] = useState("")

    const handleChange = e => {
        e.preventDefault();
        e.target.id === "option1" ? setOption1(e.target.value) : setOption2(e.target.value)
    }

    const handleSubmit = e =>{
        e.preventDefault()

        dispatch(handleAddQuestion(option1, option2))

        setOption1("");
        setOption2("")

        navigate("/")
    } 


    return (
        <div className="pagecontainer">
            <h3 className="newHeadline">Would you rather</h3>
            <p className="newSubline">Create your own poll</p>
            <form onSubmit={handleSubmit} className="newQuestionForm">
                <label htmlFor="option1">First Option</label>
                <input 
                    id="option1"
                    className="newInput"
                    type="text"
                    onChange={handleChange}
                    />
                <label htmlFor="option2">Second Option</label>
                <input 
                    id="option2"
                    className="newInput"
                    type="text"
                    onChange={handleChange}
                />
                <button className="newQuestionButton" type="submit" disabled={option1 === "" || option2 === ""}>Submit</button>
            </form>
        </div>
    )
}

export default connect()(NewQuestionPage);