import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class EditExercise extends Component {

    state = {
        formInputs: {
        },
        toHome: false
      }

      componentDidMount () {
        const { formInputs, userId } = this.props.location.state
        this.setState({formInputs:formInputs})
        this.setState({userId:userId})
        
      }

    handleChange = (event) => {
        const updateInput = Object.assign( this.state.formInputs, {[event.target.id]: event.target.value})
        this.setState(updateInput)
      }
    
      handleSubmit = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3000/users/${this.props.location.userId}`, {
          body: JSON.stringify(this.state.formInputs),
          method: 'PUT',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        })
        .catch(error => console.log(error))
        .then(this.setState(()=>({toHome: true})))

      }

    render(){
      if (this.state.toHome){
        return <Redirect to='/' />
      }
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

export default EditExercise