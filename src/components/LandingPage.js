import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class LandingPage extends Component {
    render() {
        return (
          <div>
            <div className="bio-petful">
              <h1>Read About Petful</h1>
              <Link to={"/about"}>
                <p className="link">Read about Petful</p>
              </Link>
            </div>
            <div className="landing-page-info">
              <h2> The Process of Adopting From Us</h2>
              <p className="introduction">
                {" "}
                Hello there! Are you ready to find your Purfect friend?{" "}
              </p>
              <p className="more-info">
                Pets will be adopted based on a first come, first adopt concept. The
                animal that comes into our shelter first will be the first animal
                ready to go home. Customers are also placed in a queue to wait thier
                turn for the next animal ready for their furever home! Will it be
                you?
              </p>
            </div>
          </div>
        );
      }
}
