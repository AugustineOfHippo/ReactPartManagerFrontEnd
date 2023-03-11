const makesReducer = (state = [],action) => {
    switch(action.type){
        case 'GETMAKES':
            return state;
        case 'SETMAKES':
            return state = action.payload;
        case 'ADDMAKE':
            return state = [...state,action.payload]
        default:
            return state
    }
}

export default makesReducer;