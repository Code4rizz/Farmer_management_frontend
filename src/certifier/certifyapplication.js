import React,{useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Container, Alert,Spinner } from "react-bootstrap";
import api from "../api";

function CertifyApplication(){

const [loading,setloading]=useState(false);
const { id } = useParams();
const [message,setmessage]=useState({text:"",type:""});
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));


const getCurrentYear = () => {
    return new Date().getFullYear();
};

const [formdata,setformdata]=useState({
        status: "",
        cname: user?.name || "",
        fromyr: getCurrentYear(),
        toyr: ""
    });

const HandleChange = (e) => {
    setformdata({
        ...formdata,
        [e.target.name]: e.target.value
    });
}

const HandleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    
    try{
        await api.put(`/certifier/certify_application/${id}`, formdata);
        setmessage({text:"Application certified successfully" ,type: "success"});
        
        
    }
    catch(err){
        if (err.response && err.response.data.message) {
            setmessage({ text: err.response.data.message, type: "danger" });
        } else {
            setmessage({ text: "Failed to certify application. Please try again.", type: "danger" });
        }
    }
    finally{
        setloading(false);
       
    }
}

return(
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Card className="p-4 shadow-lg" style={{ width: "500px" }}>
            <h3 className="text-center mb-4">Certify Application</h3>
            {message.text && <Alert variant={message.type}>{message.text}</Alert>}
            
            <Form onSubmit={HandleSubmit}> 
                <Form.Group className="mb-3" controlId="formCname">
                    <Form.Label>Certifier Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="cname"
                        value={formdata.cname}
                        readOnly
                        className="bg-light"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFromYear">
                    <Form.Label>From Year</Form.Label>
                    <Form.Control
                        type="number"
                        name="fromyr"
                        value={formdata.fromyr}
                        readOnly
                        className="bg-light"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formToYear">
                    <Form.Label>To Year</Form.Label>
                    <Form.Control
                        type="number"
                        name="toyr"
                        value={formdata.toyr}
                        onChange={HandleChange}
                        min={formdata.fromyr}
                        max="2100"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStatus">
                    <Form.Label>Certification Status</Form.Label>
                    <Form.Select
                        name='status'
                        value={formdata.status}
                        onChange={HandleChange}
                        required
                    >
                        <option value="" disabled>Select Status</option>
                        <option value="Approved">Approve</option>
                        <option value="Rejected">Reject</option>
                    </Form.Select>
                </Form.Group>
                


                <div className="d-grid gap-2">
                    <Button 
                        variant={formdata.status === "Approved" ? "success" : "primary"} 
                        type="submit" 
                        className="mb-2"  
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2"/>
                                Submitting...
                            </>
                        ) : (
                            `${formdata.status === "Approved" ? "Approve" : formdata.status === "Rejected" ? "Reject" : "Submit"} Application`
                        )}
                    </Button>
                    <Button 
                        variant="secondary" 
                        onClick={() => navigate('/View_pending_application')}
                        type="button"
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </Card>
    </Container>
);
}

export default CertifyApplication;