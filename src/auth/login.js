import React, { useState } from "react";
import { Container ,Card,Form,Button,Alert} from "react-bootstrap";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [message,setmessage]=useState({text:"",type:""});
    const navigate = useNavigate();

    const HandleSubmit= async (e) => {
        e.preventDefault();
        setmessage({text:"",type:""});

        try{
          const res = await api.post("/auth/login",{email,password});

          localStorage.setItem("token",res.data.token);
          localStorage.setItem("user",JSON.stringify(res.data.user));

          setmessage({text:res.data.message, type:"success"});
          navigate("/");

    }
    catch(err){
        if(err.response && err.response.data.message){
            setmessage({text:err.response.data.message,type:"danger"});
        }
        else{
            setmessage({text:"Login Failed. Please try again.",type:"danger"});
        }}}

return(
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>


        {message.text && <Alert variant={message.type}>{message.text}</Alert>}
         <Form onSubmit={HandleSubmit}>
            
          
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
            Login
          </Button>
            </Form>
        </Card>
        </Container>
)

}
export default Login;