import React from 'react'
import App from '../components/navbar'
import jwt from 'jsonwebtoken'
import userImage from '../pages/user.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import './profile.css'


function Profile() {

    const history = useHistory()
    const [Image, setImage] = useState(userImage)
    const [UserName, setUserName] = useState('')
    const [UserEmail, setEmail] = useState('')
    const [UserQuote, setQuote] = useState('')
    const [UserQuoteU, setQuoteU] = useState('')
    const [UserNameU, setUserU] = useState('')

    async function populatedata() {
        const req = await fetch('https://adverts-site.herokuapp.com/profile', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()
        if (data.status === 'ok') {

            setImage(data.idImage)
            setUserName(data.idUser)
            setEmail(data.email)
            setQuote(data.quote)

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

            } else {
                populatedata()
            }
        }
    })

     function update(event) {
        

        const body = { name: UserNameU, quote: UserQuoteU };

        axios.post("https://adverts-site.herokuapp.com/api/profile", body, {headers: {'x-access-token': localStorage.getItem('token')}})
            
        .then((response) => {

           
        const res = response.data.status

        

         if (res === 'ok') {
          alert("It's done!")
          history.push('/profile')
           
        }
    });
}





    return (
        <>
            <App />
            <div class="container mt-3">
                <div class="row gutters">
                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div class="card h-100">
                            <div class="card-body">
                                <div class="account-settings">
                                    <div class="user-profile">
                                        <div class="user-avatar">
                                            <img src={Image} alt="Maxwell Admin"/>
                                        </div>
                                        <h5 class="user-name">{UserName}</h5>
                                        <h6 class="user-email">{UserEmail}</h6>
                                    </div>
                                    <div class="about">
                                        <h5>About</h5>
                                        <p>{UserQuote}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div class="card h-100">
                            <div class="card-body">
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 class="mb-2 text-primary">Personal Details</h6>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="fullName">Full Name</label>
                                            <input type="text" class="form-control" id="fullName" placeholder="Enter full name" onChange={(e) => setUserU(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="eMail">Email</label>
                                            <input type="email" class="form-control" id="eMail"  value={UserEmail}  disabled/>
                                        </div>
                                    </div>
                                                             
                                </div>
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 class="mt-3 mb-2 text-primary">About</h6>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="Street">Description</label>
                                            <input type="name" class="form-control" id="Street" placeholder="Tell us about you" onChange={(e) => setQuoteU(e.target.value)}/>
                                        </div>
                                    </div>
                              
                                </div>
                                <div class="row gutters p-3">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="text-right">
                                            <button type="button" id="submit" onClick={update} name="submit" class="btn btn-primary">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Profile

/*
return (
    <>
        <App />
        <div className='container-md pt-5'>
        <div class="d-flex justify-content-center">
                <Card style={{ width: '20rem'}} bg='success' mb-2>
                
                <Card.Img variant="top" src={Image} width={50} height={150} />
                
                <Card.Body>
                    <Card.Title>{UserName}</Card.Title>
                    <Card.Text>
                        <p class="fw-bold">
                       Informações do Usuário:
                        <div>
                           E-mail: {UserEmail}
                       </div>
                       <div>
                           Descrição: {UserPassword}
                       </div></p>
                    </Card.Text>
                    <Button variant="primary">Edit</Button>
                </Card.Body>
            </Card>
        </div>
        </div>
    </>


)
}*/
