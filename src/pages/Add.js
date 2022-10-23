import React, { useState } from 'react'
import App from '../components/navbar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios'
import { useHistory } from 'react-router-dom'




const Add = () => {

    const history = useHistory()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [photo, setPhoto] = useState('')
    const [contact, setContact] = useState('')
    const [idc, setidc] = useState()

    async function registerDatas(event) {
        event.preventDefault()

        const response = await fetch('https://adverts-site.herokuapp.com/api/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                title,
                description,
                type,
                contact,
                idc,
            }),
        })

        const data = await response.json()

        if (data.status === 'ok') {
            alert("It's done!")
            history.push('/dashboard')
        }
    }

    const uploadImage = async () =>{
		try {
			const formData= new FormData()
			formData.append("file", photo)
			formData.append("upload_preset","ml_default")
			
			Axios.post("https://api.cloudinary.com/v1_1/dnbpmrxun/image/upload", formData)
			.then ((response) =>  {
				const imageID= response.data.public_id
				const url = 'https://res.cloudinary.com/dnbpmrxun/image/upload//v1665071083/'
				setidc(url+imageID)
				console.log(idc)})}
	 
		catch (err){
				console.log(err)
	}

}


    return (
        <>
            <App />

            <div className='container my-5'>
            <Form>
                
                    <Form.Group className="mb-3">
                        <Form.Label type="text">Title</Form.Label>
                        <Form.Control id="TextInput" placeholder="" onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">Type</Form.Label>
                        <Form.Select id="disabledSelect" onChange={(e) => setType(e.target.value)}>
                                <option></option>
                                <option>Cars</option>
                                <option>Rent</option>
                                <option>Job</option>
                                <option>Things</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">Description</Form.Label>
                        <Form.Control id="disabledTextInput" placeholder="" onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">Contact</Form.Label>
                        <Form.Control id="disabledTextInput" placeholder="" onChange={(e) => setContact(e.target.value)} />
                    </Form.Group>
                    </Form>
                  
                   
               
           

            <div className="imageUpload p-2">

            <img src={idc} class="rounded float-left" alt="" width={200} height={200} />

            <div className="mt-3">
                <input type="file" onChange={(e) => { setPhoto(e.target.files[0]) }} />

                <div className="mt-2">
                    <button type="submit" onClick={uploadImage} className="btn btn-dark">upload</button>
                </div>
            </div>
            </div>
            
            <Button type="submit" size="lg" onClick={registerDatas}>  Send   </Button>
               
              
            </div>

        </>



    )
}

export default Add


/*
                <div className="imageUpload p-3">

                    <img src={idc} class="rounded float-left" alt="" width={200} height={200} />

                    <div className="form-group mt-3">
                        <input type="file" onChange={(e) => { setPhoto(e.target.files[0]) }} />

                        <div className="form-group mt-2">
                            <button type="file" onClick={uploadImage} className="btn btn-dark">upload</button>
                        </div>
                    </div>
                </div>*/


/*
                <div className='container m-5'>
                <Form>
                    <Row className="mb-3">
                        <Col xs="auto">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} />
                        </Col>

                        <Col xs="auto">
                            <Form.Label>Type</Form.Label>
                            <Form.Select defaultValue="Choose..." onChange={(e) => setType(e.target.value)}>
                                <option></option>
                                <option>Cars</option>
                                <option>Rent</option>
                                <option>Job</option>
                                <option>Things</option>
                            </Form.Select>
                        </Col>

                        <Col xs="auto">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control type="text" placeholder="E-mail or phone number" onChange={(e) => setContact(e.target.value)} />
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control placeholder="" onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={registerDatas}>
                        Submit
                    </Button>
                </Form>


            </div>*/