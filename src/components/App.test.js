import { render, fireEvent,find, screen, waitFor, findByDisplayValue } from "@testing-library/react";
import * as React from 'react';
import App from "./App"
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../reducers";
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import { getInitialData } from "../utils/api" 
import { act } from "react-dom/test-utils";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

describe("AppFlow", () => {
    it("user can login by selecting his username in the login screen", async () => {

        const initialState = await getInitialData()

        const middleware = applyMiddleware(thunk)

        const store = createStore(reducer, initialState, middleware);

        var component = render(
            <Router>
                <Provider store={store}>
                    <App />
                </Provider>
            </Router>);

        await act(async () => {
            const element = component.getByTestId("username-selection")

            fireEvent.change(element, {
                target: { value: "sarahedo"}
            })

            await component.findByDisplayValue(/sarahedo/);
        })

        var element = component.queryByTestId("username-selection")

        expect(element).not.toBeInTheDocument()
    })

    it("navbar is showing the logged in usersname", async() => {
        const middleware = applyMiddleware(thunk)

        const initialState = await getInitialData()

        const store = createStore(reducer, initialState, middleware);

        var component = render(
            <Router>
                <Provider store={store}>
                    <App />
                </Provider>
            </Router>);

        await act(async () => {
            const element = component.getByTestId("username-selection")

            fireEvent.change(element, {
                target: { value: "sarahedo"}
            })

            await component.findByDisplayValue(/sarahedo/);
        })

        var element = component.queryByTestId("navbar-username")

        expect(element).toBeInTheDocument()
    })

    it("six questions should be rendered after login", async() => {
        const middleware = applyMiddleware(thunk)

        const initalState = await getInitialData()

        const store = createStore(reducer, initalState, middleware)

        const component = render(
            <Router>
                <Provider store={store}>
                    <App />
                </Provider>
            </Router>
        )

        await act(async () => {
            const element = component.getByTestId("username-selection")

            fireEvent.change(element, {
                target: { value: "sarahedo" }
            })

            await component.findByDisplayValue(/sarahedo/);
        })

        const elements = component.getAllByTestId("question")

        expect(elements.length).toEqual(6)
    })
})

