import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>

					<Route exact path="/login">
						<Login />
					</Route>

					<Route exact path="/register">
						<Register />
					</Route>
				</Switch>
			</Router>
	  	</div>
	)
}

export default App
