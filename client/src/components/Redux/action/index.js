export const openEditModal = () => {
    return{
        type: "OPEN_MODAL"
    }
}

export const closeEditModal = () => {
    return{
        type: "CLOSE_MODAL"
    }
}

//logout action
export const showlogout = () => {
    return{
        type: "SHOW_LOGOUT"
    }
}

export const hideLogout = () => {
    return{
        type: "HIDE_LOGOUT"
    }
}