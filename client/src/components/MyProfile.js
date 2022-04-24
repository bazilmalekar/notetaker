import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import {Button} from "@mui/material";
import {Form} from "react-bootstrap";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {useNavigate} from "react-router-dom";

const MyProfile = () => {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: ""
    });

    const getAuthData = async() => {
        try{
            const res = await fetch("/getData", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            if(res.status === 200){
                setUserData({...userData, name: data.name, email: data.email});
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleEdit = async(e) => {
        try{
            e.preventDefault();
            const {name, email} = userData;
            const res = await fetch("/myProfile/edit", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },  
                body: JSON.stringify({
                    name, email
                })      
            });
            const data = await res.json();
            if(res.status === 201 || data){
                window.alert("Edit successful");
                setShowContent(false);
            }else{
                window.alert("Edit Failed");
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData, 
            [name]: value
        });
    }

    useEffect(() => {
        getAuthData();
    }, []);
    return(
        <div className="my_profile">
            <div className="profile_details">
                {/* class edit targated in "notes.scss" */}
                <div className="edit_icon_div">                    
                    <Button onClick={() => {setShowContent(true)}} variant="outlined" size="small"><EditIcon/></Button>
                </div>
                <div className="image_div">
                    <div className="image_container">
                        <img className="profile_image" src="images/profileTest.png" alt="Profile pic" />
                    </div>
                </div>
                <div className="profile_form_details">  
                    <Form method="POST" className="custom_profile_form">
                        <Form.Group className="mb-3 custom_group" controlId="formBasicEmail">
                            {showContent && <Form.Label>Name:</Form.Label>}
                            <Form.Control 
                            className={showContent ? "input_content active captialize" : "input_content captialize"} 
                            type="text" 
                            placeholder="Name"
                            onChange={handleFormChange} 
                            name="name" 
                            value={userData.name} 
                            disabled={!showContent} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 custom_group" controlId="formBasicPassword">                            
                            {showContent && <Form.Label>Email:</Form.Label>}
                            <Form.Control 
                            className={showContent ? "input_content active" : "input_content"} 
                            type="email"
                            placeholder="Email" 
                            name="email" 
                            onChange={handleFormChange}
                            value={userData.email} 
                            disabled={!showContent} 
                            />
                        </Form.Group>
                        {
                            showContent &&
                            <Form.Group className="mb-3 custom_group" controlId="formFile">
                                <Form.Label>Image/</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        }                        
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        </Form.Group>
                        {showContent ?  
                        <Form.Group>
                            <Button onClick={() => setShowContent(false)} className="m-1" variant="contained" type="submit">
                                Cancel
                            </Button>  
                            <Button onClick={handleEdit} className="m-1" variant="contained" type="submit">
                            Submit
                        </Button>
                        </Form.Group> : <SentimentSatisfiedAltIcon />
                        }                                                    
                    </Form>                  
                </div>
            </div>
        </div>
    );
}

export default MyProfile;