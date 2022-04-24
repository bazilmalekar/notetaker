import React, {useEffect, useState} from 'react';
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import {useNavigate, NavLink} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {showlogout, hideLogout} from "./Redux/action/index";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myNavItemState = useSelector((state) => state.toggleLogout);
    const [navData, setNavData] = useState([]);

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
                dispatch(showlogout());
                setNavData(data);
            }else{
                dispatch(hideLogout());
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getAuthData();
    }, [myNavItemState]);
  return (
    <div>
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container className="col-lg-8">
                <LinkContainer to="/">
                <Navbar.Brand>NoteTaker</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="ms-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <LinkContainer to="/notes">
                        <Nav.Link>My Notes</Nav.Link>
                    </LinkContainer>
                    {
                        myNavItemState &&
                        <NavDropdown style={{textTransform:"capitalize"}} title={<AccountCircleIcon />} id="navbarScrollingDropdown">
                        <LinkContainer to="/myProfile">
                            <NavDropdown.Item>My Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/logout">
                            <NavDropdown.Item>Logout</NavDropdown.Item>
                        </LinkContainer>
                        </NavDropdown> 
                    }                    
                </Nav>                
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar;
