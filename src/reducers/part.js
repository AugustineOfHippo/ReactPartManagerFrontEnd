const partReducers = (state = [], action) => {
    switch(action.type){
        case 'GETPARTS':
            return state;
        case 'SETPARTS':
            return action.payload;
        case 'ADDPART':
            return state = [...state,action.payload];
        case 'DELETEPART':
                return state.filter(x => x._id !== action.payload._id)
        default:
            return state;
    }
}

export default partReducers;