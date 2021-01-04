import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class About extends Component {
    render() {
        return (
          <div className="box">
            <p>
              Hey you don't need a kid right now, get a pet.
          
            </p>
            <img
              className="About-Img"
              src="https://i.guim.co.uk/img/media/03734ee186eba543fb3d0e35db2a90a14a5d79e3/0_173_5200_3120/master/5200.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=9c30ed97ea8731f3e2a155467201afe3"
              alt="Cat High-Pawing with Human Hand"
            />
            <div className="buttons">
              <Link to={"/adopt"}>
                <button className='btn' type="submit">Find a Pet </button>
              </Link>
            </div>
          </div>
        );
      }
}
