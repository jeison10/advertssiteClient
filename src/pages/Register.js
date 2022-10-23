import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import "./signin.css"
import userImage from './user.png'



function App() {

	const history = useHistory()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [image, setimage] = useState('')
	const [idc, setidc] = useState(userImage)

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('https://adverts-site.herokuapp.com/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
				idc
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			alert("Usuário cadastrado!")
			history.push('/login')
		}
	}

	const uploadImage = async () =>{
		try {
			const formData= new FormData()
			formData.append("file", image)
			formData.append("upload_preset","ml_default")
			
			Axios.post("https://api.cloudinary.com/v1_1/dnbpmrxun/image/upload", formData)
			.then ((response) =>  {
				const imageID= response.data.public_id
				const url = 'https://res.cloudinary.com/dnbpmrxun/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1665071083/'
				setidc(url+imageID)
				console.log(idc)})}
	 
		catch (err){
				console.log(err)
	}

}


	return (
		<div className="Auth-form-container">
		<form className="Auth-form">
		  <div className="Auth-form-content">
			<h3 className="Auth-form-title">Register</h3>

			


			<div className="form-group mt-2">
				
			  <label>Full Name</label>
			  <input
				type="text"
				className="form-control mt-1"
				placeholder="Maria Alves"
				value={name} onChange={(e) => setName(e.target.value)}
			  />
			</div>
			<div className="form-group mt-3">
			  <label>Email address</label>
			  <input
				type="email"
				className="form-control mt-1"
				placeholder="Email Address"
				value={email} onChange={(e) => setEmail(e.target.value)}
			  />
			</div>
			<div className="form-group mt-3">
			  <label>Password</label>
			  <input
				type="password"
				className="form-control mt-1"
				placeholder="Password"
				value={password} onChange={(e) => setPassword(e.target.value)}
			  />
			</div>
			

			<div className="imageUpload p-3">
				
				<img src = {idc} class="rounded float-left" alt="" width={125} height={125}/>
	
				<div className="form-group mt-3">
				<input type="file"  onChange={(e) => {setimage(e.target.files[0])}}/>
	
				<div className="form-group mt-2">
				<button type="file"  onClick={uploadImage} className="btn btn-dark">upload</button>
				</div>
				</div>
				</div>

			<div className="d-grid gap-2 mt-3">
			  <button type="submit" className="btn btn-primary" onClick={registerUser}>
				Register
			  </button>
			</div>
			
		  </div>
		</form>
	  </div>
	)
}

export default App




/*<div>
			
			
			
			  <div class="row g-3">

				<div class="col-sm-4"> </div>
					<div class="p-2 col-sm-4 ">
						<div class="d-flex justify-content-center">
							<img src = {idc} class="rounded float-left" alt="" width={200} height={200}/>
						</div>
						<div class="p-2">
						<input type="file"  onChange={(e) => {setimage(e.target.files[0])}}/>
						<button type="file"  onClick={uploadImage} class="btn btn-dark">upload</button>
						</div>
					</div>
				<div class="col-sm-4"> </div>
			</div>
		

			<form class="row g-3">


				<div class="col-sm-4"> </div>
					
					<div class="col-sm-4">
						<label for="exampleInputEmail1" className="form-label">Nome</label>
						<input type="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
					</div>
				<div class="col-sm-4"> </div>
				
				
				<div class="col-sm-4"> </div>
					<div class="col-sm-4">
						<label for="exampleInputPassword1" className="form-label">Email</label>
						<input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
						
					</div>
				<div class="col-sm-4"> </div>
			
				
				<div class="col-sm-4"> </div>
					<div class="col-sm-4">
						<label for="exampleInputPassword1" className="form-label">Password</label>
						<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
						<div className="p-2">
							<button type="submit" onClick={registerUser} className="btn btn-primary">Registrar</button>
						</div>
					</div>
				<div class="col-sm-4"> </div>
			
			
				</form>	
			
		</div>
		*/