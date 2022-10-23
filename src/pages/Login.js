import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './signin.css'




function App() {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	//const [login, setLogin] = useState(false)

	useEffect(() => {
		localStorage.removeItem('token')
	})

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('https://adverts-site.herokuapp.com/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/dashboard'
		} else {
			alert('Please check your username and password')
			//setLogin(true)
		}

	
	}



	
	return (
		
		<div className="Auth-form-container">
		<form className="Auth-form">
		  <div className="Auth-form-content">
			<h3 className="Auth-form-title">Welcome</h3>
			<div className="form-group mt-3">
			  <label>Email address</label>
			  <input
				type="email"
				className="form-control mt-1"
				placeholder="Enter email"
				value={email} onChange={(e) => setEmail(e.target.value)}
			  />
			</div>
			<div className="form-group mt-3">
			  <label>Password</label>
			  <input
				type="password"
				className="form-control mt-1"
				placeholder="Enter password"
				value={password} onChange={(e) => setPassword(e.target.value)}
			  />
			</div>
			<div className="d-grid gap-2 mt-3">
			  <button type="submit" className="btn btn-primary" onClick={loginUser}>
				Login
			  </button>
			</div>
			<div className="d-grid gap-2 mt-3">
			  <a className="btn btn-dark" href='/register' >
				Sing up
			  </a>
			</div>
			
			
		  </div>
		</form>
	  </div>
	)
}

export default App

/*	<div>
			<form>
				<div class="p-2">
					<div class="col-md-3">
						<label for="exampleInputEmail1" class="form-label">Email</label>
						<input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
					</div>	
				</div>
				<div class="p-2">
					<div class="col-md-3">
						<label for="exampleInputPassword1" class="form-label">Password</label>
						<input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
					</div>
				</div>
				<div class="p-2">
					<button type="submit" onClick={loginUser} class="btn btn-primary">Login</button>
				</div>
			</form>
		</div>
		*/