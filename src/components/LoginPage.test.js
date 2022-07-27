import { render, fireEvent,find } from "@testing-library/react";
import * as React from 'react';
import LoginPage from "./LoginPage";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

describe("LoginPage", () => {
    it("will match LoginSnapshot", () => {
        const middleware = applyMiddleware(thunk)

        const store = createStore(reducer, middleware);
    
        var component = render(<Provider store={store}><Router><LoginPage /></Router></Provider>);
    
        expect(component).toMatchSnapshot();
    })
})