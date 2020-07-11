import React, { Component } from 'react';

class AddExercise extends Component {

    state = {
        users:[],
        formInputs: {
          name: '',
          calories: 0,
          time: 0,
          weight: ''
        }
      }

    handleChange = (event) => {
        const updateInput = Object.assign( this.state.formInputs, {[event.target.id]: event.target.value})
        this.setState(updateInput)
      }
    
      handleSubmit = (event) => {
        // event.preventDefault()
        fetch('http://localhost:3000/users', {
          body: JSON.stringify(this.state.formInputs),
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        })
        .then(createdUser=> {
          return createdUser.json()
        })
        .then(jsonedUser => {
          this.setState({
            formInputs: {
              name: '',
              calories: 0,
              time: 0,
              weight: ''
            },
            users: [jsonedUser, ...this.setState.users]
          })
        })
        .catch(error => console.log(error))
      }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Exercise Name</label>
                    <input type="text" id="name" value={this.state.formInputs.name} onChange={this.handleChange} />
                    <label htmlFor="calories">Calories Burned</label>
                    <input type="text" id="calories" value={this.state.formInputs.calories} onChange={this.handleChange} />
                    <label htmlFor="time">How long did you exercise (min)</label>
                    <input type="text" id="time" value={this.state.formInputs.time} onChange={this.handleChange} />
                    <label htmlFor="weight">Weight</label>
                    <input type="text" id="weight" value={this.state.formInputs.weight} onChange={this.handleChange} />
                    <input type="submit" className="submit" />
                </form>
            </div>
        )
    }
}

export default AddExercise