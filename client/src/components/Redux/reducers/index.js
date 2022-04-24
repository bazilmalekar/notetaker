import {toggleEditModal, toggleLogout} from "./editPopup";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    toggleEditModal, 
    toggleLogout 
});

export default rootReducer;