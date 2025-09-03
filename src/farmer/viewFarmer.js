import React, { useEffect, useState } from "react";
import { Badge, Button, Container, Alert, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api";

function ViewAllFarmers() {
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: "", type: "" });

    const navigate = useNavigate();

    const handleViewPlaces = (farmeremail) => {
        navigate(`/farmer_places/${farmeremail}`);
    };

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const res = await api.get("/farmer/all_farmers");
                setFarmers(res.data.farmers);  
            }
            catch (err) {
                if (err.response && err.response.data.message) {
                    setMessage({ text: err.response.data.message, type: "danger" });
                } else {
                    setMessage({ text: "Failed to fetch farmers. Please try again.", type: "danger" });
                }}
            finally {setLoading(false);}
        }
        fetchFarmers();
    }, []);
            

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Loading All Farmers...</p>
                </div>
            </Container>
        );
    }

    if (farmers.length === 0) {
        return (
            <Container className="mt-4">
                <div className="text-center py-5">
                    <h4>No Farmers Found</h4>
                    <p className="text-muted">No farmers are registered in the system.</p>
                </div>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>All Farmers</h3>
                <Badge bg="info">{farmers.length} Total Farmers</Badge>
            </div>
            
            {message.text && <Alert variant={message.type}>{message.text}</Alert>}

            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {farmers.map((farmer) => (
                        <tr key={farmer._id}>
                            <td className="fw-bold">{farmer.name}</td>
                            <td>{farmer.email}</td>
                            <td>
                                <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={() => handleViewPlaces(farmer.email)}
                                >
                                    View Places 
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ViewAllFarmers;