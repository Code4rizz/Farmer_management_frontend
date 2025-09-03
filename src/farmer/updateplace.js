import React,{useState,useEffect} from "react";
import {Card, Form, Button, Container, Alert,Spinner} from 'react-bootstrap';
import api from '../api';
import { useParams, useNavigate, useLocation } from 'react-router-dom';



function UpdatePlace(){

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [message,setmessage]=useState({text:"",type:""});
    const [loading,setloading]=useState(null);
    const [formdata,setformdata]=useState({
        phone: "",
        location: "",
        Description: "",
        standard: "",
        
    });


    useEffect(() => {
        const appdata = location.state;
        if (appdata) {
        setformdata({
            phone: appdata.phone,
            location: appdata.location,
            Description: appdata.Description,
            standard: appdata.standard,
        
        });}
        else{
            const fetchApplication = async () => {
                try {
                    const res = await api.get(`/farmer/application/${id}`); 
                    setformdata(res.data);
                } catch (err) {
                    if (err.response && err.response.data.message) {
                        setmessage({ text: err.response.data.message, type: "danger" });
                    } else {
                        setmessage({ text: "Failed to fetch application data. Please try again.", type: "danger" });
                    }
        }}
        fetchApplication();}

    },[id,location.state]);

    const HandleChange=  (e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value});
    }

    const HandleSubmit= async (e)=>{
        e.preventDefault();
        setloading(true);
        try{
            const res = await api.put(`/farmer/update_application/${id}`,formdata);
            setmessage({text:res.data.message, type:"success"});
            navigate("/my_application");
        }
        catch(err){
            if (err.response && err.response.data.message){
                setmessage({text:err.response.data.message,type:"danger"});
            }
            else{
                setmessage({text:"Update Failed. Please try again.",type:"danger"});
            }}
        setloading(false);
    }


   return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card className="p-4 shadow-lg" style={{ width: "500px" }}>
                <h3 className="text-center mb-4">Update Application</h3>
                {message.text && <Alert variant={message.type}>{message.text}</Alert>}
                
                <Form onSubmit={HandleSubmit}> 
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

                    <div className="d-grid gap-2">
                        <Button variant="success" type="submit" className="mb-2"  disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2"/>
                            Updating...
                                </>
                            ) : (
                                "Update Application"
                            )}
                        </Button>
                        <Button 
                            variant="secondary" 
                            onClick={() => navigate('/my_application')}
                            type="button"
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export default UpdatePlace;