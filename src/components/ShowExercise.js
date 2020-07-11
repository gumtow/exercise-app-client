import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Redirect} from 'react-router-dom';


class ShowExercise extends Component {

  state = {
    users:[],
    formInputs: {
      name: '',
      calories: 0,
      time: 0,
      weight: ''
    }, 
    toHome: false
  }


  componentDidMount () {
    this.getData()
  }

 getData = () =>{
    const { formInputs, userId, index } = this.props.location.state
    this.setState({formInputs:formInputs})
    this.setState({userId:userId})
    fetch(`http://localhost:3000/users/${this.props.location.userId}` || `https://exercise-app-client.herokuapp.com/users/${this.props.location.userId}`)
    .then(response => response.json())
    .then(json => this.setState({users:json}))
    .catch(err => console.log(err))
  }

  deleteExercise(id, index) {
    fetch(`http://localhost:3000/users/${id}` || `https://exercise-app-client.herokuapp.com/users/${id}`, {
      method: "DELETE"
    })
    .then (data => {
      this.setState({
        users: [
          ...this.state.users.slice(0, index),
          ...this.state.users.slice(index+1)
        ]
      })
    })
    .catch(error => console.log(error))
    .then(this.setState(()=>({toHome: true})))
  }
  

  render(){
      const users = this.state.users;
      if (this.state.toHome){
        return <Redirect to='/' />
      }
    return (
      <div className="App">
        <h1>Hello World</h1>
        <div>
          {/* {this.state.users.map ((user, i) =>{
            return (
              <div key={user.id}> */}
                <h3>{users.name}</h3>
                <p>{users.calories}</p>
                <p>{users.weight}</p>
                <p>{users.time}</p>
                <button key={users.id} onClick={()=> {this.deleteExercise(users.id, this.props.location.index)}}>Delete</button>
                <button><Link to={{
                  pathname: "/EditExercise", 
                  userId: users.id,
                  state: { formInputs: {
                            name: users.name,
                            calories: users.calories,
                            time: users.time,
                            weight: users.weight
                            }
                          }
                  }}>Edit</Link></button>
              {/* </div>
            )
          })} */}
        </div>
        
      </div>
    )
  }
}

export default ShowExercise;