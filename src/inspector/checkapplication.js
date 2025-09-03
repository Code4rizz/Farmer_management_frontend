import React, { useState } from 'react';
import { 
    Container, 
    Card, 
    Form, 
    Spinner,
    Button, 
    Alert, 
    Badge,
    Row,
    Col
} from 'react-bootstrap';
import api from '../api';


const CheckApplication = () => {
    const [fieldId, setFieldId] = useState('');
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

   

    
    const statusVariant = {
        "Pending": "secondary",
        "Inspected": "warning",
        "Approved": "success",
        "Rejected": "danger",
    };

    const standardVariant = {
        "Bronze": "dark",
        "Silver": "secondary", 
        "Gold": "warning",
    };
    
    const handlefieldIdChange = (e) => {
        setFieldId(e.target.value);
    };


    const handleSearch = async (e) => {

        e.preventDefault();
        setMessage({ text: '', type: '' });
        if (!fieldId) {
            setMessage({ text: 'Please enter a field ID', type: 'danger' });
            return;
        }

        try{
            setLoading(true);
            const res= await api.get(`/inspector/application/search?field_id=${encodeURIComponent(fieldId.trim())}`);
            setApplication(res.data.application);
            
            setMessage({text:"Application found",type:"success"});
        }
        catch(err){
            if (err.response && err.response.data.message) {
                setMessage({ text: err.response.data.message, type: 'danger' });
                setApplication(null);

            } else {
                setMessage({ text: 'Error fetching application. Please try again.', type: 'danger' });
                setApplication(null);
            }
            }
        finally{setLoading(false);}
        }

    const handleClear = () => {
        setFieldId('');
        
        setApplication(null);
        setMessage({ text: '', type: '' });
    };

    
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col lg={10} className="mx-auto">
                    <Card className="mb-4">
                        <Card.Header>
                            <h4 className="mb-0">🔍 Check Application Status</h4>
                        </Card.Header>
                        <Card.Body>
                            <p className="text-muted mb-3">
                                Enter your field ID to check the status of your application
                            </p>
                            
                            <Form onSubmit={handleSearch}>
                                <Row>
                                    <Col md={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Field ID</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={fieldId}
                                                onChange={handlefieldIdChange}
                                                required
                                                placeholder="Enter your field ID"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="d-flex align-items-end">
                                        <div className="d-grid gap-2 w-100 mb-3">
                                            <Button variant="primary" type="submit" disabled={loading}>
                                                {loading ? (
                                                    <>
                                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2"/>Searching...</>
                                                  ) : ('Search')}
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>

                            {application && (
                                <div className="d-flex justify-content-between align-items-center">
                                    <Badge bg="success">Application Found</Badge>
                                    <Button variant="outline-secondary" size="sm" onClick={handleClear}>
                                        Clear Search
                                    </Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>

                    
                    {message.text && (
                        <Alert variant={message.type} className="mb-4">
                            {message.text}
                        </Alert>
                    )}

                    {/* Results */}
                    {application && (
                        <Card>
                            <Card.Header>
                                <h5 className="mb-0">Application Details</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col lg={8} className="mx-auto">
                                        <Card className="border-1">
                                            <Card.Header className="bg-light">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h6 className="mb-0">Field ID: {application.field_id}</h6>
                                                    <Badge bg={statusVariant[application.status]} className="px-3 py-2">
                                                        {application.status}
                                                    </Badge>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <Row>
                                                    <Col md={6}>
                                                        <div className="mb-3">
                                                            <strong>Name:</strong> {application.name}
                                                        </div>
                                                        <div className="mb-3">
                                                            <strong>Email:</strong> {application.email}
                                                        </div>
                                                        <div className="mb-3">
                                                            <strong>Phone:</strong> {application.phone}
                                                        </div>
                                                        <div className="mb-3">
                                                            <strong>Location:</strong> 📍 {application.location}
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="mb-3">
                                                            <strong>Standard:</strong>
                                                            <Badge bg={standardVariant[application.standard]} className="ms-2 px-3 py-2">
                                                                {application.standard}
                                                            </Badge>
                                                        </div>
                                                        <div className="mb-3">
                                                            <strong>Submitted:</strong> {formatDate(application.createdAt)}
                                                        </div>
                                                        {application.Inspection && application.Inspection.iname && (
                                                            <div className="mb-3">
                                                                <strong>Inspected by:</strong> {application.Inspection.iname}
                                                            </div>
                                                        )}
                                                        {application.Inspection && application.Inspection.idate && (
                                                            <div className="mb-3">
                                                                <strong>Inspection Date:</strong> {formatDate(application.Inspection.idate)}
                                                            </div>
                                                        )}
                                                    </Col>
                                                </Row>

                                                <div className="mb-3">
                                                    <strong>Description:</strong>
                                                    <p className="text-muted mb-0 mt-2">
                                                        {application.Description}
                                                    </p>
                                                </div>

                                                {application.Inspection && application.Inspection.reason && (
                                                    <div className="mb-3">
                                                        <strong>Inspector Notes:</strong>
                                                        <div className={`p-3 rounded mt-2 ${
                                                            application.Inspection.status === 'Approved' 
                                                                ? 'bg-light text-success border border-success' 
                                                                : 'bg-light text-danger border border-danger'
                                                        }`}>
                                                            <p className="mb-0">
                                                                {application.Inspection.reason}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CheckApplication;