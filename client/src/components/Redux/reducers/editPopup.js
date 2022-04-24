let initialModalState = false;

const toggleEditModal = (state = initialModalState, action) => {
    switch(action.type){
        case "OPEN_MODAL": return state = true;
        case "CLOSE_MODAL": return state = false;
        default: return state;
    }
}

let initialDisplay = false;

const toggleLogout = (state = initialDisplay, action) => {
    switch(action.type){
        case "SHOW_LOGOUT": return state = true;
        case "HIDE_LOGOUT": return state = false;
        default: return state;
    }
}

export {toggleEditModal, toggleLogout};