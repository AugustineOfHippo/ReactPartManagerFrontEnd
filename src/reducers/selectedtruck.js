const selectedTruckReducer = (state = "",action) => {
    switch(action.type){
        case 'SETSELECTEDTRUCK':
            return state = action.payload;
        default:
            return state;
    }
}

export default selectedTruckReducer;