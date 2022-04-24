import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {showlogout, hideLogout} from "./Redux/action/index";

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        navigate("/notes");
        dispatch(showlogout()); 
      }else{
        dispatch(hideLogout());         
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getAuthData();
  }, []);
  return (
    <div className="main_body">
        <div className="intro">
            <div className="intro_text">
                <h1>Welcome to Note Taker</h1>
                <p>Get Organized | Get Efficient</p>
            </div>
            <div className="intro_button">
              <NavLink to="/login"><Button variant="primary">Login</Button></NavLink>
              <NavLink to="/register"><Button variant="outline-primary">Signin</Button></NavLink>                              
            </div>
        </div>
    </div>
  )
}

export default LandingPage;
