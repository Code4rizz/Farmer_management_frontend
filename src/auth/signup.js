
import api from "../api";
import React, { useState } from "react";
import { Container ,Card,Form,Button,Alert,Dropdown,DropdownButton} from "react-bootstrap";
function Signup(){


    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [message,setmessage]=useState({text:"",type:""});
    const[name,setName]=useState("");
    const [role,setrole]=useState("Select Role");


    const HandleSubmit= async (e) => {
        e.preventDefault();
        setmessage({text:"",type:""});
        if( role === "Select Role"){
            setmessage({text:"Please select a role",type:"danger"});
            return;
        }

        try{
                const res = await api.post("/auth/signup",{name,email,password,role});
                setmessage({text:res.data.message, type:"success"});
                setName("");
                setemail("");
                setpassword("");
                setrole("Select Role");

        }
        catch(err){
            if(err.response && err.response.data.message)
                setmessage({text:err.response.data.message,type:"danger"});
            else
                setmessage({text:"Signup Failed. Please try again.",type:"danger"});
        }
        
    }
return(
<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Signup</h3>


        {message.text && <Alert variant={message.type}>{message.text}</Alert>}
         <Form onSubmit={HandleSubmit}>
            <DropdownButton id="role-dropdown" title ={role} variant="primary" className="mb-3 w-100">
      <Dropdown.Item onClick={() => setrole("Farmer")}>Farmer</Dropdown.Item>
      <Dropdown.Item onClick={() => setrole("Inspector")}>Inspector</Dropdown.Item>
      <Dropdown.Item onClick={() => setrole("Certifier")}>Certifier</Dropdown.Item>

            </DropdownButton>
           <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            required
            />
            </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e)=> setemail(e.target.value)}
            required
            />
            </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </Form.Group>
           <Button variant="success" type="submit" className="w-100">
            Signup
          </Button>
            </Form>
        </Card>
        </Container>
)
}
export default Signup;