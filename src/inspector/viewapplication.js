import React,{useEffect,useState} from "react";
import { Badge,Col,Row, Button, Container, Card, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api";


function ViewApplication(){
const [applications,setapplications]=useState([]);
const [loading,setloading]=useState(true);
const [message,setmessage]=useState({text:"",type:""});


const navigate = useNavigate();

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


    const HandleViewMap = (location) => {
       const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(location)}`;
        window.open(mapsUrl, '_blank');
    }
    
    const HandleInspect = (id) => {
     navigate(`/inspectorcheck/${id}`);}

useEffect(() => {
    const fetchApplication = async () => {
        try {
            const res = await api.get("/farmer/all_applications");
            setapplications(res.data.pendingapplications);
            setloading(false);
        } catch (err) {
            if (err.response && err.response.data.message) {
                setmessage({ text: err.response.data.message, type: "danger" });
            } else {
                setmessage({ text: "Failed to fetch applications. Please try again.", type: "danger" });
            }
        setloading(false);
        }}
    fetchApplication();
    
},[]);




     if (loading) {
       return (
         <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
           <div className="text-center">
             <Spinner animation="border" variant="primary" />
             <p className="mt-3">Loading All Applications...</p>
           </div>
         </Container>
       );
     }

     if (applications.length === 0) {
        return (
          <Container className="mt-4">
            <div className="text-center py-5">
              <h4>No Applications Found</h4>
             
            </div>
          </Container>
        );
      }

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>All Applications</h3>
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
                                  <Card.Footer className="bg-transparent border-0 d-flex justify-content-center" >
                                   
                                        <Button variant="outline-primary" className="fs-6" onClick={()=>HandleInspect(app._id)}>
                                            Inspect
                                            </Button>
    
                                </Card.Footer>
                         </Card>
                      </Col>
                                        ))}
                     </Row>
                    </Container>
                                  );
                                }

export default ViewApplication;
