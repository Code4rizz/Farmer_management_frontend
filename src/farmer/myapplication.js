
import React, { useEffect, useState } from "react";
import { Card, Container, Spinner, Alert, Badge, Row, Col, Button } from "react-bootstrap";
import api from '../api';
import { useNavigate } from "react-router-dom";

function MyApplications() {
    const user = JSON.parse(localStorage.getItem("user"))
    const [applications, setapplications] = useState([]);
    const [loading, setloading] = useState(true);
    const [message, setmessage] = useState({text:"",type:""});
    const [deleteload,setdeleteload]=useState(null);
    const navigate = useNavigate();

    const HandleViewMap = (location) => {
       const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(location)}`;
        window.open(mapsUrl, '_blank');
    }
    
    const HandleUpdate = (app) => {
     navigate(`/edit_application/${app._id}`,{state:app});}

    const HandleDelete = async(id) => {
      setdeleteload(id);
      try{
        await api.delete(`/farmer/delete_application/${id}`);
        setapplications(applications.filter(app=>app._id !== id));
        setmessage({text:"Application deleted successfully", type:"success"});
      }
      catch(err){
        if (err.response && err.response.data.message) {
            setmessage({ text: err.response.data.message, type: "danger" });
            
        }
        else {
            setmessage({ text: "Failed to delete application. Please try again.", type: "danger" });
        }
      }
      setdeleteload(null);
    }


    const statusVariant = {
        "Pending": "secondary",
        "Inspected": "warning",
        "Rejected": "danger",
        "Approved": "success",
    }

    const standardVariant = {
        "Bronze": "dark",
        "Silver": "secondary",
        "Gold": "warning",
    }

    useEffect(() => {

    const fetchApplications = async () => {
        try {
            const res = await api.get(`/farmer/my_applications/${user.email}`);
            setapplications(res.data.applications);
            setloading(false);
        }
        catch (err) {
            if (err.response && err.response.data.message) {
                setmessage({ text: err.response.data.message, type: "danger" });
                setloading(false);
            }
            else {
                setmessage({ text: "Failed to fetch applications. Please try again.", type: "danger" });
                setloading(false);
            }
        }}
        fetchApplications();
    },[user.email]);

     if (loading) {
       return (
         <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
           <div className="text-center">
             <Spinner animation="border" variant="primary" />
             <p className="mt-3">Loading your applications...</p>
           </div>
         </Container>
       );
     }

     if (applications.length === 0) {
        return (
          <Container className="mt-4">
            <div className="text-center py-5">
              <h4>No Applications Found</h4>
              <p className="text-muted">You haven't submitted any applications yet.</p>
              <Button variant="primary" onClick={()=>navigate("/create_application")}>Create Your First Application</Button>
            </div>
          </Container>
        );
      }

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>My Applications</h3>
                <Badge bg="info">{applications.length} Total</Badge>
            </div>
            {message.text && <Alert variant={message.type}>{message.text}</Alert>}

            <Row>
                {applications.map((app) => (
                    <Col md={6} lg={4} key={app._id} className="mb-4">
                        <Card className="h-100 shadow-sm border-1 border-dark">
                            <Card.Header className="bg-light border-1 ">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Badge bg="info" className="px-3 py-2">Application #{applications.indexOf(app)+1}</Badge>
                                    <Badge bg={statusVariant[app.status]} className="px-3 py-2 ">{app.status}</Badge>
                                </div>
                            </Card.Header>
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <Card.Title className="h5 mb-3 fw-bold">
                                    📍{app.location}
                                </Card.Title>
                                <Button variant="outline-primary" size="sm" onClick={() => HandleViewMap(app.location)}>
                                    View on Map
                                </Button>
                              </div>
                                
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-muted fw-bold">Standard:</span>
                                    <Badge bg={standardVariant[app.standard]} className="px-3 py-2 ">
                                        {app.standard}
                                    </Badge>
                                    </div>
                                    
                                    <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-muted fw-bold">Submitted:</span>
                                    <small>{new Date(app.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}</small>
                                    </div>
                                </div>
                                 <div className="mb-3">
                                        <h6 className="text-muted mb-2">Description:</h6>
                                        <p className="small text-muted mb-0">
                                            {app.Description && app.Description.length > 100 
                                                ? app.Description.substring(0, 100) + "..." 
                                                : app.Description || "No description available"
                                            }
                                        </p>
                                    </div>
                                </Card.Body>
                                  <Card.Footer className="bg-transparent border-0">
                                    <div className="d-flex justify-content-center gap-3">
                                        <Button 
                                            variant="warning" 
                                            size="sm" 
                                            className="px-4"
                                            onClick={()=>HandleUpdate(app)}
                                                                  
                                      >
                                            ✏️ Update
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm"
                                            className="px-4"
                                            onClick={()=>HandleDelete(app._id)}
                                            disabled={deleteload===app._id}
                                        >
                                          {deleteload===app._id ? (
                                            <>
                                            <Spinner animation="border" size="sm" className="me-2"/>
                                            Deleting...
                                            </>
                                          ) : (<>
                                            🗑️ Delete</>)}
                                        </Button>
                                    </div>
                                </Card.Footer>
                         </Card>
                      </Col>
                                        ))}
                     </Row>
                    </Container>
                                  );
                                }
export default MyApplications;