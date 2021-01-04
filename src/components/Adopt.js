import React, { Component } from 'react'
import Services from '../services/services'


export default class Adopt extends Component {
    constructor() {
        super();
        this.state = {
            cats: [],
            dogs: [],
            people: [],
            pets: {},
            OK: false,
            fullName: "",
            currentUser: "",
            isHidden: true,
        };
    }

    componentDidMount() {
        this.fetchData()
    }
    fetchData = () => {
        Services.getPets()
            .then((pets) => {
                this.setState({
                    cats: pets.cat,
                    dogs: pets.dog,
                })
            })
        Services.getPeople()
            .then((people) => {
                this.setState({ people })
            })
            .catch((e) => console.error(e))
    }


    petCountdown = () => {
        let countdown = setInterval(() => {
            if (this.state.people.length < 2) {
                this.addToQueue();
                this.setState({
                    isHidden: false,
                });
                return clearInterval(countdown);
            }
            Services.getPets().then(() => this.fetchData());
            this.adopted();
        }, 4000);
    };

    addToQueue = () => {
        let peopleNames = [
            "Kiro",
            "Lazo",
            "Mile",
            "Stole",
        ];

        let addPeople = setInterval(() => {
            if (this.state.people.length > 4) {
                return clearInterval(addPeople);
            }
            let index = Math.floor(Math.random() * peopleNames.length);
            let person = peopleNames[index];

            Services.postPets(person)
                .then((res) => res.json())
                .then(() => this.fetchData());
        }, 4000);
    };

    adopted = (petId = null) => {
        let counter = petId ? petId : this.state.people.length;
        if (counter === 0) {
            return;
        }
        if (counter % 2 === 0) {
           Services.dequeueCat().then(() => this.fetchData());
        } else {
            Services.dequeueDog().then(() => this.fetchData());
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        let person = this.state.fullName;
        this.setState({ currentUser: person });
        Services.postPets(person)
            .then((res) => res.json())
            .then((resJson) => {
                this.setState({
                    people: [...this.state.people, resJson],
                });
            })
            .then(() => this.fetchData());
        this.petCountdown();
    }

    handleAdoptClickDog = () => {
        Services.dequeueDog()
        .then(() => this.fetchData())
    }
    handleAdoptClickCat = () => {
        Services.dequeueCat()
        .then(() => this.fetchData())
    }

    renderPeople = () => {
       let people = this.state.people
       if(people === undefined){
           return <div>Error</div>
       }
       return(people).map((ppl,index)=>{
           return <li key={index}>{ppl}</li>
       })
    }
    showButtonDog = () => {
        if(this.state.people[0]===this.state.currentUser){
            return <button onClick={this.handleAdoptClickDog}>Adopt</button>
        }
    }
    showButtonCat = () => {
        if(this.state.people[0]===this.state.currentUser){
            return <button onClick={this.handleAdoptClickCat}>Adopt</button>
        }
    }

    render() {
        let cat = this.state.cats[0]
        let dog = this.state.dogs[0]
        
        if(cat === undefined){
            return(
                <div>Error</div>
            )
        }
        
        return(
            <section className='box'>
            <div className='boxbody'>
                <h2>{cat.name}</h2>
                <img src={cat.imageURL} alt="Landing Cat" />
                <p>Gender: {cat.gender}</p>
                <p>Age: {cat.age}</p>
                <p>Breed: {cat.breed}</p>
                <p>Story: {cat.story}</p>
                {this.showButtonCat()}
            </div>
            <div className='boxbody'>
                <h2>{dog.name}</h2>
                <img src={dog.imageURL} alt="Landing Dog" />
                <p>Gender: {dog.gender}</p>
                <p>Age: {dog.age}</p>
                <p>Breed: {dog.breed}</p>
                <p>Story: {dog.story}</p>
                {this.showButtonDog()}
            </div>
            <div className='box'>
                <h2 className='boxtitle'>People in Line</h2>
                <ul>
                {this.renderPeople()}
                </ul>
                <form onSubmit={this.onSubmit}>
                     <h1>Get in Line!</h1>
                     <div className="landing-content">
                        <label className="full-name" htmlFor="full-name">
                             Enter Your Name
                         </label>
                          <input
                            onChange={(event) =>
                                this.setState({ fullName: event.currentTarget.value })}
                            type="text"
                            id="full-name"
                        />
                    </div>
                    <div className='boxfooter'>
                        <button className='btn'>Join Our Queue</button>
                    </div>
                </form>
            </div>
            </section>
        )
     }
}