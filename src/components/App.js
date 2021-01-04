import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import About from './About'
import Adopt from './Adopt'
export default class App extends Component {

    render() {
        return (
            <div>
                <h1>Petful</h1>
                <Route 
                    exact path="/"
                    component={LandingPage}
                />
                <Route 
                    exact path="/about"
                    component={About}
                />
                <Route 
                    exact path="/adopt"
                    component={Adopt}
                />
            </div>
        )
    }
}