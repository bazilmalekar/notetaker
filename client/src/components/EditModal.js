import React, {useRef, useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {closeEditModal} from "./Redux/action/index";
import AOS from "aos";
import "aos/dist/aos.css";

const EditModal = ({editId, getAuthData}) => {  
  const editPop = useRef();
  const dispatch  = useDispatch();
  const [individualNote, setIndividualNote] = useState([]);
  
  const callModal = (e) => {
    if(!editPop.current.contains(e.target)){
      dispatch(closeEditModal());
    }
  };

  const getAuthUserEdit = async() => {
    try{
      const res = await fetch(`/notes/edit/get/${editId}`, {
        method:"GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      // Destructuring object inside an array
      const [{note}] = data.notes;
      if(res.status === 200 || data){
        setIndividualNote(note);
      }else{
        throw new Error("Note not found");
      }
    }catch(err){
      console.log(err);
    }
  }

  const handleEditNote = async(e) => {
    try{
      e.preventDefault();
      if(individualNote !== ""){
        const res = await fetch(`/notes/edit/editnote/${editId}`, {
          method:"PATCH", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({individualNote})
        });

        const data = await res.json();
        if(res.status === 201 || data){
          dispatch(closeEditModal());
          getAuthData();
        }
      }
    }catch(err){
      console.log(err);
    }    
  }

  const handleEnter = (e) => {
    if(e.key === "Enter"){
      handleEditNote();
    }
  }

  useEffect(() => {
    document.addEventListener("click", callModal);
    AOS.init({duration: 400});
    getAuthUserEdit();
    return () => {
      document.removeEventListener("click", callModal);
    }    
  }, []);
  return (
    <div className="edit_modal" data-aos="fade-zoom-in">
      <div ref={editPop} className="eidt_modal_inner">
        <Form method="POST">
          <Form.Group className="custom_text_area" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" 
            rows={1} 
            name="note" 
            value={individualNote} 
            onChange={(e) => setIndividualNote(e.target.value)} />
          </Form.Group>
          <div className="modal_submit_btn">
            <Button 
            variant="contained" 
            size="small"
            color="primary"
            type="submit"
            onClick={handleEditNote}
            onKeyDown={handleEnter}
            >
              EDIT
            </Button>          
          </div>
        </Form>
      </div>      
    </div>
  )
}

export default EditModal;
