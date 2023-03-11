const truckReducers = (state = [],action) => {
    switch(action.type){
        case 'SETTRUCKS':
            return state = action.payload;
        case 'GETTRUCKS':
            return state;
        case 'ADDTRUCK':
            return state = [...state,action.payload]
        case 'DELETETRUCK':
            return state = state.filter(truck => truck._id !== action.payload)
        default:
            return state
    }
}

export default truckReducers;