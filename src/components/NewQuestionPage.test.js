import { render, fireEvent,find } from "@testing-library/react";
import NewQuestionPage from "./NewQuestionPage";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import { getInitialData } from "../utils/api" 

describe("NewQuestionPage", () => {
    it("will match QuestionContainer", async () => {
        const middleware = applyMiddleware(thunk)

        const initialState = await getInitialData()

        const store = createStore(reducer, initialState, middleware);
    
        var component = render(<Provider store={store}><Router><NewQuestionPage /></Router></Provider>);
    
        expect(component).toMatchSnapshot();
    })
})