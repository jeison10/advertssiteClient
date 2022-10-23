import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import jwt from 'jsonwebtoken'
import userImage from '../pages/user.png'
import { useHistory } from 'react-router-dom'



function App() {

  const history = useHistory()
  const [Image, setImage] = useState(userImage)
  const [UserName, setUserName] = useState('')

  async function populateImage() {
		const req = await fetch('https://adverts-site.herokuapp.com/api/quote', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
      setImage(data.idImage)
      setUserName(data.idUser)
      			
		} else {
			alert(data.error)
      //setImage(userImage)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history.push('/login')
			} else {
				populateImage()
			}
		}
	})



    return (

    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/dashboard">Sistema</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/add">Add</Nav.Link>
              <Nav.Link href="/mypost">My posts</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
           
              <Nav>
                 <img src = {Image} class="rounded float-left" alt="" width={50} height={50}/>
                <NavDropdown title={UserName} id="collasible-nav-dropdown" >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/login">LogOut</NavDropdown.Item>
                </NavDropdown>
              
              
              
            </Nav>
            </Navbar.Collapse>
         
        </Container>
      </Navbar>

    )
}


export default App