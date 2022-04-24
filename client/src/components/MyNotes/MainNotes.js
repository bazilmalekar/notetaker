import React, { useEffect, useState } from "react";
import NotesBody from "./NotesBody";
import { Button } from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {Card} from "react-bootstrap";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditModal from "../EditModal";
import {useDispatch, useSelector} from "react-redux";
import {openEditModal, closeEditModal} from "../Redux/action/index";
import {showlogout, hideLogout} from "../Redux/action/index";

const MainNotes = () => {
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const editState = useSelector((state) => state.toggleEditModal);
    const [note, setNote] = useState("");
    const [userNotes, setUserNotes] = useState([]);
    const [editId, setEditId] = useState("");
    const [header, setHeader] = useState("");

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
            if(res.status !== 200){
                navigate("/login");
                dispatch(hideLogout());
            }else{
                setUserNotes(data.notes);
                dispatch(showlogout());
                setHeader(data);
            }
        }catch(err){
            console.log(err);
        }
    }

    const handlePost = async(e) => {
        try{
                e.preventDefault();
                if(note !== ""){                    
                    const res = await fetch("/postNote", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({note})
                    });

                    const noteData = await res.json();
                    if(res.status !== 201 || !noteData){
                        throw new Error("Note not added");
                    }else{                
                        setNote("");
                }
            }            
        }catch(err){
            console.log(err);
        }
    }

    const handleEnterKey = (e) => {
        if(e.key === "Enter"){
            handlePost();
        }
    }

    const handleDelete = async(note_id) => {
        try{
            const res = await fetch(`/notes/delete/${note_id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const deletedData = await res.json();  
            if(res.status === 200){
                getAuthData();
            }
        }catch(err){
            console.log(err);
        }        
    }


    useEffect(() => {
        getAuthData();
    }, [note]);

  return (
      <div className="login text-center">
        <NotesBody title={`Welcome back ${header.name}!`} className="note_header">
            <form method="POST" className="input_note_div">
                <input
                className="input_note"
                placeholder="Add Note"
                onChange={(e)=> {setNote(e.target.value)}} 
                onKeyPress={handleEnterKey}
                name="note"
                value={note}
                />
                <Button 
                type="submit" 
                size="small" 
                className="submit_button" 
                onClick={handlePost} 
                color="primary" 
                variant="contained">
                <AddIcon />
                </Button>
            </form>  
            <div className="diaplay_div mt-4">
                {
                    userNotes.map((elem) => {
                        return(
                            <>
                                <Card className="input_content mt-2" key={elem._id}>
                                    <Card.Body className="card_body" >{elem.note}</Card.Body>
                                    <div className="icons">
                                        <EditIcon 
                                        className="edit" 
                                        onClick={() => {dispatch(openEditModal()); setEditId(elem._id)}} />
                                        <DeleteOutlineIcon 
                                        className="delete" 
                                        onClick={() => {handleDelete(elem._id)}} />
                                    </div>
                                </Card>
                            </>
                        );
                    })
                }        
            </div> 
            {editState && <EditModal getAuthData={getAuthData} editId={editId} /> }
        </NotesBody>
    </div>
  )
}

export default MainNotes;
