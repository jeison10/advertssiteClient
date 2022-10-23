import React from 'react'
import App from '../components/navbar'
import { useEffect, useState } from 'react'
import axios from 'axios';

import './Dashboard.css'




const Dashboard = () => {


    const [datas2, setDatas2] = useState([]);



    useEffect(() => {
        axios.get("https://adverts-site.herokuapp.com/api/news").then((response) => {
            setDatas2(response.data.datas);  //populate this variable with the response
            console.log(response.data.datas)
        });

    }, []);






    return (
		<>
             <App />
                            <div class="container mt-3">
                             <div class="row">
                  
                   
                        
                        {datas2.map((datas, idx) => (
                          
                             <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">

                            <div class="card card-small">
                                <div class="thumbnail">
                                    <img alt="Opt alp thumbnail" src={datas.photo} height="270"/>
                                        <a href="#/product/awesome-landing-page">
                                            <div class="thumb-cover"></div>
                                        </a>
                                        <div class="details">
                                            <div class="user">
                                                
                                                <div class="name">{datas.author}</div>
                                                
                                            </div>
                                            <div class="clearfix"></div>
                                        </div>
                                </div>
                                <div class="card-info">
                                    <div class="moving">
                                        <a href="#/product/awesome-landing-page">
                                            <h3>{datas.title}</h3>
                                            <h4>{datas.type}</h4>
                                            <p>{datas.description}</p>
                                            <h3>{datas.contact}</h3>
                                            
                                        </a>
                                   
                                    </div>
                                </div>
                            </div>
                         </div>

                            ))}

                            </div>
                        </div>
             

                    </>



                    )
}

export default Dashboard


/*
<App />
            <div className='container-md pt-5'>
            <Row xs={1} md={4} className="g-6">
            {datas2.map((datas, idx) => (
                <Col>
                <Card className='' bg='secondary' text='white'>
                    <Card.Img variant="top" src={datas.photo} width={100} height={150} />
                    <Card.Body>
                    <Card.Title>{datas.title}</Card.Title>
                    <Card.Text>
                            <p>
                            <div>
                               Type: {datas.type}
                           </div>
                            <div>
                               Description: {datas.description}
                           </div>
                           <div>
                               Contact: {datas.contact}
                           </div></p>
                        </Card.Text>
                        <Card.Footer>
                        <small className="text">Posted by {datas.author} </small>
                        </Card.Footer>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>



            </div>

        	

	
        </>*/
