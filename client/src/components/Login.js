import React, {useState} from 'react';
import {Container, Form, Button} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import NotesBody from "./MyNotes/NotesBody";
import LoadingComponent from "./errorMiddleware/LoadingComponent";
import ErrorComponent from "./errorMiddleware/ErrorComponent";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginFromError, setLoginFormError] = useState({});
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginInput({
            ...loginInput, 
            [name]: value
        });
    }

    const handlePost = async(e) => {
        try{
            e.preventDefault();  
            setErrorMessage("");          
            setLoading(true);
            setLoginFormError(validateLogin(loginInput));
            const {email, password} = loginInput;
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify({
                    email, password
                })
            });
            const data = await res.json();  
            if(res.status === 422 || !data){                                
                setLoading(false); 
                setLoginInput({
                    email: "", 
                    password: ""
                });
                setErrorMessage("Invalid Credentials")       
                setLoading(false);
            }else{
                setLoading(false);
                navigate("/notes");
            }            
        }catch(err){
            console.log(err);                    
        }
    }

    const validateLogin = (values) => {
        const error = {};
        if(!values.email){
            error.email = "Please enter email";
        }
        if(!values.password){
            error.password = "Please enter password";
        }
        return error;
    }

  return (
    <div className="login">
        <NotesBody title="LOGIN">
            {loading && <LoadingComponent />}
            {errorMessage && <ErrorComponent>{errorMessage}</ErrorComponent>}
            <Form method="POST">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={handleChange} name="email" value={loginInput.email} placeholder="Enter email" />
                </Form.Group>
                <p style={{color: "#FF0000"}}>{loginFromError.email}</p>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handleChange} name="password" value={loginInput.password} placeholder="Password" />
                </Form.Group>
                <p style={{color: "#FF0000"}}>{loginFromError.password}</p>
                <p className="redirect">New user? <span><NavLink className="link" to="/register">Register</NavLink></span></p>
                <Button onClick={handlePost} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </NotesBody> 
    </div>
  )
}

export default Login;
