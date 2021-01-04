import {REACT_APP_API_BASE_URL} from '../config'
const Services = {
    getPeople(){
        return fetch(`${REACT_APP_API_BASE_URL}/people`)
        .then(res =>
                (!res.ok)
                  ? res.json().then(e => Promise.reject(e))
                  : res.json()
              )
    },
    getPets(){
        return fetch(`${REACT_APP_API_BASE_URL}/pets`)
        .then(res =>
                (!res.ok)
                  ? res.json().then(e => Promise.reject(e))
                  : res.json()
              )
    },
    postPets(person){
      return fetch(`${REACT_APP_API_BASE_URL}/people`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ person }),
    })  
    },
    dequeueDog(){
      return fetch(`${REACT_APP_API_BASE_URL}/pets`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ type: "dog" }),
    })
    },
    dequeueCat(){
        return fetch(`${REACT_APP_API_BASE_URL}/pets`, {
          method: "DELETE",
          headers: {
              "content-type": "application/json",
          },
          body: JSON.stringify({ type: "cat" }),
      })
      }
    
}
export default Services