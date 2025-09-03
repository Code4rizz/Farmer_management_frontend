import React,{useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Container, Alert,Spinner } from "react-bootstrap";
import api from "../api";

function InspectApplication(){

const [loading,setloading]=useState(false);
const { id } = useParams();
const [message,setmessage]=useState({text:"",type:""});
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));

const [formdata,setformdata]=useState({
        status: "",
        reason: "",
    });



const HandleChange=  (e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value,idate: new Date(),name: user.name});
}
const HandleSubmit= async (e)=>{
    e.preventDefault();
    setloading(true);
    try{
        await api.put(`/inspector/inspect_application/${id}`, formdata);
        setmessage({text:"Inspected successfully" ,type: "success"})
        
    }
    catch(err){
        if (err.response && err.response.data.message) {
                    setmessage({ text: err.response.data.message, type: "danger" });
                } else {
                    setmessage({ text: "Failed to Inspect . Please try again.", type: "danger" });
                }
            }
    finally{setloading(false);}

}
    

return(
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card className="p-4 shadow-lg" style={{ width: "500px" }}>
                <h3 className="text-center mb-4">Inspect Application</h3>
                {message.text && <Alert variant={message.type}>{message.text}</Alert>}
                
                <Form onSubmit={HandleSubmit}> 
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={user.name}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            name='status'
                            
                            value={formdata.status}
                            onChange={HandleChange}
                            required
                        >
                            <option value="" disabled>Select Status</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Select>
                    </Form.Group>
                    
                        <Form.Group className="mb-3" controlId="formReason">
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="reason"
                                placeholder="Enter Remarks "
                                value={formdata.reason}
                                onChange={HandleChange}
                                required
                            />
                        </Form.Group>
                    

                    <div className="d-grid gap-2">
                        <Button variant="success" type="submit" className="mb-2"  disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2"/>
                            Submitting...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                        <Button 
                            variant="secondary" 
                            onClick={() => navigate('/View_pending_application')}
                            type="button"
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>);}

export default InspectApplication;