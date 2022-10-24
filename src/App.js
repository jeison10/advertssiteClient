import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/profile'
import Add from './pages/Add'
import MyPost from './pages/MyPost'
//import { Redirect } from 'react-router-dom'


const App = () => {
	return (
		<div>
			<BrowserRouter>
			
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/dashboard" exact component={Dashboard} />
				<Route path="/profile" exact component={Profile} />
				<Route path="/add" exact component={Add} />
				<Route path="/mypost" exact component={MyPost} />
			</BrowserRouter>
		</div>
	)
}

export default App

/*
<Redirect from="/" to="/login" />
*/