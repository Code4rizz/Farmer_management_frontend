import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Container, Spinner, Badge, Button, Modal, Row, Col } from "react-bootstrap";

function ApplicationDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const statusVariant = {
        "Pending": "warning",
        "Inspected": "info", 
        "Rejected": "danger",
        "Approved": "success",
    };

    // Dummy data
    const dummyApp = {
        _id: "app123",
        location: "Maharashtra, India",
        standard: "Gold", 
        status: "Pending",
        createdAt: "2024-01-15T10:30:00.000Z",
        description: "Organic farming application for 15 hectares focusing on sustainable agriculture practices with crop rotation and natural pest management."
    };

    useEffect(() => {
        setTimeout(() => {
            setApplication(dummyApp);
            setLoading(false);
        }, 800);
    }, [id]);

    const handleViewMap = () => {
        const url = `https://www.google.com/maps/search/${encodeURIComponent(application.location)}`;
        window.open(url, '_blank');
    };

    const handleUpdate = () => navigate(`/edit_application/${id}`);
    
    const handleDelete = () => {
        setShowDeleteModal(false);
        navigate("/my-applications");
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading...</p>
            </Container>
        );
    }

    return (
        <>
            <Container className="mt-4">
                {/* Simple Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <Badge bg={statusVariant[application.status]} className="fs-6 px-3 py-2">
                        {application.status}
                    </Badge>
                </div>

                {/* Main Card */}
                <Card className="shadow-sm">
                    <Card.Header className="bg-primary text-white">
                        <h4 className="mb-0">Application Details</h4>
                    </Card.Header>
                    
                    <Card.Body className="p-4">
                        {/* Location Section */}
                        <Row className="mb-4">
                            <Col md={8}>
                                <h5 className="text-primary mb-2">{application.location}</h5>
                                <Badge bg="secondary" className="me-2">{application.standard} Standard</Badge>
                                <small className="text-muted d-block mt-2">
                                    Submitted: {new Date(application.createdAt).toLocaleDateString()}
                                </small>
                            </Col>
                            <Col md={4} className="text-md-end">
                                <Button variant="outline-primary" size="sm" onClick={handleViewMap}>
                                    View on Map
                                </Button>
                            </Col>
                        </Row>

                        <hr />

                        {/* Description */}
                        <div className="mb-4">
                            <h6 className="text-muted mb-3">Description</h6>
                            <p className="mb-0">{application.description}</p>
                        </div>
                    </Card.Body>

                    {/* Action Buttons */}
                    <Card.Footer className="bg-light">
                        <div className="d-flex justify-content-between">
                            <Button 
                                variant="secondary" 
                                onClick={() => navigate("/my-applications")}
                            >
                                All Applications
                            </Button>
                            <div>
                                <Button 
                                    variant="warning" 
                                    size="sm" 
                                    className="me-2" 
                                    onClick={handleUpdate}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm" 
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Container>

            {/* Simple Delete Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this application?</p>
                    <div className="bg-light p-3 rounded">
                        <strong>{application.location}</strong> - {application.standard} Standard
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ApplicationDetails;