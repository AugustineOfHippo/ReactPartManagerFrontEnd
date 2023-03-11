const userReducer = (state = "", action) => {
    switch(action.type){
        case 'SETUSER':
            return state = action.payload
        case 'SETREFRESHUSER':
            return {...state, token:action.payload}
        case 'SETUSERDETAILS':
            return {...state, details:action.payload}
        default:
            return state;
    }
}

export default userReducer;