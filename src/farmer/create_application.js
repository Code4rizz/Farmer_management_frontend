
import React, {useState} from 'react';
import {Card,Form,Button, Container,Alert} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import api from '../api';

function CreateApplication(){
    const user = JSON.parse(localStorage.getItem("user"));
    const [message,setmessage]=useState({text:"",type:""});

    const [formdata,setformdata]=useState({
        field_id: uuidv4(),
        name: user.name,
        email: user.email,
        phone: "",
        location: "",
        Description: "",
        standard: "",
        status: "Pending",
    });

    const HandleChange=  (e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value});
    }
    const HandleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const res = await api.post("/farmer/create_application",formdata);
            setmessage({text:res.data.message, type:"success"});
            setformdata({
                field_id: uuidv4(),
                name: user.name,
                email: user.email,
                phone: "",
                location: "",
                standard: "",
                status: "Pending",
            });
        }
        catch(err){
            if (err.response && err.response.data.message){
                setmessage({text:err.response.data.message,type:"danger"});
            }
            else{
                setmessage({text:"Application Submission Failed. Please try again.",type:"danger"});
            }}
    }   
    return(
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card className="p-4 shadow-lg" style={{ width: "500px" }}>
                <h3 className="text-center mb-4">Create Application</h3>
                {message.text && <Alert variant={message.type}>{message.text}</Alert>}
                <Form onSubmit={HandleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={formdata.name}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={formdata.email}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder='Enter Phone Number'
                            value={formdata.phone}
                            onChange={HandleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name='location'
                            placeholder='Enter Location'
                            value={formdata.location}
                            onChange={HandleChange}
                            required
                        />
                    </Form.Group>
                     <Form.Group className="mb-3" controlId="formdescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name='Description'
                            placeholder='Enter Requirement'
                            value={formdata.Description}
                            onChange={HandleChange}
                            required
                        />
                    </Form.Group>
                   <Form.Group className="mb-3" controlId="formStandard">
                        <Form.Label>Standard</Form.Label>
                        <Form.Select
                            name='standard'
                            value={formdata.standard}
                            
                            onChange={HandleChange}
                            required
                        >
                            <option value="" disabled>Select Standard</option>
                            <option value="Gold">Gold</option>
                            <option value="Silver">Silver</option>
                            <option value="Bronze">Bronze</option>
                        </Form.Select>
                    </Form.Group>
                     <Button variant="success" type="submit" className="w-100">
                    Submit Application
                    </Button>
                </Form>
            </Card>
        </Container>

    )


    }
    export default CreateApplication;
    
