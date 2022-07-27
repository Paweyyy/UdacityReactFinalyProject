import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";
import * as React from 'react';

describe('_saveQuestion', () => {
    it("will return a formatted question with correct fields", async() => {
        var question = {
            optionOneText: "This is test option1",
            optionTwoText: "This is test option2",
            author: "mtsamis"
        }
        var result = await _saveQuestion(question)
        expect(result.optionOne.text).toEqual("This is test option1")
        expect(result.optionTwo.text).toEqual("This is test option2")
        expect(result.author).toEqual("mtsamis")
        expect(result.id).not.toBeNull()
        expect(result.timestamp).not.toBeNull()
    })

    it("will throw an error if the wrong fields are send to the function", async() => {
        var question = {
            author: "mtasmis"
        }
        await expect(_saveQuestion(question)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
    })
})

describe("_saveQuestionAnswer", () => {
    it("will return true if correct formatted data is sent to the api", async() => {
        var answer = {
            "qid": "8xf0y6ziyjabvozdd253nd",
            "authedUser": "sarahedo",
            "answer": "optionOne"
        }

        var result = await _saveQuestionAnswer(answer)
        expect(result).toEqual(true);
    })

    it("will throw an error if the wrong fields are send to the function", async() => {
        var answer = {}
        await expect(_saveQuestionAnswer(answer)).rejects.toEqual("Please provide authedUser, qid, and answer")
    })
})