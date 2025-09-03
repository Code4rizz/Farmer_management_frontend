import React from "react";
import { Nav,Container,Navbar } from "react-bootstrap";
import { Link , useNavigate} from "react-router-dom";

function Header(){
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const role = user?.role;


    const HandleLogout=()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
        
    }
    return(
        <Navbar bg="success" variant="dark" fixed="top" className="shadow-sm">
            <Container>
            <Navbar.Brand as={Link} to="/home" className="fw-bold ">🌱 Farmers Mangement System</Navbar.Brand>
         
                <Nav className="ms-auto align-items-center" >
                    {user?(<>
                        <Nav.Link as={Link} to="/farmers" className="fw-semibold">All Farmers</Nav.Link>
                    
                    {role === "Farmer" && (<>
                    <Nav.Link as={Link} to="/create_application" className="fw-semibold">Create Application</Nav.Link>
                    <Nav.Link as={Link} to="/my_application" className="fw-semibold"> My Application</Nav.Link>
                    </>)}

                    {role === "Inspector" && (<>
                    <Nav.Link as={Link} to="/View_pending_application" className="fw-semibold">View Applications</Nav.Link>
                    <Nav.Link as={Link} to="/inspector_search" className="fw-semibold">Check Applications</Nav.Link>
                    </>)}

                    {role === "Certifier" && (<>
                    <Nav.Link as={Link} to="/View_inspected_application" className="fw-semibold">View inspected Application</Nav.Link>
                    </>)}

                        <Navbar.Text className=" ms-5 me-3 fw-semibold text-light">
                    👋 Hello, <span>{user.name}</span>
                    </Navbar.Text>
                        <Nav.Link onClick={HandleLogout} className=" text-info fw-semibold">
                        🚪 Logout
                        </Nav.Link>
                        
                    </>)
                        
                        :(

                            <>
                        <Nav.Link as={Link} to="/farmers" className="fw-semibold">All Farmers</Nav.Link>
                        <Nav.Link as={Link} to="/login" className="fw-semibold">Login</Nav.Link>
                        <Nav.Link as={Link} to="/signup" className="fw-semibold">Signup</Nav.Link>
                        </>)}
                </Nav>
          </Container>
        </Navbar>
    )

}
export default Header;