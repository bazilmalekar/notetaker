import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {NavLink, useNavigate} from "react-router-dom";
import NotesBody from "./MyNotes/NotesBody";
import LoadingComponent from "./errorMiddleware/LoadingComponent";
import ErrorComponent from "./errorMiddleware/ErrorComponent";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [picError, setPicError] = useState("");
  // form validation 
  const [formError, setFormError] = useState({});  
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegisterInput({
      ...registerInput,
      [name]: value
    });
  }

  const handlePost = async(e) => {
    const {name, email, password, cpassword} = registerInput;
    if(password !== cpassword){
      setErrorMessage("Passwords do not match");
    }else{
        try{
        e.preventDefault();
        setFormError(validate(registerInput));
        setLoading(true);
        setErrorMessage("");        
        const response = await fetch("/register", {
          method:"POST", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name, email, imageUrl, password, cpassword
          })
        });

        const data = await response.json();
        if(response.ok){
          window.alert("Registration Successful");
          navigate("/notes"); 
        }else{
          setErrorMessage("Email already exists");
        }
      }catch(err){
        console.log(err);        
        setLoading(false);
      }
    }    
  }

  const postImage = () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "noteTaker");
    data.append("cloud_name", "student1cloudinary");
    fetch("CLOUDINARY_URL=cloudinary://239575437579424:BvuMGDABjMnrthHX94xn6HK60J8@student1cloudinary/image/upload", {
      method:"POST",
      body: data
    })
    .then((res) => res.json)
    .then((data) => setImageUrl(data.url))
    .catch((err) => {
      console.log(err);
    })
  } 

  const validate = (values) => {    
    const error = {};
    const regex = "/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/.";
    if(!values.name){
      error.name = "Please Enter Name";
    }
    if(!values.email){
      error.email = "Email required";
    }
    if(!values.password){
      error.password = "Password required"
    }else if(values.password.length < 4){
      error.password = "Password should have atleast 4 characters";
    }
    if(!values.cpassword){
      error.cpassword = "Please confirm password";
    }
    setLoading(false);
    return error;
  }
  
  return (
    <div className="register">
      <NotesBody title="REGISTER">
        {loading && <LoadingComponent />}
        {errorMessage && <ErrorComponent>{errorMessage}</ErrorComponent>}
        <Form method="POST">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control className="name_form_input" type="text" name="name" value={registerInput.name} onChange={handleChange} placeholder="Name" required />
          </Form.Group>
          <p style={{color: "#FF0000"}}>{formError.name}</p>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={registerInput.email} onChange={handleChange} placeholder="Enter email" required />
          </Form.Group>
          <p style={{color: "#FF0000"}}>{formError.email}</p>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={registerInput.password} onChange={handleChange} placeholder="Enter Password" required />
          </Form.Group>
          <p style={{color: "#FF0000"}}>{formError.password}</p>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" name="cpassword" value={registerInput.cpassword} onChange={handleChange} placeholder="Confirm Password" required />
          </Form.Group>
          <p style={{color: "#FF0000"}}>{formError.cpassword}</p>
          <Form.Group className="mb-3">
            <Form.Label>Profile Pic: (Optional)</Form.Label>
            <Form.Control type="file" name="profilePic" onChange={(e) => {setImageFile(e.target.files[0]); postImage()}} placeholder="(Optional)"/>
          </Form.Group>
          <p className="redirect">Have an account? <span><NavLink className="link" to="/login">Login</NavLink></span></p>
          <Button onClick={handlePost} 
          variant="primary" 
          type="submit">
            Submit
          </Button>
        </Form>
      </NotesBody>
    </div>
  )
}

export default Register;    