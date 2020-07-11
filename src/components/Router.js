import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Router } from "react-router-dom";
import App from '../App';
import EditExercise from './EditExercise';
import ShowExercise from './ShowExercise';

class UserRouter extends React.Component {
	state = {};
	render() {
		return (
            <div>
                <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <Route path="/" exact component={App} />
            <Route path="/EditExercise" component={EditExercise} />
            <Route path="/ShowExercise" component={ShowExercise} />
        </BrowserRouter>
            </div>
		);
	}
}

export default UserRouter;